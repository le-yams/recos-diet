# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Recos Diet is a French-language web app presenting nutritional recommendations for adult ICU patients on
artificial nutrition (enteral/parenteral), built with the dietetics team of CHU de Toulouse. All UI text, enum
values and JSON data are in French.

## Workspace layout

Angular 22 workspace with two projects declared in `angular.json`:

- `projects/domain` — an **ng-packagr library** published as `@recos-diet/domain`. Pure TypeScript domain model
  with no Angular dependency (its `package.json` declares only `tslib`). All clinical computation lives here.
- `projects/web` — the Angular application (Material + FontAwesome). It consumes the domain **only through
  `dist/domain`**: `tsconfig.json` maps `@recos-diet/domain` to `dist/domain`, not to the source.

Consequence: **the domain must be built before the web app will compile**, and rebuilt after any domain change.

## Commands

Node 24 (`.nvmrc`, same as the CI image `trion/ng-cli-karma`); `engines` accepts what Angular 22 supports
(`^22.22.3 || ^24.15.0 || >=26.0.0`) and `.npmrc` sets `engine-strict`, so `npm ci` fails on any other version.

```bash
npm run build:domain            # required before `npm start` / web tests; rebuild after domain edits
npm run watch:domain            # keep dist/domain fresh while editing the library (development config)
npm start                       # ng serve (web, development config)
npm run build                   # generate:version (prebuild), then ng build domain && ng build web (production)
npm test                        # ng test domain --no-watch && ng test web --no-watch
npm run test:domain             # domain tests in watch mode, with coverage
npm run lint                    # ng lint: every project (domain, then web)
npm run lint:domain
npm run lint:web
npm run generate:version        # writes projects/web/src/version.json (gitignored) from package.json version
```

`ng build` targets a single project: always name it (`ng build domain`), there is no default project.

Tests use Karma + Jasmine and launch a real `Chrome` (see `karma.conf.js` in each project). Headless:
`--browsers=ChromeHeadless`. Reports go to `reports/<project>/` (gitignored).

Run one project, or one spec file:

```bash
npx ng test domain --no-watch
npx ng test domain --no-watch --include='**/patient.spec.ts'
```

`fdescribe`/`fit` also work for focusing within a file. Web tests need `dist/domain` to exist.

`eslint.config.js` (flat config, shared by both projects) also enforces the `.ts` code style through `@stylistic`:
single quotes (`quote_type` of `.editorconfig`) and `{X}` without inner spaces. `npx ng lint <project> --fix`
restores it, for example after an `ng update` migration that rewrote code as `{ X }`.

The production build enforces an `initial` bundle budget in `angular.json` (warning 1mb, error 1.5mb) and CI runs
it, so exceeding the error fails the pipeline. Reference measure on 2026-10-07 (Angular 22, `application`
builder): 951.20 kB initial (main 869.26 kB, styles 47.35 kB, polyfills 34.59 kB). A warning means the bundle
drifted: find out why before raising the threshold.

The web app builds with `@angular/build` (esbuild, Vite dev server); `outputPath.browser` is `""` so the build
lands directly in `dist/web`, which CI uploads as is (with `.htaccess` and `version.json` at its root).

## Domain architecture (projects/domain/src)

The domain is **event-driven**. `Domain` (`domain.ts`) is the composition root: it constructs every sub-domain
with a shared `DomainEventBus` and the repository/read interfaces it needs. Sub-domains never reference each
other directly; they communicate exclusively via events.

- `DomainEventBus` (`domain.events.ts`) is a minimal `publish` / `subscribe(eventName, consumer)` interface.
  Events are classes implementing `DomainEvent` whose `name` is the class name (`readonly name = Foo.name`), and
  subscribers subscribe with `FooEvent.name`. Each sub-domain has a sibling `*.events.ts` file.
- The standard sub-domain shape: subscribe to input events in the constructor, keep private state, recompute,
  publish an `...UpdatedEvent`. Expose a getter so the UI can read the current value at startup before any event
  fires.
- Data access is declared as `...Read` / `...Repository` interfaces in the domain and implemented in the web
  project's `infra/` layer. The domain never loads data itself.
- The reactive chain that drives most of the app:
  `Patient.updateSize` → `PatientInfoUpdatedEvent` → `Pathologies` (auto-adds `OBESITE` at BMI ≥ 30 and removes
  anorexia) → `SelectedPathologiesEvent` → `Products` (filters available products by nutrition type /
  anorexia / EER+obesity compatibility and re-selects if needed) → `SelectedProductNutritionInfoEvent` →
  `DailyTargetFlows` → `DailyTargetFlowsUpdatedEvent`. `Micronutriments` and `Warnings` also listen to the
  pathology and nutrition-type events.
