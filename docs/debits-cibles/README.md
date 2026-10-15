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
| 2026-10-13 | Variante 1 retenue : bornes énergétiques et protéiques dans la frise, cible protéique en g/j seulement dans l'en-tête de phase. Phases renommées « Défaillance stabilisée », « Phase aiguë tardive », « Réhabilitation ». Phase 1 : cible énergétique de 6 kcal/kg/j (au lieu de ≤ 10). Poids ajusté appliqué dès IMC > 25 : retour sur la condition modifiée par 49a98b7, sa nouvelle formule est conservée. Nouveau concept : apports énergétiques non nutritionnels (propofol, glucosé, CVVH citrate), déduits de la cible énergétique sauf en phase 1, avec un débit libellé « Débit cible corrigé ». |

## 1. Objectif

Remodeler la partie « débits cibles » pour la réactualiser par rapport aux dernières recommandations
des sociétés savantes de nutrition, et mieux représenter les **phases** des stratégies
nutritionnelles en soins critiques. Aujourd'hui l'UI raisonne en « paliers » de cible énergétique
(10, 15, 20, 25, 30 kcal/kg/j) affichés tous ensemble ; demain le médecin choisit la phase courante
du patient et ne voit que les paliers et la cible protéique de cette phase.

## 2. Phases et paliers

| # | Phase | Énergie, recos (kcal/kg/j) | Paliers énergétiques (kcal/kg/j) | Protéines, recos (g/kg/j) |
|---|---|---|---|---|
| 1 | Défaillance stabilisée | 6 | 6 | ≤ 0,4 |
| 2 | Phase aiguë tardive | 10 à 20 | 10, 15, 20 | ≤ 0,9 |
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

Notations : `P` poids ajusté du patient (kg) — dans l'application il est égal au poids réel
si IMC ≤ 25 (seuil à rétablir, cf. décision du 2026-10-13) —, `E` cible énergétique du palier (kcal/kg/j),
`K` densité énergétique du produit (kcal/L), `G` teneur protéique du produit (g/L), `A` apports
énergétiques non nutritionnels (kcal/j, § 4), **pris à 0 en phase 1**.

1. Cible énergétique du palier : `E` kcal/kg/j, soit `P × E` kcal/j.
2. Débit théorique, toujours sur 24 h/24 : `D_th = (P × E − A) / K × 1000 / 24` (mL/h). Hypothèse
   de la maquette : si `A ≥ P × E`, le débit est nul (question ouverte).
3. **Débit cible = `D = arrondi(D_th)` à l'entier le plus proche** (règle figée par l'équipe
   diététique, pas d'arrondi par défaut). Seuls des débits entiers sont applicables sur les pompes ;
   c'est une contrainte opérationnelle, pas un choix d'affichage.
4. Volume quotidien effectif : `V = D × 24 / 1000` (L/j).
5. Apports « réels », **toujours calculés à partir du débit arrondi `D`** :
   - énergie totale `= V × K + A` (kcal/j) ; énergie par kg `= (V × K + A) / P` (kcal/kg/j). Ajout
     de `A` : hypothèse de la maquette, puisque c'est ce total qui est comparé à la cible ;
   - protéines totales `= V × G` (g/j) ; protéines par kg `= V × G / P` (g/kg/j). Les apports non
     nutritionnels n'apportent pas de protéines.
6. Bornes protéiques de la phase en g/j : `borne (g/kg/j) × P`.
7. Statut protéique de chaque palier : dans la cible si les protéines réelles respectent les bornes
   de la phase, **sans marge de tolérance**. Phases 1 et 2 : pas de borne basse, un apport très bas
   est dans la cible. Sinon hors cible, par excès ou par défaut, avec un **écart exprimé en g/j** (protéines
   réelles g/j − borne dépassée g/j).

Différence avec le code actuel (`projects/domain/src/target-flows/daily-target-flows.ts`) : le débit
y est calculé en flottant puis arrondi **à l'affichage** seulement, et les apports sont dérivés de la
cible théorique, pas du débit arrondi. Il n'y a ni notion de phase, ni cible protéique, ni statut.

### Exemple de référence

Patient 70 kg, Nutrison Protein Plus Energy (1500 kcal/L, 75 g/L), sans apport non nutritionnel :

| Phase | Palier | Cible kcal/j | D_th | D (mL/h) | kcal/j réel | kcal/kg/j réel | g prot/j | g/kg/j | Bornes g/j | Statut (écart) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 6 | 420 | 11,67 | **12** | 432 | 6,2 | 21,6 | 0,31 | ≤ 28 | dans la cible |
| 2 | 10 | 700 | 19,44 | **19** | 684 | 9,8 | 34,2 | 0,49 | ≤ 63 | dans la cible |
| 2 | 15 | 1050 | 29,17 | **29** | 1044 | 14,9 | 52,2 | 0,75 | ≤ 63 | dans la cible |
| 2 | 20 | 1400 | 38,89 | **39** | 1404 | 20,1 | 70,2 | 1,00 | ≤ 63 | au-dessus (+7,2 g/j) |
| 3 | 20 | 1400 | 38,89 | **39** | 1404 | 20,1 | 70,2 | 1,00 | 84 à 105 | en dessous (−13,8 g/j) |
| 3 | 25 | 1750 | 48,61 | **49** | 1764 | 25,2 | 88,2 | 1,26 | 84 à 105 | dans la cible |

