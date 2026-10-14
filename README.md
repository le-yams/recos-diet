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
  déployer la production.

Les messages de commit suivent les [Conventional Commits](https://www.conventionalcommits.org/) : `feat:` et `fix:`
déclenchent une nouvelle version.
