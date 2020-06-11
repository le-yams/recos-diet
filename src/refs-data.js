const nutritionTypes = {
    ENTERALE: 'Entérale',
    PARENTERALE: 'Parentérale',
};

const products = {
    NUTRISON_PROTEIN_PLUS_ENERGY_MULTIFIBRES: 'Nutrison Protein Plus Energy Multifibres',
    OLIMEL_N7E: 'Olimel N7E (USC)',
    OLIMEL_N9E: 'Olimel N9E',
    MEDNUTRIFLEX_OMEGA: 'Mednutriflex Omega N5E (USC)',
    PEPTAMEN_HN: 'Peptamen HN',
    PEPTISORB: 'Peptisorb (hypolipidique)',
    REANUTRIFLEX_OMEGA: 'Réanutriflex Omega N8 (Réa)',
    SMOKABIVEN_PROTEIN: 'SMOFkabiven Protein N10 (Réa)',
    SONDALIS_HP_ENERGY: 'Sondalis HP Energy',
    SONDALIS_JUNIOR_STANDARD: 'Sondalis Junior Standard',
    SONDALIS_T_ENERGY: 'Sondalis T Energy',
};

export const pathologieNames = {
    ANOREXIE_MENTALE: 'Anorexie mentale',
    CIRRHOTIQUE: 'Cirrhotique',
    COVID_19: 'COVID-19',
    CVVHDF: 'CVVHDF',
    DENUTRITION_SRI: 'Dénutrition-SRI',
    OBESITE: 'Obésité',
    OH: 'OH',
};

