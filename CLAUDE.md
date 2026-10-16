# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Recos Diet is a French-language web app presenting nutritional recommendations for adult ICU patients on
artificial nutrition (enteral/parenteral), built with the dietetics team of CHU de Toulouse. All UI text, enum
values and JSON data are in French.

## Workspace layout

Angular 22 workspace with two projects declared in `angular.json`:

- `projects/domain` — the domain, imported as `@recos-diet/domain`. Pure TypeScript domain model with no Angular
  dependency (only its `src/test.ts` initializes the Angular test environment). All clinical computation lives
  here. It is a `library` project with `test` and `lint` targets only: no build target, nothing is packaged.
- `projects/web` — the Angular application (Material + FontAwesome). It imports the domain through the
  `@recos-diet/domain` alias, which `tsconfig.json` maps to the sources (`projects/domain/src/public-api.ts`).

Consequence: the web app compiles the domain sources itself. No domain build is needed before `npm start` or the
web tests, and `ng serve` reloads on domain edits. CI builds `web` only.

## Commands

Node 24 (`.nvmrc`, which CI reads through `actions/setup-node`); `engines` accepts what Angular 22 supports
(`^22.22.3 || ^24.15.0 || >=26.0.0`) and `.npmrc` sets `engine-strict`, so `npm ci` fails on any other version.

```bash
npm start                       # ng serve (web, development config), also watches the domain sources
npm run build                   # generate:version (prebuild), then ng build web (production)
npm test                        # ng test domain --no-watch && ng test web --no-watch
npm run test:domain             # domain tests in watch mode, with coverage
npm run lint                    # ng lint: every project (domain, then web)
npm run lint:domain
npm run lint:web
npm run generate:version        # writes projects/web/src/version.json (gitignored) from package.json version
```

`ng build` targets a single project: always name it (`ng build web`), there is no default project.

Tests use Karma + Jasmine and launch a real `Chrome` (see `karma.conf.js` in each project). Headless:
`--browsers=ChromeHeadless`. Reports go to `reports/<project>/` (gitignored).

Run one project, or one spec file:

```bash
npx ng test domain --no-watch
npx ng test domain --no-watch --include='**/patient.spec.ts'
```

`fdescribe`/`fit` also work for focusing within a file.

`eslint.config.js` (flat config, shared by both projects) also enforces the `.ts` code style through `@stylistic`:
single quotes (`quote_type` of `.editorconfig`) and `{X}` without inner spaces. `npx ng lint <project> --fix`
restores it, for example after an `ng update` migration that rewrote code as `{ X }`.

The production build enforces an `initial` bundle budget in `angular.json` (warning 1mb, error 1.5mb) and CI runs
it, so exceeding the error fails the pipeline. Reference measure on 2026-10-07 (Angular 22, `application`
builder, domain compiled from its sources): 951.27 kB initial (main 869.33 kB, styles 47.35 kB, polyfills
34.59 kB). A warning means the bundle drifted: find out why before raising the threshold.

The web app builds with `@angular/build` (esbuild, Vite dev server); `outputPath.browser` is `""` so the build
lands directly in `dist/web`, which the deploy uploads as is (with `.htaccess` and `version.json` at its root).

## Domain architecture (projects/domain/src)

The domain is **event-driven**. `Domain` (`domain.ts`) is the composition root: it constructs every sub-domain
with a shared `DomainEventBus` and the repository/read interfaces it needs. Sub-domains never reference each
other directly; they communicate exclusively via events.

- `DomainEventBus` (`domain.events.ts`) is a minimal `publish` / `subscribe(eventType, consumer)` interface.
  Events are plain classes, and subscribers subscribe with the class itself (`subscribe(FooEvent, evt => ...)`,
  the bus filters with `instanceof`). Never identify an event by its class name (`FooEvent.name`): the production
  build minifies class names and they collide (every event class was named `t`, which left staging blank while
  `npm start`, not minified, worked). Each sub-domain has a sibling `*.events.ts` file.
  `InMemoryDomainEventBus` (`in-memory-domain-event-bus.ts`) is its only implementation, used by the app and by the
  specs: synchronous delivery in subscription order, and a subscription removed during a `publish` no longer
  receives that event.
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
- Anything the web app needs must be exported from `public-api.ts`; that file is what the `@recos-diet/domain`
  alias resolves to.

### Domain tests

Domain specs are plain unit tests, no `TestBed`. `shared.spec.ts` provides `EventsCaptor` (records events of one
type; `expectEventsCount`, `mapSingleEvent`, `close()`). Typical spec: build the class with a new
`InMemoryDomainEventBus`, publish input events or call methods, assert on the captured output events.
`warnings.spec.ts` shows the table-driven `params.forEach(param => it(...))` style used for rule matrices. Classes
that hold subscriptions (`Warnings`, `Micronutriments`) expose `close()`; call it in `afterEach`.

