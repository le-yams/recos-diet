export const nutritionTypes = {
    ENTERALE: 'Entérale',
    PARENTERALE: 'Parentérale',
};

export const productsLabel = {
    NUTRISON_PROTEIN_PLUS_ENERGY_MULTIFIBRES: 'Nutrison Protein Plus Energy Multifibres',
    OLIMEL_N7E: 'Olimel N7E (USC)',
    OLIMEL_N9E: 'Olimel N9E (Réa)',
    MEDNUTRIFLEX_OMEGA: 'Mednutriflex Omega N5E (USC)',
    PEPTAMEN_HN: 'Peptamen HN',
    PEPTISORB: 'Peptisorb (hypolipidique)',
    REANUTRIFLEX_OMEGA: 'Réanutriflex Omega N8 (Réa)',
    SMOKABIVEN_PROTEIN: 'SMOFKABIVEN PROTEINE N10 (Réa)',
    SONDALIS_HP_ENERGY: 'Sondalis HP Energy',
    SONDALIS_JUNIOR_STANDARD: 'Sondalis Junior Standard',
    SONDALIS_T_ENERGY: 'Sondalis T Energy',
};

export const pathologieNames = {
    ANOREXIE_MENTALE: 'Anorexie mentale',
    CIRRHOTIQUE: 'Cirrhotique',
    COVID_19: 'COVID-19',
    CVVHDF: 'EER continue',
    DENUTRITION_SRI: 'Dénutrition-SRI',
    OBESITE: 'Obésité',
    OH: 'OH',
};

export const dietOpinionWarnings = [
    {
        text: "Avis diététique recommandé",
        variant: "warning"
    },
    {
        text: "Avis diététique fortement recommandé",
        variant: "danger"
    },
];