export default {
    nutritionTypes: {
        ...nutritionTypes
    },
    products: {
        ...products
    },
    nutritions: {
        'Entérale': {
            products: [
                {
                    label: products.NUTRISON_PROTEIN_PLUS_ENERGY_MULTIFIBRES,
                    // label: "Nutrison Protein Plus Energy Multifibres",
                    kcalByLiter: 1500,
                },
                {
                    label: products.PEPTAMEN_HN,
                    kcalByLiter: 1330,
                },
                {
                    label: products.PEPTISORB,
                    kcalByLiter: 1000,
                },
                {
                    label: products.SONDALIS_HP_ENERGY,
                    kcalByLiter: 1500,
                },
                {
                    label: products.SONDALIS_JUNIOR_STANDARD,
                    kcalByLiter: 1000
                },
                {
                    label: products.SONDALIS_T_ENERGY,
                    kcalByLiter: 1550,
                },
            ],
            recommendations: [
                {
                    label: "Alvityl (po/sng)",
                    quantity: "1",
                    unit: "comprimé/jour",
                    clauses: ["si apports < 1500 kcal/j"],
                    sources: [14, 15],
                }
            ],
        },
        'Parentérale': {
            products: [
                {
                    label: products.MEDNUTRIFLEX_OMEGA,
                    kcalByLiter: 1012,
                },
                {
                    label: products.OLIMEL_N7E,
                    kcalByLiter: 1140,
                },
                {
                    label: products.OLIMEL_N9E,
                    kcalByLiter: 1700,
                },
                {
                    label: products.REANUTRIFLEX_OMEGA,
                    kcalByLiter: 1180,
                },
                {
                    label: products.SMOKABIVEN_PROTEIN,
                    kcalByLiter: 889,
                },
            ],
            recommendations: [
                {
                    label: "Nutryelt",
                    quantity: "1",
                    unit: "ampoule 10ml/jour",
                    clauses: ["si apports < 1500 kcal/j"],
                    sources: [13],
                },
                {
                    label: "Cernevit",
                    quantity: "1",
                    unit: "ampoule 5ml/jour",
                    clauses: ["si apports < 1500 kcal/j"],
                    sources: [13],
                },
                {
                    label: "K",
                    quantity: "1",
                    unit: "ampoule 10ml 2 fois par semaine",
                    clauses: [],
                    sources: [],
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
                        sources: [],
                    },
                    {
                        label: "Cernevit",
                        quantity: "1",
                        unit: "ampoule 5ml/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                    {
                        label: "B9",
                        quantity: "25",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                    {
                        label: "Zinc",
                        quantity: "10",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "1",
                        unit: "ampoule 10ml/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                    {
                        label: "Cernevit",
                        quantity: "1",
                        unit: "ampoule 5ml/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                    {
                        label: "B9",
                        quantity: "25",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                    {
                        label: "Zinc",
                        quantity: "10",
                        unit: "mg/jour",
                        clauses: ["en IV"],
                        sources: [],
                    },
                ],
                exclusions: ['Alvityl (po/sng)']
            },
            warning: pathologieNames.ANOREXIE_MENTALE + " : merci de prescrire un avis diététique pour la suite de la prise en charge.",
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
                        sources: [],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Zinc",
                        quantity: "15",
                        unit: "mg/jour",
                        clauses: ["seulement si encéphalopathie hépatique, carence ou infection"],
                        sources: [],
                    }
                ],
            },
        },
        {
            label: pathologieNames.COVID_19,
            recommendations: {
                'Entérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [],
                        sources: [20],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: [],
                        sources: [22],
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
                        sources: [9],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "2",
                        unit: "ampoules 10ml",
                        clauses: [],
                        sources: [9],
                    },
                    {
                        label: "Cernevit",
                        quantity: "2",
                        unit: "ampoule 5ml",
                        clauses: [],
                        sources: [9],
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
                        sources: [5],
                    },
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["pendant 10 jours minimum"],
                        sources: [5],
                    },
                    {
                        label: "B9",
                        quantity: "25-50",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: [11],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: ["pendant 10 jours minimum"],
                        sources: [5],
                    },
                    {
                        label: "B9",
                        quantity: "25-50",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: [11],
                    },
                ],
            },
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
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [
                            "ajouter 500 mg/jour pendant 10 jours en cas de dénutrition-SRI ou de COVID-19",
                        ],
                        sources: [6],
                    },
                    {
                        label: "B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
                        sources: [19],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [
                            "ajouter 500 mg/jour pendant 10 jours en cas de dénutrition-SRI ou de COVID-19",
                        ],
                        sources: [6],
                    },
                    {
                        label: "B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
                        sources: [19],
                    },
                ],
            },
        },
    ],
    bibliography: [
        {
            label: 'ESPEN (2019), Guideline on clinical nutrition in the intensive care unit. p.58',
            url: 'https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf'
        },
        {
            label: 'ESPEN (2019), Guideline on clinical nutrition in the intensive care unit. p.61',
            url: 'https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf'
        },
        {
            label: 'ESPEN (2019), Guideline on clinical nutrition in the intensive care unit. p.66',
            url: 'https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf'
        },
        {
            label: 'ESPEN (2019), Guideline on clinical nutrition in the intensive care unit. p.70',
            url: 'https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf'
        },
        {
            label: 'ESPEN (2019), Guideline on clinical nutrition in the intensive care unit. p.71',
            url: 'https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf'
        },
        {
            label: 'AFAR, Annales Françaises d’Anesthésie et de Réanimation (2014), Nutrition artificielle en réanimation.',
            url: 'https://sfar.org/wp-content/uploads/2015/10/2_AFAR_Nutrition-artificielle-en-reanimation.pdf'
        },
        {
            label: 'AFAR, Annales Françaises d’Anesthésie et de Réanimation (2014), Nutrition artificielle en réanimation. p.14',
            url: 'https://sfar.org/wp-content/uploads/2015/10/2_AFAR_Nutrition-artificielle-en-reanimation.pdf'
        },
        {
            label: 'AFAR, Annales Françaises d’Anesthésie et de Réanimation (2014), Nutrition artificielle en réanimation. p.204',
            url: 'https://sfar.org/wp-content/uploads/2015/10/2_AFAR_Nutrition-artificielle-en-reanimation.pdf'
        },
        {
            label: 'AFAR, Annales Françaises d’Anesthésie et de Réanimation (2014), Nutrition artificielle en réanimation. p.208',
            url: 'https://sfar.org/wp-content/uploads/2015/10/2_AFAR_Nutrition-artificielle-en-reanimation.pdf'
        },
        {
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.1852',
        },
        {
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.1853',
        },
        {
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.2130',
        },
        {
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.2133',
        },
        {
            label: 'Quillio D, Thibault R, Bachmann P, Coti P, Guex E, Dubern B, Peretti N, Caldari D ; SFNCM (2016). Traité de nutrition clinique à tous les âges de la vie. p.2137',
        },
        {
            label: 'https://www.chu.ulg.ac.be/upload/docs/application/pdf/2009-01/guide_1.pdf p.14',
            url: 'https://www.chu.ulg.ac.be/upload/docs/application/pdf/2009-01/guide_1.pdf'
        },
        {
            label: 'NICE, National Institute for Health and Care Excellence (2017). Nutrition Support for adults : oral nutrition support, enteral tube feeding an parenteral nutrition.',
            url: 'https://www.nice.org.uk/guidance/cg32/chapter/1-Guidance#ftn.footnote_8'
        },
        {
            label: 'NICE, National Institute for Health and Care Excellence (2017). Nutrition Support for adults : oral nutrition support, enteral tube feeding an parenteral nutrition. p.204',
            url: 'https://www.nice.org.uk/guidance/cg32/chapter/1-Guidance#ftn.footnote_8'
        },
        {
            label: 'Barras-Moret Anne-Catherine, Guex Esther, Coti Bertrand Pauline, Le syndrome de renutrition inapproprié : la clé du traitement est la prévention (2011).',
            url: 'https://www.sfncm.org/images/stories/pdf_pratiquesnutrition/Barras-Moret%20NCM%202011.pdf'
        },
        {
            label: 'Airagnais G, Ducoutumany G, Laffy-Beaufils B, Le Faou A-L, Limousin F, La prise en charge du syndrome de sevrage de l’alcool : quelles nouveautés ? (2019). p.376',
        },
        {
            label: 'SFNCM, Société Francophone Nutrition Clinique et Métabolisme, Nutrition du patient covid-19 intubé et ventilé en réanimation (2020). p.2',
            url: 'https://www.sfncm.org/images/stories/Fiches_Covid_19/Fiche_08_COVID-19.pdf'
        },
        {
            label: 'SFNCM, Société Francophone Nutrition Clinique et Métabolisme, Principes de prise en charge des patients Covid 19+ en post-réanimation (2020). p.2',
            url: 'https://www.sfncm.org/images/stories/Fiches_Covid_19/Fiche_09_COVID-19.pdf'
        },
        {
            label: 'SFNCM, Société Francophone Nutrition Clinique et Métabolisme, Prévention du syndrome de renutrition inapproprié (SRI) des patients COVID 19 (2020). p.2',
            url: 'https://www.sfncm.org/images/stories/Fiches_Covid_19/Fiche_03_COVID-19.pdf'
        },
    ],
    calculatedPathologies: function () {
        return this.pathologies.filter(p => p.calculation)
    },
};