- Anything the web app needs must be exported from `public-api.ts`; that file is the library entry point.

### Domain tests

Domain specs are plain unit tests, no `TestBed`. `shared.spec.ts` provides `TestDomainEventBus` (an in-memory
bus) and `EventsCaptor` (records events of one type; `expectEventsCount`, `mapSingleEvent`, `close()`). Typical
spec: build the class with a test bus, publish input events or call methods, assert on the captured output
events. `warnings.spec.ts` shows the table-driven `params.forEach(param => it(...))` style used for rule
matrices. Classes that hold subscriptions (`Warnings`, `Micronutriments`) expose `close()`; call it in
`afterEach`.

## Web architecture (projects/web/src)

- **Bootstrap**: standalone app, no NgModule. `main.ts` calls `bootstrapApplication(AppComponent, appConfig)`;
  `app/app.config.ts` holds the root providers (zone change detection, `provideRouter` with `app/app.routes.ts`,
  HttpClient) and runs `DomainLoaderService.load()` through `provideAppInitializer`. It fetches every JSON asset
  through `JsonAssetLoaderService` (cache-busted `GET /assets/<name>.json`), wraps each in a `Memory*Repository`
  from `infra/`, creates the bus (`InMemoryBus` wrapped by `DomainEvents` in `infra/pubsub.ts`) and builds the
  `Domain`. Nothing renders until this resolves.
- **Components** are standalone and list what their template uses in `imports`; dependencies come from `inject()`,
  not constructor parameters (both enforced by lint). They use the default `OnPush` change detection: anything the
  template shows must come from an `async` pipe, a signal, an input or one of the template's own events. A value
  assigned in a `subscribe()` callback only shows up when something else refreshes the view (see `toSignal` in
  `AppComponent.currentRoute`).
- **`DomainService`** (`app/domain.service.ts`) exposes the built `Domain` and its sub-domains to Angular.
- **Feature services** (`app/<feature>/<feature>.service.ts`) are the domain→RxJS bridge: seed a
  `BehaviorSubject` from the domain getter, then subscribe to the matching `...UpdatedEvent` on
  `domainService.EventBus()` and `next()` the payload. Components consume the `x$` observables for reads and
  call domain methods directly (e.g. `patient.updateSize(...)`) for writes. Follow this pattern for new features.
- **Import rule**: web code imports domain types from `@recos-diet/domain`, never from `projects/domain/src`
  through a relative path.
- `infra/utils.ts` `Verbose` logging is on when the hostname contains `localhost` or `staging`.
- **Material theme**: `src/theme.scss` (M2 API, deep-purple/amber like the former `deeppurple-amber` prebuilt
  theme) only includes the `*-theme` mixins of the components in use. Using a new Material component means adding
  its mixin there, otherwise it renders without theme colors.

## Clinical data is JSON, not code

All recommendations live in `projects/web/src/assets/*.json`: `products.json`, `recos-enterale.json`,
`recos-parenterale.json`, `recos-exclusions.json`, `warnings.json`, `bibliography.json`, `survey.json`. Most
`fix:`/`chore:` commits in history are edits to these files. Their shapes are the `Json*` / `*Entity` interfaces
in the corresponding `infra/memory-*.repository.ts`.

The domain enums are **serialized display strings** and are used verbatim as keys in the JSON
(`Pathology.DENUTRITION_SRI = 'Dénutrition-SRI'`, `NutritionType.PARENTERALE = 'Parentérale'`). Renaming an enum
value silently breaks data matching; change both sides together.

## Versioning, release and deploy

- GitLab CI (`.gitlab-ci.yml`) uses the to-be-continuous Angular and semantic-release templates plus an lftp
  upload of `dist/web`. `.htaccess` in the build output provides the SPA rewrite.
- **Conventional commits are required**: `feat:` / `fix:` (optionally scoped, e.g. `fix(products): ...`) drive
  semantic-release, which bumps `package.json`, rewrites `CHANGELOG.md` and commits `chore(release): x.y.z
  [skip ci]`. Data-only edits have historically used `fix:` or `chore:` depending on whether users should see a
  release.
- Version flow: `environment.prod.ts` imports the `package.json` version at build time (only that value ends up
  in the bundle); `version.json` is generated, not tracked, by `generate:version`: the npm `prebuild` hook runs it
  locally, the `ng-build` job's `before_script` in CI (the template calls `ng` directly). In production
  `AppUpdater` polls `/version.json` and prompts a reload when it differs from the running build. Dev builds
  report `SNAPSHOT-<timestamp>`.
- Default branch is `master`; feature work happens on `feat/*` branches.