## Web architecture (projects/web/src)

- **Bootstrap**: standalone app, no NgModule. `main.ts` calls `bootstrapApplication(AppComponent, appConfig)`;
  `app/app.config.ts` holds the root providers (zone change detection, `provideRouter` with `app/app.routes.ts`,
  HttpClient) and runs `DomainLoaderService.load()` through `provideAppInitializer`. It fetches every JSON asset
  through `JsonAssetLoaderService` (cache-busted `GET /assets/<name>.json`), wraps each in a `Memory*Repository`
  from `infra/`, creates the bus (`InMemoryDomainEventBus` of the domain) and builds the `Domain`. Nothing renders
  until this resolves.
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
- **Seasonal themes** (Christmas, Halloween, April Fools) only add decorations, they do not touch the Material theme.
  `assets/theme.json` picks one: `"auto"` (the season of the day, `MM-DD` bounds included, a season may span the new
  year), `"none"`, or a theme name to force. `ThemeService.start()`, run by an app initializer, appends
  `<link href="theme-<name>.css?v=<version>">`, then reads `theme.json` again every `themeCheckDelay` (`environment`)
  and when the tab becomes visible again: the site stays open for days on the ward computers, so it swaps or removes
  the `<link>` without any reload, and keeps the current theme when `theme.json` cannot be read. In dev, `ng serve`
  reloads the page on any asset edit: test with `--live-reload=false`. Each theme is a style bundle with `"inject": false` in `angular.json`:
  built from `src/themes/<name>/<name>.scss` as an unhashed `theme-<name>.css`, outside the initial budget. It places
  its SVGs through the mixins of `src/themes/_decorations.scss`, only in empty areas (under the side menu, under the
  disclaimer, the header padding of the outermost cards and expansion panels). Adding a theme: its folder, its
  `angular.json` entry and its name in `themes` (`theme.service.ts`).

## Clinical data is JSON, not code

All recommendations live in `projects/web/src/assets/*.json`: `products.json`, `recos-enterale.json`,
`recos-parenterale.json`, `recos-exclusions.json`, `warnings.json`, `bibliography.json`, `survey.json`. Most
`fix:`/`chore:` commits in history are edits to these files. Their shapes are the `Json*` / `*Entity` interfaces
in the corresponding `infra/memory-*.repository.ts`.

The domain enums are **serialized display strings** and are used verbatim as keys in the JSON
(`Pathology.DENUTRITION_SRI = 'Dénutrition-SRI'`, `NutritionType.PARENTERALE = 'Parentérale'`). Renaming an enum
value silently breaks data matching; change both sides together.

## Versioning, release and deploy

The repository is https://github.com/recos-diet/recos-diet (moved from GitLab on 2026-10-14). CI runs on GitHub
Actions (`.github/workflows/`):

- `verify.yml`: lint, build (initial budget included), domain and web tests in ChromeHeadless, and `npm audit
  --omit=dev --audit-level=high`, blocking on ready pull requests only. Runs on pull requests; `release.yml` calls it.
  The Lint job lints each project in its own step: GitHub shows at most 10 warning annotations per step.
  `maxWarnings: 0` (`angular.json`, both projects) makes a warning fail `ng lint` like an error, so `npm run lint`
  locally and the required `Lint` check reject it.
  It sends both Cobertura reports to Coveralls in one build (`coverallsapp/github-action`, authenticated by the
  `GITHUB_TOKEN`, `fail-on-error: false`), which comments the coverage on the pull request; the `master` builds are
  the base of the comparison. `release.yml` only grants `contents: read` and a called workflow cannot ask for more:
  anything in `verify.yml` that needs `pull-requests: write` or `checks: write` must also be granted by `release.yml`.
- `release.yml`: on every push to `master`, `googleapis/release-please-action` opens or updates the release pull
  request, then the run verifies and deploys to staging. Merging the release pull request is the approval: its push
  makes release-please publish the release, and the same run deploys its build to production (backed up first). Only
  a release reaches production. *Run workflow* (`workflow_dispatch`) starts a run on the current `master` without
  deploying production; to deploy a release again, re-run the jobs of its run.
- Build version: the `release-please` job of `release.yml` computes it and `verify.yml` receives it as its `version`
  input, set with `npm pkg set` (`npm version` drops the `+` build metadata) before building. `2.4.0-rc.12+a1b2c3d`:
  the version of the open release pull request (label `autorelease: pending`), the commits since the last release tag
  and the commit. `2.3.1+a1b2c3d` when no release is due, `2.4.0` on the push that publishes it: that build goes to
  staging, then to production. Pull requests build the `package.json` version.