Même patient avec du propofol à 10 mL/h : `A = 10 × 24 × 1,1 = 264` kcal/j, soit 3,8 kcal/kg/j.
La colonne « kcal/j réel » inclut `A` (hypothèse de la maquette).

| Phase | Palier | Cible kcal/j | Cible produit kcal/j | D_th | D (mL/h) | kcal/j réel | kcal/kg/j réel | g prot/j | g/kg/j | Bornes g/j | Statut (écart) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 6 | 420 | 420 (pas de déduction) | 11,67 | **12** | 432 | 6,2 | 21,6 | 0,31 | ≤ 28 | dans la cible |
| 2 | 10 | 700 | 436 | 12,11 | **12** corrigé | 696 | 9,9 | 21,6 | 0,31 | ≤ 63 | dans la cible |
| 2 | 15 | 1050 | 786 | 21,83 | **22** corrigé | 1056 | 15,1 | 39,6 | 0,57 | ≤ 63 | dans la cible |
| 2 | 20 | 1400 | 1136 | 31,56 | **32** corrigé | 1416 | 20,2 | 57,6 | 0,82 | ≤ 63 | dans la cible |
| 3 | 20 | 1400 | 1136 | 31,56 | **32** corrigé | 1416 | 20,2 | 57,6 | 0,82 | 84 à 105 | en dessous (−26,4 g/j) |
| 3 | 25 | 1750 | 1486 | 41,28 | **41** corrigé | 1740 | 24,9 | 73,8 | 1,05 | 84 à 105 | en dessous (−10,2 g/j) |

Ces valeurs sont celles à reprendre dans `daily-target-flows.spec.ts`.

## 4. Apports énergétiques non nutritionnels

Le patient reçoit parfois des produits non nutritionnels qui apportent néanmoins de l'énergie.
L'utilisateur les déclare dans un encart placé au-dessus de la frise ; leur énergie `A` est retirée
de la cible énergétique de chaque palier pour calculer le débit, **sauf en phase 1**.

| Produit | Apport | Saisie |
|---|---|---|
| Propofol | 1,1 kcal/mL | débit en mL/h |
| Glucosé 2,5 % | 100 kcal/L | variante et débit en mL/h |
| Glucosé 5 % / Polyionique | 200 kcal/L | variante et débit en mL/h |
| Glucosé 10 % | 400 kcal/L | variante et débit en mL/h |
| CVVH citrate | 200 kcal/j, apport fixe | aucune |

`A` (kcal/j) = débit propofol × 24 × 1,1 + débit glucosé × 24 / 1000 × apport de la variante
+ 200 si CVVH citrate.

Règles transmises par l'équipe diététique :

- Une ligne par produit, avec une case à cocher ; aucun produit coché par défaut. Plusieurs produits
  peuvent être cochés ensemble, mais une seule variante de glucosé à la fois (liste déroulante,
  2,5 % par défaut).
- Les apports propres à chaque produit (tableau ci-dessus) ne sont pas affichés : ils ne servent
  qu'au calcul et n'intéressent pas les utilisateurs.
- Propofol et glucosé cochés : un champ de débit (mL/h) s'affiche, obligatoire, entier ou décimal à
  un chiffre après la virgule.
- Dernière ligne, seulement si au moins un produit est coché : la somme des apports en kcal/kg/j,
  à 0,1 près.
- Phases 2 et 3 : chaque débit calculé en déduisant des apports non nutritionnels est libellé
  « Débit cible corrigé ».

Propositions de la maquette (version 7), à valider : apport de chaque produit en kcal/j sur sa
ligne et total aussi en kcal/j ; choisir une variante de glucosé coche le produit ; un produit
dont le débit manque ou est mal formé n'est pas compté et son champ est
signalé ; en phase 1, un rappel indique que les apports ne sont pas déduits ; la part non
nutritionnelle est rappelée sous l'énergie réelle de chaque palier.

## 5. Affichage

Ordre dans la carte « Débits cibles » : encart des apports non nutritionnels (§ 4), frise de
sélection de la phase, contenu de la phase choisie.

### Sélection de la phase

- Le médecin choisit la **phase courante** du patient ; seules les informations de cette phase sont
  affichées.
- Sélecteur : **frise cliquable**. Le bandeau à chevrons actuel (`flows-strip`), que les
  utilisateurs connaissent déjà, devient le sélecteur ; il garde l'ordre des phases (1 → 2 → 3) et
  montre la progression. Phase choisie en couleur pleine, autres phases pâles. La variante en
  onglets a été écartée.
