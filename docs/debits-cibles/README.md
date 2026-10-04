# Débits cibles par phase — spécification métier (en cours)

Document de travail pour la refonte de la carte « Débits cibles » (issue GitLab
[#42](https://gitlab.com/ydisanto/recos-diet/-/issues/42), branche `feat/target_flows`).
Il consigne le besoin exprimé par l'équipe diététique du CHU de Toulouse le temps de terminer la
feature. Une fois la feature livrée, les règles figées ici doivent vivre dans le code (spec
`daily-target-flows.spec.ts`) et dans les données (`assets/*.json`) ; ce document pourra alors être
réduit à un historique de décision ou supprimé.

Fichiers associés :

- [maquettes.html](maquettes.html) — maquettes interactives à montrer à l'équipe (s'ouvre dans un
  navigateur, sans serveur ni connexion).
- [Note d'audit ARCH-1](../pistes-amelioration-2026-10-03.md) — constat de départ (paliers 10/30
  modifiés sans trace, bandeau `flows-strip` désynchronisé, absence de spec).

## 1. Objectif

Remodeler la partie « débits cibles » pour la réactualiser par rapport aux dernières recommandations
des sociétés savantes de nutrition, et mieux représenter les **phases** des stratégies
nutritionnelles en soins critiques. Aujourd'hui l'UI raisonne en « paliers » de cible énergétique
(10, 15, 20, 25, 30 kcal/kg/j) ; demain elle doit raisonner en phases cliniques nommées, chacune
portant une cible énergétique et une cible protéique.

## 2. Les trois phases (cas général)

| # | Phase | Énergie (kcal/kg/j) | Protéines (g/kg/j) | Cible énergétique retenue pour le calcul |
|---|---|---|---|---|
| 1 | État de choc / Défaillance multiviscérale | ≤ 10 | ≤ 0,4 | 10 |
| 2 | Stabilisation | 10 à 20 | ≤ 0,9 | 20 |
| 3 | Réhabilitation | 20 à 25 | 1,2 à 1,5 | 25 |

Règles transmises par l'équipe diététique :

- La cible énergétique utilisée pour calculer le débit est le **maximum** de la fourchette de la
  phase (10, 20, 25).
- Pour les protéines, les phases 1 et 2 n'ont qu'une **borne haute** ; la phase 3 a une fourchette
  (borne basse et borne haute).
- **L'apport énergétique prime** sur l'apport protéique : du fait de la composition des produits
  disponibles, il n'est pas toujours possible d'atteindre les deux objectifs. On vise l'énergie et on
  signale si les protéines sont ou non « dans la cible ».

## 3. Calcul

Notations : `P` poids de référence du patient (kg), `E` cible énergétique de la phase (kcal/kg/j),
`K` densité énergétique du produit (kcal/L), `G` teneur protéique du produit (g/L).

1. Débit théorique : `D_th = P × E / K × 1000 / 24` (mL/h).
2. **Débit cible = `D = arrondi(D_th)` à l'entier le plus proche** (règle figée par l'équipe diététique,
   pas d'arrondi par défaut). Seuls des débits entiers sont applicables sur les pompes ; c'est une
   contrainte opérationnelle, pas un choix d'affichage.
3. Volume quotidien effectif : `V = D × 24 / 1000` (L/j).
4. Apports « réels », **toujours calculés à partir du débit arrondi `D`** :
   - énergie totale `= V × K` (kcal/j) ;
   - énergie par kg `= V × K / P` (kcal/kg/j) — proche de `E` mais peut en différer légèrement ;
   - protéines totales `= V × G` (g/j) ;
   - protéines par kg `= V × G / P` (g/kg/j).
5. Statut protéique : « dans la cible » si les protéines par kg respectent les bornes de la phase
   (≤ 0,4 ; ≤ 0,9 ; entre 1,2 et 1,5). Sinon « hors cible », en précisant si c'est par excès ou par
   défaut et de combien.

Différence avec le code actuel (`projects/domain/src/target-flows/daily-target-flows.ts`) : le débit
y est calculé en flottant puis arrondi **à l'affichage** seulement, et les apports sont dérivés de la
cible théorique, pas du débit arrondi. Il n'y a ni cible protéique ni statut « dans la cible ».

### Exemple de référence

Patient 70 kg, Nutrison Protein Plus Energy (1500 kcal/L, 75 g/L) :

| Phase | E | D_th | D (mL/h) | kcal/j | kcal/kg/j | g prot/j | g/kg/j | Statut protéique |
|---|---|---|---|---|---|---|---|---|
| 1 | 10 | 19,44 | **19** | 684 | 9,8 | 34,2 | 0,49 | hors cible (> 0,4) |
| 2 | 20 | 38,89 | **39** | 1404 | 20,1 | 70,2 | 1,00 | hors cible (> 0,9) |
| 3 | 25 | 48,61 | **49** | 1764 | 25,2 | 88,2 | 1,26 | dans la cible |

Ces valeurs sont celles à reprendre dans `daily-target-flows.spec.ts`.

## 4. Informations à afficher par phase

1. Nom de la phase (et son rang 1, 2, 3 — l'ordre est une information clinique).
2. Fourchettes recommandées (énergie, protéines) — ce sont les recommandations, pas le résultat.
3. **Débit cible** en mL/h (entier) — la donnée principale, celle que le soignant programme.
4. Apport énergétique réel : par kg et total.
5. Apport protéique réel : par kg et total.
6. Statut protéique : dans / hors cible, avec l'écart.

## 5. Constats sur l'UI existante

- Toutes les informations ne sont pas présentes, en particulier le statut « dans ou hors de la
  cible » des protéines.
- Les phases ne sont pas identifiées par leur libellé mais par leur cible énergétique (10, 20, 25…).
- L'affichage n'est pas intuitif : le bandeau `flows-strip` représente les phases horizontalement,
  alors que les valeurs sont listées verticalement en dessous, sans correspondance visuelle.
- Le palier 30 kcal a été « masqué » dans le domaine (`target30.isRelevant` renvoie `false`) car il
  concerne un cas particulier qui sera traité plus tard ; mais le bandeau l'affiche encore hors
  obésité.

## 6. Questions ouvertes pour l'équipe diététique

À trancher avant d'implémenter ; les maquettes font des hypothèses explicitement marquées.

1. **Poids de référence** : le calcul utilise aujourd'hui le poids ajusté si IMC > 30, sinon le
   poids réel. On garde ce poids `P` pour les trois phases ? Doit-il être affiché à côté des débits ?
2. **Pathologies et phases** : le code actuel adapte les paliers selon les pathologies (palier 15
   pour Dénutrition-SRI ; anorexie mentale limitée à 10). Comment ces cas s'articulent-ils avec les
   trois phases ? Phases supplémentaires, bornes différentes, ou phases masquées ?
3. **Cas particulier « 30 kcal »** : quel est ce cas, et faut-il prévoir dès maintenant une 4ᵉ phase
   désactivée dans les données plutôt que dans le code ?
4. **Durée d'administration** : le débit est calculé sur 24 h/24. Faut-il permettre une durée
   différente (nutrition cyclique, pauses) ?
5. **Statut protéique** : pour les phases 1 et 2, un apport très bas est-il « dans la cible » (pas
   de borne basse) ? Faut-il un seuil de tolérance (ex. 1,55 g/kg accepté en phase 3) ?
6. **Affichage** : préférence entre les maquettes (horizontal, vertical, tableau) ; la phase
   « courante » du patient doit-elle pouvoir être sélectionnée pour être mise en avant ?
7. **Bibliographie** : références des sociétés savantes à citer (fournies par l'équipe diététique),
   à intégrer dans `assets/bibliography.json`.

## 7. Pistes techniques (pour mémoire, à affiner après validation)

- Décrire les phases dans un fichier de données (`assets/phases.json` : nom, rang, bornes énergie et
  protéines, règles d'applicabilité par pathologie) plutôt qu'en constantes TypeScript, dans l'esprit
  « les données cliniques sont du JSON ».
- Faire porter l'arrondi et le statut protéique par le domaine (`DailyTargetFlows`), exposés dans
  `DailyTargetFlow` ; l'UI ne doit plus arrondir.
- Fusionner `flows-strip` et `target-flows` en un seul composant pour que la représentation des phases
  et les valeurs soient le même objet visuel.
- Livrer sous `feat(target-flows): …` pour tracer la règle dans le CHANGELOG.
