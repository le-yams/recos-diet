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

- chaque pull request est vérifiée (lint, build, tests, audit des dépendances) par `verify.yml`, qui envoie la
  couverture des tests à [Coveralls](https://coveralls.io/github/recos-diet/recos-diet) : elle est commentée dans la
  pull request, avec l'écart par rapport à `master` ;
- chaque push sur `master` est vérifié puis déployé sur l'environnement de staging par `release.yml`, qui attend
  ensuite une approbation (environnement `release`) pour publier la version (semantic-release, GitHub Release) et
  déployer la production.

Le build de staging porte la version à venir, calculée par un dry-run de semantic-release : `2.4.0-rc.12+a1b2c3d`
(prochaine version, nombre de commits depuis la dernière, commit), ou `2.3.1+a1b2c3d` quand aucune version n'est
prévue. La production porte la version publiée.

Les messages de commit suivent les [Conventional Commits](https://www.conventionalcommits.org/) : `feat:` et `fix:`
déclenchent une nouvelle version.
