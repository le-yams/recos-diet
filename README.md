# Recos Diet

Site web présentant les recommandations nutritionnelles pour le patient adulte de réanimation alimenté en nutrition
artificielle.

Cet outil a été élaboré en partenariat avec l'équipe diététique du service de réanimation du CHU de Toulouse.

## Développement

Prérequis : Node 24 (voir `.nvmrc`).

```bash
npm ci
npm start   # serveur de développement sur http://localhost:4200
npm test    # tests unitaires (Karma, Chrome)
```

## Livraison

La CI tourne sur GitHub Actions :

- chaque pull request est vérifiée (lint, build, tests, audit des dépendances) par `verify.yml` ;
- chaque push sur `master` est vérifié puis déployé sur l'environnement de staging par `release.yml`, qui attend
  ensuite une approbation (environnement `release`) pour publier la version (semantic-release, GitHub Release) et
  déployer la production ;
- sur chaque pull request, `lint-review.yml` commente les problèmes ESLint des lignes ajoutées ou modifiées
  ([reviewdog](https://github.com/reviewdog/reviewdog)), sans bloquer : le job Lint de `verify.yml` reste le contrôle.

Le build de staging porte la version à venir, calculée par un dry-run de semantic-release : `2.4.0-rc.12+a1b2c3d`
(prochaine version, nombre de commits depuis la dernière, commit), ou `2.3.1+a1b2c3d` quand aucune version n'est
prévue. La production porte la version publiée.

Les messages de commit suivent les [Conventional Commits](https://www.conventionalcommits.org/) : `feat:` et `fix:`
déclenchent une nouvelle version.
