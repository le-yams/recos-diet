# Débits cibles par phase — spécification métier (en cours)

Document de travail pour la refonte de la carte « Débits cibles » (issue GitLab
[#42](https://gitlab.com/ydisanto/recos-diet/-/issues/42), branche `feat/target_flows`).
Il consigne le besoin exprimé par l'équipe diététique du CHU de Toulouse le temps de terminer la
feature. Une fois la feature livrée, les règles figées ici doivent vivre dans le code (spec
`daily-target-flows.spec.ts`) et dans les données (`assets/*.json`) ; ce document pourra alors être
réduit à un historique de décision ou supprimé.

Fichiers associés :

- [maquettes.html](maquettes.html) — maquette interactive à montrer à l'équipe (s'ouvre dans un
  navigateur, sans serveur ni connexion). HTML, CSS et JavaScript natifs, sans dépendance : elle
  n'a pas à suivre les versions d'Angular de l'application.
- [Note d'audit ARCH-1](../pistes-amelioration-2026-10-03.md) — constat de départ (paliers 10/30
  modifiés sans trace, bandeau `flows-strip` désynchronisé, absence de spec).

## Historique des décisions

| Date | Décision |
|---|---|
| 2026-10-04 | Trois phases nommées remplacent les paliers 10/15/20/25/30. Débit arrondi à l'entier le plus proche, apports réels calculés sur le débit arrondi. |
| 2026-10-06 | Après revue des premières maquettes (A horizontale, B verticale, C tableau) : une seule phase affichée à la fois, choisie par le médecin ; visuel de la maquette B. Phases 2 et 3 découpées en paliers de réalimentation progressive. Anorexie mentale : phase 1 seule. Libellé « Statut protéique » supprimé, écart protéique exprimé en g/j. |
| 2026-10-06 | Sélecteur de phase : frise cliquable (variante onglets écartée). Phase 1 sélectionnée par défaut. Aucune autre pathologie n'a d'effet sur les phases. Libellés : « Réalimentation progressive » seul, au-dessus de la cible protéique ; « Cible énergétique » devant chaque palier. |
| 2026-10-06 | Phase conservée quand le poids, le produit ou les pathologies changent. Poids de calcul = poids ajusté (égal au poids réel si IMC ≤ 30). Débit toujours sur 24 h/24. Cible protéique à mettre davantage en valeur ; proposition à valider : bornes en g/kg/j dans la frise. |
| 2026-10-06 | Anorexie mentale : phase 1 avec les mêmes chiffres que pour les autres patients. Statut protéique : pas de borne basse en phases 1 et 2, pas de marge de tolérance. Si la frise porte les bornes, elle affiche aussi les bornes énergétiques, et l'en-tête de phase ne reprend la cible protéique qu'en g/j. |

## 1. Objectif

Remodeler la partie « débits cibles » pour la réactualiser par rapport aux dernières recommandations
des sociétés savantes de nutrition, et mieux représenter les **phases** des stratégies
nutritionnelles en soins critiques. Aujourd'hui l'UI raisonne en « paliers » de cible énergétique
(10, 15, 20, 25, 30 kcal/kg/j) affichés tous ensemble ; demain le médecin choisit la phase courante
du patient et ne voit que les paliers et la cible protéique de cette phase.

## 2. Phases et paliers

| # | Phase | Énergie, recos (kcal/kg/j) | Paliers énergétiques (kcal/kg/j) | Protéines, recos (g/kg/j) |
|---|---|---|---|---|
| 1 | État de choc / Défaillance multiviscérale | ≤ 10 | 10 | ≤ 0,4 |
| 2 | Stabilisation | 10 à 20 | 10, 15, 20 | ≤ 0,9 |
| 3 | Réhabilitation | 20 à 25 | 20, 25 (+ 30 pour « patient chronique », plus tard) | 1,2 à 1,5 |

Règles transmises par l'équipe diététique :

- Chaque palier est une **cible énergétique** pour laquelle on calcule un débit.
- La phase 2 dure environ 5 jours et la réalimentation doit y être **progressive** : afficher
  seulement la cible finale (20) serait trompeur pour le médecin. On affiche donc les trois paliers
  10, 15, 20, dans l'ordre de progression.
- La phase 3 suit le même principe avec les paliers 20 et 25. Le palier 30 sera réservé à une
  pathologie « patient chronique » qui n'existe pas encore dans l'application ; il est ignoré pour
  l'instant.
- La **cible protéique est globale à la phase** (pas par palier). Phases 1 et 2 : borne haute seule.
  Phase 3 : fourchette.
- **L'apport énergétique prime** sur l'apport protéique : du fait de la composition des produits
  disponibles, il n'est pas toujours possible d'atteindre les deux objectifs. On vise l'énergie et on
  signale si les protéines sont ou non dans la cible.

### Pathologies

- **Anorexie mentale** : seule la phase 1 est proposée (les phases 2 et 3 ne sont pas affichées),
  avec les mêmes chiffres que pour les autres patients.
- **Patient chronique** (pathologie à créer) : ajoute le palier 30 kcal/kg/j en phase 3.
- Autres pathologies (Dénutrition-SRI, obésité, cirrhose…) : aucun effet sur les phases, les paliers
  ou les bornes protéiques (confirmé par l'équipe). Le palier 15 propre à SRI dans le code actuel
  disparaît : il fait désormais partie de la phase 2 pour tous.

## 3. Calcul

Notations : `P` poids ajusté du patient (kg) — dans l'application il est déjà égal au poids réel
si IMC ≤ 30 —, `E` cible énergétique du palier (kcal/kg/j),
`K` densité énergétique du produit (kcal/L), `G` teneur protéique du produit (g/L).

1. Cible énergétique du palier : `E` kcal/kg/j, soit `P × E` kcal/j.
2. Débit théorique, toujours sur 24 h/24 : `D_th = P × E / K × 1000 / 24` (mL/h).
3. **Débit cible = `D = arrondi(D_th)` à l'entier le plus proche** (règle figée par l'équipe
   diététique, pas d'arrondi par défaut). Seuls des débits entiers sont applicables sur les pompes ;
   c'est une contrainte opérationnelle, pas un choix d'affichage.
4. Volume quotidien effectif : `V = D × 24 / 1000` (L/j).
5. Apports « réels », **toujours calculés à partir du débit arrondi `D`** :
   - énergie totale `= V × K` (kcal/j) ; énergie par kg `= V × K / P` (kcal/kg/j) ;
   - protéines totales `= V × G` (g/j) ; protéines par kg `= V × G / P` (g/kg/j).
6. Bornes protéiques de la phase en g/j : `borne (g/kg/j) × P`.
7. Statut protéique de chaque palier : dans la cible si les protéines réelles respectent les bornes
   de la phase, **sans marge de tolérance**. Phases 1 et 2 : pas de borne basse, un apport très bas
   est dans la cible. Sinon hors cible, par excès ou par défaut, avec un **écart exprimé en g/j** (protéines
   réelles g/j − borne dépassée g/j).

Différence avec le code actuel (`projects/domain/src/target-flows/daily-target-flows.ts`) : le débit
y est calculé en flottant puis arrondi **à l'affichage** seulement, et les apports sont dérivés de la
cible théorique, pas du débit arrondi. Il n'y a ni notion de phase, ni cible protéique, ni statut.

### Exemple de référence

Patient 70 kg, Nutrison Protein Plus Energy (1500 kcal/L, 75 g/L) :

| Phase | Palier | Cible kcal/j | D_th | D (mL/h) | kcal/j réel | kcal/kg/j réel | g prot/j | g/kg/j | Bornes g/j | Statut (écart) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 10 | 700 | 19,44 | **19** | 684 | 9,8 | 34,2 | 0,49 | ≤ 28 | au-dessus (+6,2 g/j) |
| 2 | 10 | 700 | 19,44 | **19** | 684 | 9,8 | 34,2 | 0,49 | ≤ 63 | dans la cible |
| 2 | 15 | 1050 | 29,17 | **29** | 1044 | 14,9 | 52,2 | 0,75 | ≤ 63 | dans la cible |
| 2 | 20 | 1400 | 38,89 | **39** | 1404 | 20,1 | 70,2 | 1,00 | ≤ 63 | au-dessus (+7,2 g/j) |
| 3 | 20 | 1400 | 38,89 | **39** | 1404 | 20,1 | 70,2 | 1,00 | 84 à 105 | en dessous (−13,8 g/j) |
| 3 | 25 | 1750 | 48,61 | **49** | 1764 | 25,2 | 88,2 | 1,26 | 84 à 105 | dans la cible |

Ces valeurs sont celles à reprendre dans `daily-target-flows.spec.ts`.

## 4. Affichage

### Sélection de la phase

- Le médecin choisit la **phase courante** du patient ; seules les informations de cette phase sont
  affichées.
- Sélecteur : **frise cliquable**. Le bandeau à chevrons actuel (`flows-strip`), que les
  utilisateurs connaissent déjà, devient le sélecteur ; il garde l'ordre des phases (1 → 2 → 3) et
  montre la progression. Phase choisie en couleur pleine, autres phases pâles. La variante en
  onglets a été écartée.
- **Phase 1 sélectionnée par défaut.** Le choix est conservé quand le poids, le produit ou les
  pathologies changent (sauf si la phase n'est plus proposée, par exemple anorexie : retour en phase 1).
- Option à trancher : chaque chevron porte, sous le nom de la phase, les bornes des recommandations
  (le repère des médecins) : énergie en kcal/kg/j **et** protéines en g/kg/j. Dans ce cas, l'en-tête
  de la phase ne reprend la cible protéique qu'en g/j (le repère des diététiciens). Risque : une frise trop chargée, notamment sur
  téléphone avec le libellé long de la phase 1.
- Anorexie mentale : le sélecteur ne présente que la phase 1.

### Contenu d'une phase (visuel de la maquette B)

1. En-tête :
   - nom de la phase ;
   - phases 2 et 3 uniquement : la mention « Réalimentation progressive », en taille de texte normale ;
   - cible protéique de la phase :
     - si la frise ne porte pas les bornes : en g/kg/j (en gras) **et** en g/j (sans gras), par
       exemple « Cible protéique de la phase **≤ 0,9 g/kg/j** soit ≤ 63 g/j » ;
     - si la frise porte les bornes : en g/j seulement, par exemple « Cible protéique de la phase
       **≤ 63 g/j** ». Elle doit ressortir autant
     que les paliers : texte non grisé, encadré à la couleur de la phase, valeur g/kg/j plus grande.
2. Paliers énergétiques empilés verticalement sur un rail, dans l'ordre de progression. Pour chaque
   palier :
   - cible énergétique en kcal/kg/j **et** en kcal/j, libellée « Cible énergétique **10 kcal/kg/j**
     soit 700 kcal/j » (seule la valeur en kcal/kg/j est en gras) ;
   - **débit cible** en mL/h (entier), la donnée principale, celle que le soignant programme ;
   - énergie réelle (kcal/kg/j et kcal/j) et protéines réelles (g/kg/j et g/j) ;
   - pastille protéique sans libellé : « Protéines dans la cible », « Protéines au-dessus de la cible
     (+x g/j) » ou « Protéines sous la cible (−x g/j) ».

## 5. Constats sur l'UI existante

- Toutes les informations ne sont pas présentes, en particulier le statut « dans ou hors de la
  cible » des protéines.
- Les phases ne sont pas identifiées par leur libellé mais par leur cible énergétique (10, 20, 25…).
- L'affichage n'est pas intuitif : le bandeau `flows-strip` représente les phases horizontalement,
  alors que les valeurs sont listées verticalement en dessous, sans correspondance visuelle.
- Le palier 30 kcal a été « masqué » dans le domaine (`target30.isRelevant` renvoie `false`) car il
  concerne le cas particulier « patient chronique » qui sera traité plus tard ; mais le bandeau
  l'affiche encore hors obésité.

## 6. Questions ouvertes pour l'équipe diététique

À trancher avant d'implémenter ; la maquette fait des hypothèses explicitement marquées.

1. **Bornes dans la frise** : à garder ou à retirer si la frise est trop chargée ? La maquette
   présente les deux variantes l'une sous l'autre.
2. **Bibliographie** : en cours de préparation par l'équipe diététique, à intégrer dans
   `assets/bibliography.json`.

## 7. Pistes techniques (pour mémoire, à affiner après validation)

- Décrire les phases dans un fichier de données (`assets/phases.json` : nom, rang, paliers, bornes
  protéiques, règles d'applicabilité par pathologie) plutôt qu'en constantes TypeScript, dans
  l'esprit « les données cliniques sont du JSON ».
- `DailyTargetFlows` calcule toutes les phases applicables (avec arrondi, apports réels et statut
  protéique) et publie le résultat ; la phase sélectionnée reste un état d'affichage dans le
  composant, sauf si une autre partie de l'app doit en dépendre (avertissements, micronutriments).
- Fusionner `flows-strip` et `target-flows` en un seul composant, dans la carte « Débits cibles » de
  `page-home` : la frise devient le sélecteur de phase (rôle `tablist`, navigation clavier
  gauche/droite) ; l'UI ne doit plus arrondir.
- Composant fusionné selon les conventions de l'application depuis Angular 22 : standalone (ce que
  le template utilise dans `imports`), dépendances par `inject()`, détection de changements `OnPush`
  (par défaut), `@if` / `@for` dans le template.
  - Les phases calculées passent par `TargetFlowsService` (`BehaviorSubject` initialisé par le
    getter du domaine puis alimenté par `DailyTargetFlowsUpdatedEvent`), lues avec `async` ou
    `toSignal`.
  - La phase sélectionnée est un `signal` local ; la phase affichée, un `computed` qui revient en
    phase 1 quand la phase choisie n'est plus proposée (anorexie). Avec `OnPush`, une valeur
    affectée dans un `subscribe()` ne rafraîchirait pas la vue.
- Reprendre le HTML et le CSS de la maquette (`.strip` / `.chev` en `clip-path`, `.steps` / `.rail` /
  `.step-grid`, `.pill`) ; ses couleurs de phase viennent déjà de `flows-strip.component.css` et
  `styles.css`. La frise reste sur mesure, sans `mat-tab-group` : aucun mixin à ajouter dans
  `theme.scss` (à faire si un composant Material s'ajoute malgré tout). Les SVG en ligne de la
  maquette deviennent des icônes FontAwesome (`FaIconComponent`), comme dans le reste de
  l'application.
- Formatage des nombres : la maquette affiche des virgules (`Intl.NumberFormat("fr-FR")`),
  l'application actuelle des points (`toFixed`), et aucune locale n'y est enregistrée. Soit
  `registerLocaleData(localeFr)` et `LOCALE_ID` à `'fr'` dans `app.config.ts` avec `DecimalPipe`,
  soit un pipe dédié sur `Intl.NumberFormat`.
- Supprimer la logique pathologie → paliers de `PathologyContext` (SRI) ; seule l'anorexie mentale
  restreint les phases.
- Ajouter la pathologie « patient chronique » dans un second temps (enum `Pathology` + JSON).
- Livrer sous `feat(target-flows): …` pour tracer la règle dans le CHANGELOG.