- `master` is protected by the `default branch` ruleset: pull request required, `Lint` and `Build and test` required.
  The release pull request is created with the `GITHUB_TOKEN`: GitHub creates its `pull_request` runs (Verify, Lint
  review) awaiting approval (`action_required`), again after each update by release-please. Approve the runs of its
  last commit (*Approve workflows to run*), then merge once the checks pass; bypassing the ruleset is the fallback.
  The release-please README says no workflow runs on such pull requests: no longer true. Release-please needs the
  repository setting *Allow GitHub Actions to create and approve pull requests* (Settings → Actions → General).
- `deploy.yml` (reusable): lftp mirror of the build over SFTP. The `staging` and `production` environments hold the
  `SFTP_HOST`/`SFTP_USERNAME`/`SFTP_PASSWORD` secrets and the `SFTP_DEST` variable, and only accept deployments from
  `master`; production is backed up as a run artifact (30 days) before each deploy. `.htaccess` in the build output
  provides the SPA rewrite.
- `lint-review.yml`: on pull requests only, `reviewdog/action-eslint` runs `eslint` (not `ng lint`) on
  `projects/*/src` and posts its findings on the lines the pull request adds or changes as review comments. Never
  blocking, the Lint job of `verify.yml` stays the gate. It is a separate workflow because it needs
  `pull-requests: write`, and `release.yml` calls `verify.yml` with `contents: read` only: a called workflow cannot
  ask for more than its caller grants. Every finding, untouched lines included, stays in the annotations of the Lint
  job (problem matchers of `actions/setup-node`).
- A commit message containing a skip marker such as `[skip ci]`, even quoted in its body, cancels the push and pull
  request workflows of that commit.

Releases and versions:

- **Conventional commits are required**: `feat:` / `fix:` / `perf:` (optionally scoped, e.g. `fix(products): ...`)
  call for a release; the other types (`chore:`, `docs:`, `ci:`, `refactor:`...) are hidden from the changelog and
  release nothing. Data edits are `fix(data):` commits, so they reach production and `AppUpdater` prompts the open
  tabs to reload (the data is only read at startup).
- `.release/release-please-config.json` and `.release/release-please-manifest.json` (current version) configure
  release-please: `node` release type (`package.json`, `package-lock.json`, `CHANGELOG.md`), tags and GitHub
  release names `x.y.z` without `v` like the existing tags, release pull request titled `chore(release): x.y.z`. `bootstrap-sha` (the commit of
  tag `2.3.1`, the last semantic-release release) only serves while no GitHub release exists. Up to 2.3.1 the
  changelog was written by semantic-release, which `.releaserc` configured.
- Version flow: `environment.prod.ts` imports the `package.json` version at build time (only that value ends up
  in the bundle); `version.json` is generated, not tracked, by `generate:version`, which the npm `prebuild` hook
  runs (locally and in CI). In production `AppUpdater` polls `/version.json` and prompts a reload when it differs
  from the running build; the staging version changes with every commit, so every staging deploy prompts too, and
  renews the theme stylesheets (`?v=<version>`). Dev builds report `SNAPSHOT-<timestamp>`.
- Default branch is `master`; feature work happens on `feat/*` branches.

Issues: #1 to #86 were imported from GitLab with their numbers, so `#N` references in the history still match.
Every issue has a type, chosen by asking whether a user (clinician, dietitian) will see a difference: `Feature`
(new or improved behavior they see), `Bug` (wrong behavior of the app, a test, a script or a workflow), `Refactor`
(the app code restructured, same behavior) or `Chore` (no change for users: dependencies, build, lint, CI/CD,
hosting, tests, docs, hardening). The type is the nature of the work, not the commit prefix: an `.htaccess` change is
a `Chore` committed as `fix:` so that a release ships it. Every issue also has three organization fields. `Effort`
and `Gain` (Low/Medium/High) replace GitLab's scoped labels. `Category` is the area of the product the issue changes:
`Clinical data` (content the dietitians validate: the JSON assets, the clinical texts of the pages), `Domain`
(`projects/domain`), `UI`, `Tests`, `Tooling`, `CI/CD` (what runs in GitHub Actions, `deploy.yml` included), `Infra`
(what the server does: `.htaccess`, HTTPS, domains) and `Docs`. A new page is `UI` even when its content is clinical,
editing the clinical text of an existing page is `Clinical data`, and an issue that adds a domain mechanism for a
clinical rule is `Domain`. Cross-cutting concerns are labels, not categories: `security` and `accessibility`. The
repository is public: vulnerabilities go through GitHub's private vulnerability reporting, never a public issue.
The `audit-2026-10` label marks the issues of `docs/pistes-amelioration-2026-10-03.md`. Their titles have no prefix:
the piste ID (`SEC-4`...) is in the first column of the table that opens their body, and they cite each other as
`SEC-3 (#65)`.