- **Phase 1 sélectionnée par défaut.** Le choix est conservé quand le poids, le produit ou les
  pathologies changent (sauf si la phase n'est plus proposée, par exemple anorexie : retour en phase 1).
- Chaque chevron porte, sous le nom de la phase, les bornes des recommandations (le repère des
  médecins) : énergie en kcal/kg/j **et** protéines en g/kg/j (variante 1, retenue le 2026-10-13).
  L'en-tête de la phase ne reprend donc la cible protéique qu'en g/j (le repère des diététiciens).
- Téléphone (proposition de la maquette version 7) : trois chevrons avec noms et bornes ne tiennent
  pas sur 375 px ; les phases non choisies se réduisent à leur numéro, la phase choisie prend la
  place restante.
- Anorexie mentale : le sélecteur ne présente que la phase 1.

### Contenu d'une phase (visuel de la maquette B)

1. En-tête :
   - nom de la phase ;
   - phases 2 et 3 uniquement : la mention « Réalimentation progressive », en taille de texte normale ;
   - cible protéique de la phase, en g/j seulement (les g/kg/j sont dans la frise), par exemple
     « Cible protéique de la phase **≤ 63 g/j** ». Elle doit ressortir autant que les paliers :
     texte non grisé, encadré à la couleur de la phase, valeur plus grande.
2. Paliers énergétiques empilés verticalement sur un rail, dans l'ordre de progression. Pour chaque
   palier :
   - cible énergétique en kcal/kg/j **et** en kcal/j, libellée « Cible énergétique **10 kcal/kg/j**
     soit 700 kcal/j » (seule la valeur en kcal/kg/j est en gras) ;
   - **débit cible** en mL/h (entier), la donnée principale, celle que le soignant programme ;
     libellé « Débit cible corrigé » quand des apports non nutritionnels sont déduits (phases 2 et 3) ;
   - énergie réelle (kcal/kg/j et kcal/j) et protéines réelles (g/kg/j et g/j) ;
   - pastille protéique sans libellé : « Protéines dans la cible », « Protéines au-dessus de la cible
     (+x g/j) » ou « Protéines sous la cible (−x g/j) ».

## 6. Constats sur l'UI existante

- Toutes les informations ne sont pas présentes, en particulier le statut « dans ou hors de la
  cible » des protéines.
- Les phases ne sont pas identifiées par leur libellé mais par leur cible énergétique (10, 20, 25…).
- L'affichage n'est pas intuitif : le bandeau `flows-strip` représente les phases horizontalement,
  alors que les valeurs sont listées verticalement en dessous, sans correspondance visuelle.
- Le palier 30 kcal a été « masqué » dans le domaine (`target30.isRelevant` renvoie `false`) car il
  concerne le cas particulier « patient chronique » qui sera traité plus tard ; mais le bandeau
  l'affiche encore hors obésité.

## 7. Questions ouvertes pour l'équipe diététique

À trancher avant d'implémenter ; la maquette fait des hypothèses explicitement marquées.

1. **Apports non nutritionnels supérieurs à la cible** : quand `A` atteint ou dépasse la cible
   d'un palier, la maquette affiche 0 mL/h et « Cible énergétique déjà couverte ». Autre
   comportement souhaité ?
2. **Énergie réelle** : la maquette l'affiche apports non nutritionnels compris (« dont x kcal/kg/j
   non nutritionnels »). À confirmer, ou afficher l'énergie du produit seul ?
3. **Anorexie mentale** : seule la phase 1 est proposée, donc les apports non nutritionnels ne sont
   jamais déduits. Masquer l'encart dans ce cas ?
4. **Saisie incomplète** : un produit coché sans débit valide n'est pas compté et son champ est
   signalé. Faut-il plutôt suspendre l'affichage des débits corrigés ?
5. **Libellé de la phase 3** : les retours écrivent « Réabilitation » ; la maquette garde
   « Réhabilitation ». À confirmer.
6. **Bibliographie** : en cours de préparation par l'équipe diététique, à intégrer dans
   `assets/bibliography.json`.

## 8. Pistes techniques (pour mémoire, à affiner après validation)

- Décrire les phases dans un fichier de données (`assets/phases.json` : nom, rang, paliers, bornes
  protéiques, règles d'applicabilité par pathologie) plutôt qu'en constantes TypeScript, dans
  l'esprit « les données cliniques sont du JSON ».
- `DailyTargetFlows` calcule toutes les phases applicables (avec arrondi, apports réels et statut
  protéique) et publie le résultat ; la phase sélectionnée reste un état d'affichage dans le
  composant, sauf si une autre partie de l'app doit en dépendre (avertissements, micronutriments).
- Apports non nutritionnels : produits et apports dans les données (par exemple
  `assets/non-nutritional-intakes.json`) ; un sous-domaine dédié tient la saisie, calcule `A` en
  kcal/j et publie un `...UpdatedEvent` ; `DailyTargetFlows` s'y abonne et ne déduit `A` que pour les
  phases qui le prévoient (pas la phase 1). La saisie est une écriture du composant vers le domaine,
  comme `patient.updateSize(...)`.
- Encart en composants Material déjà thémés (`mat-checkbox`, `mat-select`, `mat-form-field` /
  `matInput`, mixins présents dans `theme.scss`). Débit saisi en texte (`inputmode="decimal"`)
  pour accepter la virgule, validé par un motif « entier ou une décimale ».
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
  `theme.scss` pour elle. Les SVG en ligne de la
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