export default {
    nutritionTypes: {
        ...nutritionTypes
    },
    products: {
        ...productsLabel
    },
    nutritions: {
        'Entérale': {
            products: [
                {
                    label: productsLabel.NUTRISON_PROTEIN_PLUS_ENERGY_MULTIFIBRES,
                    kcalPerLiter: 1530,
                    proteinsGramsPerLiter: 75,
                },
                {
                    label: productsLabel.PEPTAMEN_HN,
                    kcalPerLiter: 1330,
                    proteinsGramsPerLiter: 66,
                },
                {
                    label: productsLabel.PEPTISORB,
                    kcalPerLiter: 1000,
                    proteinsGramsPerLiter: 40,
                },
                {
                    label: productsLabel.SONDALIS_HP_ENERGY,
                    kcalPerLiter: 1500,
                    proteinsGramsPerLiter: 75,
                    default: true,
                },
                {
                    label: productsLabel.SONDALIS_JUNIOR_STANDARD,
                    kcalPerLiter: 1000,
                    proteinsGramsPerLiter: 20,
                },
                {
                    label: productsLabel.SONDALIS_T_ENERGY,
                    kcalPerLiter: 1550,
                    proteinsGramsPerLiter: 60,
                },
            ],
            recommendations: [
                {
                    label: "Alvityl (po/sng)",
                    quantity: "1",
                    unit: "comprimé/jour",
                    clauses: ["si apports < 1500 kcal/j"],
                    sources: ["tnctav-p2137"],
                },
            ],
        },
        'Parentérale': {
            products: [
                {
                    label: productsLabel.MEDNUTRIFLEX_OMEGA,
                    kcalPerLiter: 1010,
                    proteinsGramsPerLiter: 38,
                },
                {
                    label: productsLabel.OLIMEL_N7E,
                    kcalPerLiter: 1140,
                    proteinsGramsPerLiter: 44.3,
                },
                {
                    label: productsLabel.OLIMEL_N9E,
                    kcalPerLiter: 1070,
                    proteinsGramsPerLiter: 56.9,
                },
                {
                    label: productsLabel.REANUTRIFLEX_OMEGA,
                    kcalPerLiter: 1180,
                    proteinsGramsPerLiter: 56,
                    default: true,
                },
                {
                    label: productsLabel.SMOKABIVEN_PROTEIN,
                    kcalPerLiter: 889,
                    proteinsGramsPerLiter: 65.5,
                },
            ],
            recommendations: [
                {
                    label: "Nutryelt",
                    quantity: "1",
                    unit: "ampoule 10ml/jour",
                    clauses: [],
                    sources: ["tnctav-p2133"],
                },
                {
                    label: "Cernevit",
                    quantity: "1",
                    unit: "ampoule 5ml/jour",
                    clauses: [],
                    sources: ["tnctav-p2133"],
                },
                {
                    label: "Vit. K",
                    quantity: "10",
                    unit: "mg par semaine",
                    clauses: ["en IV", "si pas de contre-indication médicale"],
                    sources: ["tnctav-p1499", "tnctav-p1735-1736", "bd-pub-medocs-cernevit"],
                },
            ],
        },
    },
    pathologies: [
        {
            label: pathologieNames.ANOREXIE_MENTALE,
            recommendations: {
                'Entérale': [
                    {
                        label: "Nutryelt",
                        quantity: "1",
                        unit: "ampoule 10ml/jour",
                        clauses: ["en IV"],
                        sources: ["tnctav-p2742"],
                    },
                    {
                        label: "Cernevit",
                        quantity: "1",
                        unit: "ampoule 5ml/jour",
                        clauses: ["en IV"],
                        sources: ["tnctav-p2742"],
                    },
                    {
                        label: "Vit. B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        sources: ["tnctav-p2742", "md374smani"],
                    },
                    {
                        label: "Vit. B9",
                        quantity: "25",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        excludeClauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: ["tnctav-p1853"],
                    },
                    {
                        label: "Zinc",
                        quantity: "10",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        excludeClauses: ["seulement si encéphalopathie hépatique, carence ou infection"],
                        sources: ["tnctav-p2737", "md374smani"],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "1",
                        unit: "ampoule 10ml/jour",
                        clauses: ["en IV"],
                        sources: ["tnctav-p2742"],
                    },
                    {
                        label: "Cernevit",
                        quantity: "1",
                        unit: "ampoule 5ml/jour",
                        clauses: ["en IV"],
                        sources: ["tnctav-p2742"],
                    },
                    {
                        label: "Vit. B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        sources: ["tnctav-p2742", "md374smani"],
                    },
                    {
                        label: "Vit. B9",
                        quantity: "25",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        excludeClauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: ["tnctav-p1853"],
                    },
                    {
                        label: "Zinc",
                        quantity: "10",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        excludeClauses: ["seulement si encéphalopathie hépatique, carence ou infection"],
                        sources: ["tnctav-p2737", "md374smani"],
                    },
                ],
                exclusions: ['Alvityl (po/sng)', 'Vit. K']
            },
            dietOpinionWarningLevel: 1,
        },
        {
            label: pathologieNames.CIRRHOTIQUE,
            recommendations: {
                'Entérale': [
                    {
                        label: "Zinc",
                        quantity: "15",
                        unit: "mg/jour",
                        clauses: ["seulement si encéphalopathie hépatique, carence ou infection"],
                        sources: ["monitoring-in-cirrhosis-p927-928", "easl-cpgonicld-p14", "srmauozthe-p2-p5"],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Zinc",
                        quantity: "15",
                        unit: "mg/jour",
                        clauses: ["seulement si encéphalopathie hépatique, carence ou infection"],
                        sources: ["monitoring-in-cirrhosis-p927-928", "easl-cpgonicld-p14", "srmauozthe-p2-p5"],
                    }
                ],
            },
        },
        {
            label: pathologieNames.COVID_19,
            recommendations: {
                'Entérale': [
                    {
                        label: "Vit. B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [],
                        sources: ["sfncm-covid-rea-p2"],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Vit. B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: [],
                        sources: ["sfncm-prev-sri-covid-p2"],
                    },],
            },
        },
        {
            label: pathologieNames.CVVHDF,
            recommendations: {
                'Entérale': [
                    {
                        label: "Alvityl (po/sng)",
                        quantity: "2",
                        unit: "comprimés/jour",
                        clauses: ["puis 1 comprimé/jour lorsque le BE est atteint"],
                        sources: ["afar-p208"],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "2",
                        unit: "ampoules 10ml",
                        clauses: [],
                        sources: ["afar-p208"],
                    },
                    {
                        label: "Cernevit",
                        quantity: "2",
                        unit: "ampoule 5ml",
                        clauses: [],
                        sources: ["afar-p208"],
                    },
                ],
            },
        },
        {
            label: pathologieNames.DENUTRITION_SRI,
            recommendations: {
                'Entérale': [
                    {
                        label: "Alvityl (po/sng)",
                        quantity: "1",
                        unit: "comprimé/jour",
                        clauses: ["pendant 10 jours minimum"],
                        sources: ["nice"],
                    },
                    {
                        label: "Vit. B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["pendant 10 jours minimum"],
                        sources: ["nice"],
                    },
                    {
                        label: "Vit. B9",
                        quantity: "25",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: ["tnctav-p1853"],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Vit. B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: ["pendant 10 jours minimum"],
                        sources: ["nice"],
                    },
                    {
                        label: "Vit. B9",
                        quantity: "25",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: ["tnctav-p1853"],
                    },
                ],
            },
            warning: {
                text: "Ne pas débuter la nutrition à un débit supérieur ou égal 20 kcal/kg/j",
                sources: ["tnctav-p1852"],
                variant: "danger",
            },
            dietOpinionWarningLevel: 0,
        },
        {
            label: pathologieNames.OBESITE,
            calculation: {
                perform: function (patientInfo) {
                    return patientInfo.bmi >= 30;
                },
                description: 'IMC >= 30'
            },
            recommendations: {
                'Entérale': [],
                'Parentérale': [],
            },
        },
        {
            label: pathologieNames.OH,
            recommendations: {
                'Entérale': [
                    {
                        label: "Vit. B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [
                            "majorer à 1g/jour pendant 10 jours en cas de dénutrition-SRI ou de COVID-19",
                        ],
                        sources: ["sri-prev"],
                    },
                    {
                        label: "Vit. B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
                        sources: ["pc-alcool-p376", "ncm-v25-p172-176"],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Vit. B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [
                            "majorer à 1g/jour pendant 10 jours en cas de dénutrition-SRI ou de COVID-19",
                        ],
                        sources: ["sri-prev"],
                    },
                    {
                        label: "Vit. B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
                        sources: ["pc-alcool-p376", "ncm-v25-p172-176"],
                    },
                ],
            },
        },
    ],
    bibliography: [
        {
            id: "espen-p58",
            index: 1,
            label: 'ESPEN (2019), Guideline on clinical nutrition in the intensive care unit. p.58',
            url: 'https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf'
        },
        {
            id: "espen-p52",
            index: 2,
            label: 'ESPEN (2019), Guideline on clinical nutrition in the intensive care unit. p.52',
            url: 'https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf'
        },
        {
            id: "espen-p66",
            index: 3,
            label: 'ESPEN (2019), Guideline on clinical nutrition in the intensive care unit. p.66',
            url: 'https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf'
        },
        {
            id: "afar-p204",
            index: 4,
            label: 'AFAR, Annales Françaises d’Anesthésie et de Réanimation (2014), Nutrition artificielle en réanimation. p.204',
            url: 'https://sfar.org/wp-content/uploads/2015/10/2_AFAR_Nutrition-artificielle-en-reanimation.pdf'
        },
        {
            id: "afar-p208",
            index: 5,
            label: 'AFAR, Annales Françaises d’Anesthésie et de Réanimation (2014), Nutrition artificielle en réanimation. p.208',
            url: 'https://sfar.org/wp-content/uploads/2015/10/2_AFAR_Nutrition-artificielle-en-reanimation.pdf'
        },
        {
            id: "tnctav-p1499",
            index: 6,
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.1499 chapitre 54',
        },
        {
            id: "tnctav-p1735-1736",
            index: 7,
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.1735-1736 chapitre 63',
        },
        {
            id: "tnctav-p1852",
            index: 8,
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.1852 chapitre 66',
        },
        {
            id: "tnctav-p1853",
            index: 9,
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.1853 chapitre 66',
        },
        {
            id: "tnctav-p2133",
            index: 10,
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.2133 chapitre 75',
        },
        {
            id: "tnctav-p2137",
            index: 11,
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.2137 chapitre ',
        },
        {
            id: "tnctav-p2737",
            index: 12,
            label: 'Mouna Hanachi, Nadja Kayser, Damien Ringuenet, Jean-Claude Melchior ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.2737 chapitre 93',
        },
        {
            id: "tnctav-p2742",
            index: 13,
            label: 'Mouna Hanachi, Nadja Kayser, Damien Ringuenet, Jean-Claude Melchior ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.2742 chapitre 93',
        },
        {
            id: "nice",
            index: 14,
            label: 'NICE, National Institute for Health and Care Excellence (2017). Nutrition Support for adults : oral nutrition support, enteral tube feeding an parenteral nutrition.',
            url: 'https://www.nice.org.uk/guidance/cg32/chapter/1-Guidance#ftn.footnote_8'
        },
        {
            id: "sri-prev",
            index: 15,
            label: 'Barras-Moret Anne-Catherine, Guex Esther, Coti Bertrand Pauline, Le syndrome de renutrition inapproprié : la clé du traitement est la prévention (2011).',
            url: 'https://www.sfncm.org/images/stories/pdf_pratiquesnutrition/Barras-Moret%20NCM%202011.pdf'
        },
        {
            id: "pc-alcool-p376",
            index: 16,
            label: 'Airagnais G, Ducoutumany G, Laffy-Beaufils B, Le Faou A-L, Limousin F, La prise en charge du syndrome de sevrage de l’alcool : quelles nouveautés ? (2019). p.376',
        },
        {
            id: "sfncm-covid-rea-p2",
            index: 17,
            label: 'SFNCM, Société Francophone Nutrition Clinique et Métabolisme, Nutrition du patient covid-19 intubé et ventilé en réanimation (2020). p.2',
            url: 'https://www.sfncm.org/images/stories/Fiches_Covid_19/Fiche_08_COVID-19.pdf'
        },
        {
            id: "sfncm-prev-sri-covid-p2",
            index: 18,
            label: 'SFNCM, Société Francophone Nutrition Clinique et Métabolisme, Prévention du syndrome de renutrition inapproprié (SRI) des patients COVID 19 (2020). p.2',
            url: 'https://www.sfncm.org/images/stories/Fiches_Covid_19/Fiche_03_COVID-19.pdf'
        },
        {
            id: "bd-pub-medocs-cernevit",
            index: 19,
            label: 'Base de données publique des médicaments, Fiche info CERNEVIT (2020).',
            url: 'http://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid=61001031'
        },
        {
            id: "monitoring-in-cirrhosis-p927-928",
            index: 20,
            label: 'A.H.Koop, O Y. Mousa, L E. Pham, J.E. C-H, S.Pungpapong, A P.Keaveny, An argument for vitamin D, A and zinc monitoring in cirrhosis (2018). p.927-928',
        },
        {
            id: "easl-cpgonicld-p14",
            index: 21,
            label: 'European Association for the Study of the liver (EASL), Clinical practice guideline on nutrition in chronic liver disease (2019). p.14',
        },
        {
            id: "srmauozthe-p2-p5",
            index: 22,
            label: 'N C. Chavez-Tapia, A. Cesar-Arce, T. Barrientos-Gutiérrez, F A. Villegas-López, N. Méndez-Sanchez, M. Uribe, A systematic review and meta-analysis of the use of oral zinc in the treatment of hepatic encephalopathy (2013). p.2 et 5',
        },
        {
            id: "md374smani",
            index: 23,
            label: 'Hanachi M, Dicembre M, Rives-Lange C, et al. Micronutrients Deficiencies in 374 Severely Malnourished Anorexia Nervosa Inpatients. Nutrients. 2019;11(4):792. Published 2019 Apr 5. doi:10.3390/nu11040792',
        },
        {
            id: "ncm-v25-p172-176",
            index: 24,
            label: 'Benoît Dupont, Servais Eloumou, Marie-Astrid Piquet ; Nutrition clinique et métabolisme, Volume 25, n° 3, (septembre 2011). p.172-176',
        },
        {
            id: "ideal-body-weight-equation",
            index: 25,
            label: 'Peterson CM, Thomas DM, Blackburn GL, Heymsfield SB. Universal equation for estimating ideal body weight and body weight at any BMI. Am J Clin Nutr 2016;103:1197-203',
            url: 'http://refhub.elsevier.com/S0261-5614(18)32432-4/sref14',
        },

    ],
    calculatedPathologies: function () {
        return this.pathologies.filter(p => p.calculation)
    },
};
