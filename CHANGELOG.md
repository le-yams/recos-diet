# Changelog

## [2.4.2](https://github.com/recos-diet/recos-diet/compare/2.4.1...2.4.2) (2026-10-15)


### Bug Fixes

* **themes:** guirlande poilue à Noël, chauves-souris et fantômes à Halloween ([d1dfa39](https://github.com/recos-diet/recos-diet/commit/d1dfa39da89234ca9407b1ac1e1858069d1f751d))

## [2.4.1](https://github.com/recos-diet/recos-diet/compare/2.4.0...2.4.1) (2026-10-15)


### Bug Fixes

* **disclaimer:** mettre réanimation en gras ([9080a5d](https://github.com/recos-diet/recos-diet/commit/9080a5dd1111af7042b49c1c81a4667cae714880))
* **footer:** lier le numéro de version à sa GitHub Release ([2baeef4](https://github.com/recos-diet/recos-diet/commit/2baeef46c7b9681cf983c96a605bcede7320d029))
* **micronutriments:** fusionner les posologies quand une recommandation n'en donne pas ([1523908](https://github.com/recos-diet/recos-diet/commit/15239081b35b6cd094fb736e124dc0509a5a2a7e)), closes [#48](https://github.com/recos-diet/recos-diet/issues/48)

## [2.4.0](https://github.com/recos-diet/recos-diet/compare/2.3.1...2.4.0) (2026-10-14)


### Features

* **theme:** décorations saisonnières (Noël, Halloween, poisson d'avril) pilotées par assets/theme.json ([20be1be](https://github.com/recos-diet/recos-diet/commit/20be1be7c9d2149bb44b1128c18e25011fbe298b))


### Bug Fixes

* **about:** rétablir le bouton de don PayPal ([3ed593f](https://github.com/recos-diet/recos-diet/commit/3ed593fd4caeb46cc4ea0aaf61365eecaa0e20ff))
* adjusted weight formula ([49a98b7](https://github.com/recos-diet/recos-diet/commit/49a98b7fbe63c39eccc975631ea0262a6d853e37))
* christmas theme season ([5331106](https://github.com/recos-diet/recos-diet/commit/5331106973f69654e39e770baef06420e42cf2fb))
* **disclaimer:** supprimer le débordement horizontal du bandeau ([81723a1](https://github.com/recos-diet/recos-diet/commit/81723a16d3028c7c96ab4c06cbe44c2c4513aace))
* domain imports ([1444b7d](https://github.com/recos-diet/recos-diet/commit/1444b7d0a2a76b461c8b7d34ea0225c3336de83a))
* **domain:** s'abonner aux événements par classe et non par nom de classe ([cda1267](https://github.com/recos-diet/recos-diet/commit/cda1267e97028ae9a7118be8fcf233297d4c08bb)), closes [#57](https://github.com/recos-diet/recos-diet/issues/57)
* **footer:** pointer la version et le copyright vers le dépôt GitHub ([2b1296a](https://github.com/recos-diet/recos-diet/commit/2b1296a0f0c6b3039a14f1512ec6b4e692e7517d))
* **layout:** afficher le menu en entier quand la page est courte ([0297f66](https://github.com/recos-diet/recos-diet/commit/0297f66d900111ea537963abc2d874e065de0a74))
* min height and min weight ([6fbffbc](https://github.com/recos-diet/recos-diet/commit/6fbffbcc91b9bfb1f2037ae81421124a30cafb0b))
* **patient:** appliquer le poids ajusté dès un IMC &gt; 25 ([5db304f](https://github.com/recos-diet/recos-diet/commit/5db304f1377a57f9c770f1fceae5f36c9786ee40))
* **patient:** valider taille et poids avant propagation ([f70fce8](https://github.com/recos-diet/recos-diet/commit/f70fce821eca4cbd7ef2868f08e070141a16236e))
* **products:** ne plus planter quand l'IMC atteint 30 avec Anorexie et EER ([4edda41](https://github.com/recos-diet/recos-diet/commit/4edda41760d181a7b65cd66aca7218703fc4e218)), closes [#45](https://github.com/recos-diet/recos-diet/issues/45)
* **recos:** clé excludedClauses et exclusion B9/Zinc anorexie ([0ed1492](https://github.com/recos-diet/recos-diet/commit/0ed149217f3b80ba22c66c2cde14103ca0a3c065))
* **routes:** rediriger une URL inconnue vers l'accueil ([46745be](https://github.com/recos-diet/recos-diet/commit/46745bee58c591d6f25d50ce7918cd6b5bb830f6)), closes [#70](https://github.com/recos-diet/recos-diet/issues/70)
* **survey:** ne plus recharger l'iframe du sondage et charger survey.json une seule fois ([4a56c9e](https://github.com/recos-diet/recos-diet/commit/4a56c9ede4e8fdd8e8aef034608c77780178d93a)), closes [#60](https://github.com/recos-diet/recos-diet/issues/60)
* **themes:** afficher le coin des panneaux dépliés au survol et au focus ([2b6c54d](https://github.com/recos-diet/recos-diet/commit/2b6c54d5ce888e4e5bc122296f4de97a03e3bee7))
* **updater:** ne plus désactiver la détection de mise à jour après une erreur HTTP ([6325763](https://github.com/recos-diet/recos-diet/commit/6325763bf44b6a5a80ef24b523251bafc91fa053)), closes [#61](https://github.com/recos-diet/recos-diet/issues/61)
* **warnings:** afficher les avertissements les plus graves en premier ([f00d5e0](https://github.com/recos-diet/recos-diet/commit/f00d5e0f640387fc2fb1544db8a035d656c23533)), closes [#51](https://github.com/recos-diet/recos-diet/issues/51)


### Reverts

* rollback daily target phases relevancy change ([c49aa9d](https://github.com/recos-diet/recos-diet/commit/c49aa9d0ad6f47033464418b86e389fd2b57cf95))

## [2.3.1](https://github.com/recos-diet/recos-diet/compare/2.3.0...2.3.1) (2025-12-21)


### Bug Fixes

* vit C ([3c80ba0](https://github.com/recos-diet/recos-diet/commit/3c80ba04b18cfc5e674b5413401b014287f82aec))

# [2.3.0](https://github.com/recos-diet/recos-diet/compare/2.2.1...2.3.0) (2025-05-04)


### Bug Fixes

* anorexia specific Vit K recos ([52892f5](https://github.com/recos-diet/recos-diet/commit/52892f54620798a73a4fd0312cb1e93ce10399ad))
* default enterale product ([442003a](https://github.com/recos-diet/recos-diet/commit/442003a43172845429622aa0b86f057d784c1689))
* phosphorus title ([b00fb40](https://github.com/recos-diet/recos-diet/commit/b00fb405872a5fa7a2440ebae374a53385bdba2f))
* product selection on nutrition type change ([5ffca53](https://github.com/recos-diet/recos-diet/commit/5ffca533b24ee3a596df078370c8bb48cbcb5be1))
* products indication ([a768c75](https://github.com/recos-diet/recos-diet/commit/a768c756f164f4c55e7dac20ac7101c7b49ffc5d))
* **products:** sondalis hp energy fibres indications ([eb403e1](https://github.com/recos-diet/recos-diet/commit/eb403e16e462eb7cd6adadff288eb8a4c86a4b0a))
* remove enterale B1 IV clause ([340848c](https://github.com/recos-diet/recos-diet/commit/340848c0c090f431883a2a339559312af3f7daec))


### Features

* filter products for eer with obesity ([5013296](https://github.com/recos-diet/recos-diet/commit/5013296179cd92b8817419abccef16936b593fee))
* product warnings ([24282e4](https://github.com/recos-diet/recos-diet/commit/24282e4ff3214a3d23032a84515a55b26579f691))
* **products:** nutrison energy multifibres ([5534fd9](https://github.com/recos-diet/recos-diet/commit/5534fd9601e887adfa742c3216703c623d07b3b0))

## [2.2.1](https://github.com/recos-diet/recos-diet/compare/2.2.0...2.2.1) (2023-04-14)


### Bug Fixes

* adjusted weight ([46d5412](https://github.com/recos-diet/recos-diet/commit/46d5412045bdab86225f15f526a8950da5fa4a8c))

# [2.2.0](https://github.com/recos-diet/recos-diet/compare/2.1.1...2.2.0) (2023-02-21)


### Features

* add periolimel product ([f4c6aaa](https://github.com/recos-diet/recos-diet/commit/f4c6aaa79ccf483cf9a0f8453f75eb7c22b3d8ad))

## [2.1.1](https://github.com/recos-diet/recos-diet/compare/2.1.0...2.1.1) (2022-11-02)


### Bug Fixes

* update dependency ([071bcc9](https://github.com/recos-diet/recos-diet/commit/071bcc90b0b4af46a38f3b65b3704e92d6ce8734))

# [2.1.0](https://github.com/recos-diet/recos-diet/compare/2.0.2...2.1.0) (2022-10-07)


### Bug Fixes

* survey link ([a09cb9e](https://github.com/recos-diet/recos-diet/commit/a09cb9eca41d9373c3120126f7ddf6bdd6fa6885))


### Features

* survey ([41c8203](https://github.com/recos-diet/recos-diet/commit/41c8203b1061b5eeab63aa223a97ee7229c4ac96))

## [2.0.2](https://github.com/recos-diet/recos-diet/compare/2.0.1...2.0.2) (2022-06-23)


### Bug Fixes

* weight input with 1 fraction digit ([5b23f4f](https://github.com/recos-diet/recos-diet/commit/5b23f4f2aac44bb11bdd45deb3c6fae1f365a235))

## [2.0.1](https://github.com/recos-diet/recos-diet/compare/2.0.0...2.0.1) (2022-05-23)


### Bug Fixes

* **patient-form:** enter key event regression ([0ffe528](https://github.com/recos-diet/recos-diet/commit/0ffe528fe3bdeab5b437b6d6118e3a2e19f9b6d2))

# [2.0.0](https://github.com/recos-diet/recos-diet/compare/1.35.2...2.0.0) (2022-05-18)


### Features

* recos-diet v2 ([1ba0adb](https://github.com/recos-diet/recos-diet/commit/1ba0adbc77c457b823bba3e7955734f3d0bd28ab))


### BREAKING CHANGES

* v2

# [1.8.0](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.7.0...1.8.0) (2022-04-07)


### Bug Fixes

* rewrite rules with htaccess ([94ebec8](https://gitlab.com/ydisanto/recos-diet-ddd/commit/94ebec8c1600d70dba416d6454d841677e904c1e))


### Features

* update covid vit. D recommendation ([cbb14bc](https://gitlab.com/ydisanto/recos-diet-ddd/commit/cbb14bc6336007ff3cf34198ea481025127f4500))

# [1.7.0](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.6.0...1.7.0) (2022-04-05)


### Bug Fixes

* handset mode menu title ([b6093f4](https://gitlab.com/ydisanto/recos-diet-ddd/commit/b6093f4559307405bd6323388cc26737d4cb36cd))


### Features

* move warnings to pathologies ([f67d70d](https://gitlab.com/ydisanto/recos-diet-ddd/commit/f67d70d3d6a193828c0a46a54511c95c70f5cae8))
* **target-flows-strip:** remove 30kcal when obesity ([95dddc9](https://gitlab.com/ydisanto/recos-diet-ddd/commit/95dddc9232c919d07f7a0d36cb6a36b82ad4d70f))
* update denutrition ([f4b7f79](https://gitlab.com/ydisanto/recos-diet-ddd/commit/f4b7f7972f865aaee9cd4807ef81bd76e3f0959c))
* update denutrition source for old patients ([61d62ce](https://gitlab.com/ydisanto/recos-diet-ddd/commit/61d62ce53c3d706e5ea6d1ae0fc149261ac144a6))
* update products ([0ff4d8c](https://gitlab.com/ydisanto/recos-diet-ddd/commit/0ff4d8c294d05f0be57e7d911c1225059a808bf7))

# [1.6.0](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.5.0...1.6.0) (2022-02-24)


### Bug Fixes

* **accessibility:** improve footer contrast ([9056193](https://gitlab.com/ydisanto/recos-diet-ddd/commit/9056193d9c12dfb22bd49845d23dbbbec5c2601e))
* IMC denutrition criteria ([38d922a](https://gitlab.com/ydisanto/recos-diet-ddd/commit/38d922a8980e08b3b1c4f782d04f6d86f15b158a))
* set page lang to fr ([8378735](https://gitlab.com/ydisanto/recos-diet-ddd/commit/8378735b41cab066260fc2d841126645b3302a66))


### Features

* app update ([f62d9fa](https://gitlab.com/ydisanto/recos-diet-ddd/commit/f62d9fad928e6dc95e49671604bb02f12c50235f))

# [1.5.0](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.4.0...1.5.0) (2021-09-27)


### Bug Fixes

* handset flying menu fully ([a117ee9](https://gitlab.com/ydisanto/recos-diet-ddd/commit/a117ee9424cafd48f7373ba867ac522f077df010))


### Features

* merging target flows and micronutriments ([2dec2a2](https://gitlab.com/ydisanto/recos-diet-ddd/commit/2dec2a2f9db63f61aa45e4704f2da95c11e435da))
* products page ([e12284b](https://gitlab.com/ydisanto/recos-diet-ddd/commit/e12284b060efe7ae640e990f22f073813f32fe8b))

# [1.4.0](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.3.1...1.4.0) (2021-09-17)


### Features

* pathology warnings ([a63c4f8](https://gitlab.com/ydisanto/recos-diet-ddd/commit/a63c4f889370ea04aa30271ccd4f4378f6ea3ae0))

## [1.3.1](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.3.0...1.3.1) (2021-09-02)


### Bug Fixes

* **footer:** make badge more readable ([d41026c](https://gitlab.com/ydisanto/recos-diet-ddd/commit/d41026c3716648d7ca3c11e4602b9efd6b52b6d0))

# [1.3.0](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.2.1...1.3.0) (2021-09-02)


### Bug Fixes

* remove target flows strip center justification ([d3ead68](https://gitlab.com/ydisanto/recos-diet-ddd/commit/d3ead685dc7212d2a1ac11371bdafedfaa583cc3))
* rename micronutriment to micronutriment ([47c3190](https://gitlab.com/ydisanto/recos-diet-ddd/commit/47c3190c4bf937eb883243216495db4623b8e92d))


### Features

* highlight bibliography entry ([a3ae86e](https://gitlab.com/ydisanto/recos-diet-ddd/commit/a3ae86e64281ddf34d881b7c12205fc87f637378))
* nutritionist opinion requirement warning ([c6b0177](https://gitlab.com/ydisanto/recos-diet-ddd/commit/c6b0177b960fa1d0c384e3d4b63260529936b5e6))

## [1.2.1](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.2.0...1.2.1) (2021-08-01)


### Bug Fixes

* nutriments data assets ([d4239e5](https://gitlab.com/ydisanto/recos-diet-ddd/commit/d4239e533fadb6ab880e9bebbe62a464330a21c6))

# [1.2.0](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.1.0...1.2.0) (2021-08-01)


### Features

* handset sticky menu ([c6ac12f](https://gitlab.com/ydisanto/recos-diet-ddd/commit/c6ac12f9510951e067211e1dd36c1f79f929e72a))
* rename recommendations to nutriments ([a6f6a43](https://gitlab.com/ydisanto/recos-diet-ddd/commit/a6f6a43dfebd8de084e0bbb11ef49fb757c25188))

# [1.1.0](https://gitlab.com/ydisanto/recos-diet-ddd/compare/1.0.0...1.1.0) (2021-07-31)


### Bug Fixes

* use proper events type name ([654cf11](https://gitlab.com/ydisanto/recos-diet-ddd/commit/654cf117fc81d4101d2505bf27204127ceda459f))
* wrong domain import ([be686f0](https://gitlab.com/ydisanto/recos-diet-ddd/commit/be686f0fa2ded10674b826ac19020db63bd4e3ed))


### Features

* nutriment exclusions ([f7944b3](https://gitlab.com/ydisanto/recos-diet-ddd/commit/f7944b3c5f994e77cc33470fb0ec9554bb6e2f1d))

# 1.0.0 (2021-07-31)


### Bug Fixes

* center pane width ([3bbbf09](https://gitlab.com/ydisanto/recos-diet-ddd/commit/3bbbf096a8d996b539602aba8072a5bb3bdcfe2f))


### Features

* about page ([eb43af0](https://gitlab.com/ydisanto/recos-diet-ddd/commit/eb43af0b5ee5883e6b065a81e88553ae090321c6))
* add disclaimer ([fe6bcac](https://gitlab.com/ydisanto/recos-diet-ddd/commit/fe6bcacbd6dd73b42dc9325ed49505b970944127))
* add patient form ([2145480](https://gitlab.com/ydisanto/recos-diet-ddd/commit/2145480384e916e938cfafdcd93911046b87917f))
* add sidenav ([8edfb8a](https://gitlab.com/ydisanto/recos-diet-ddd/commit/8edfb8ae0663f3bdf6adbb65a2ce84b4e1fcc0e1))
* add wip image ([c77d68f](https://gitlab.com/ydisanto/recos-diet-ddd/commit/c77d68ff4161924c96b11a84b7a623511aa9f7a9))
* bibliography ([02d751e](https://gitlab.com/ydisanto/recos-diet-ddd/commit/02d751e618c731d506505ee143ba165128fe6bc8))
* denutrition ([6a9a52f](https://gitlab.com/ydisanto/recos-diet-ddd/commit/6a9a52f6752daccf8efa1756c156782a497c4fbf))
* flows strip ([daec266](https://gitlab.com/ydisanto/recos-diet-ddd/commit/daec266eef6eac21dadc83aa50d750d75f34d303))
* footer and about page (wip) ([041c6ce](https://gitlab.com/ydisanto/recos-diet-ddd/commit/041c6ce080a216fb3efa05876ac8954fc3c02325))
* nutrition ([d877923](https://gitlab.com/ydisanto/recos-diet-ddd/commit/d8779231a8eaab650fa6afec9f9024ca4f294e6e))
* pathologies ([5a47f50](https://gitlab.com/ydisanto/recos-diet-ddd/commit/5a47f5091ee3ecf5ce0f456cb6d605803dd25a6a))
* recos ([dff2710](https://gitlab.com/ydisanto/recos-diet-ddd/commit/dff2710ffe43231bf2de135e35ac50c9f29cada7))
* sri ([f531ce8](https://gitlab.com/ydisanto/recos-diet-ddd/commit/f531ce8cfdee0e5762430cb98ffc37f2d06b4ba7))
* target flows ([269f87d](https://gitlab.com/ydisanto/recos-diet-ddd/commit/269f87dd0154c90ae8442d4ffda8bd3eefeb4f7a))
* update footer ([a5eb96a](https://gitlab.com/ydisanto/recos-diet-ddd/commit/a5eb96a2e89a176892e44b3cd96e2db75215d0dc))
* **bibliography:** add bibliography link navigation ([1ff46eb](https://gitlab.com/ydisanto/recos-diet-ddd/commit/1ff46ebfa586516b37f54c8a8afa45ce48b115a2))
* **menu:** add selected menu label for handset ([0a3028b](https://gitlab.com/ydisanto/recos-diet-ddd/commit/0a3028b823d78691cc402fcc686f277fe73e1a68))
