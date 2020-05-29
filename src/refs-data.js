const nutritionTypes = {
    ENTERALE: 'Entérale',
    PARENTERALE: 'Parentérale',
};

const products = {
    NUTRISON_PROTEIN_PLUS_ENERGY_MULTIFIBRES: 'Nutrison Protein Plus Energy Multifibres',
    OLIMEL_N7E: 'Olimel N7E',
    OLIMEL_N9E: 'Olimel N9E',
    MEDNUTRIFLEX_OMEGA: 'Mednutriflex Omega',
    PEPTAMEN_HN: 'Peptamen HN',
    PEPTISORB: 'Peptisorb (hypolipidique)',
    REANUTRIFLEX_OMEGA: 'Réanutriflex Omega',
    SMOKABIVEN_PROTEIN: 'Smokabiven Protein',
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
                    clauses: ["si apports < 1500 kcal"],
                    sources: [],
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
                    clauses: ["si apports < 1500 kcal"],
                    sources: [],
                },
                {
                    label: "Cernevit",
                    quantity: "1",
                    unit: "ampoule 5ml/jour",
                    clauses: ["si apports < 1500 kcal"],
                    sources: [],
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
            },
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
                        sources: [],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: [],
                        sources: [],
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
                        sources: [],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "2",
                        unit: "ampoules 10ml",
                        clauses: [],
                        sources: [],
                    },
                    {
                        label: "Cernevit",
                        quantity: "2",
                        unit: "ampoule 5ml",
                        clauses: [],
                        sources: [],
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
                        sources: [],
                    },
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["pendant 10 jours minimum"],
                        sources: [],
                    },
                    {
                        label: "B9",
                        quantity: "25-50",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: [],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: ["pendant 10 jours minimum"],
                        sources: [],
                    },
                    {
                        label: "B9",
                        quantity: "25-50",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: [],
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
                        sources: [],
                    },
                    {
                        label: "B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
                        sources: [],
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
                        sources: [],
                    },
                    {
                        label: "B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
                        sources: [],
                    },
                ],
            },
        },
    ],
    bibliography: [],
    calculatedPathologies: function () {
        return this.pathologies.filter(p => p.calculation)
    },
};
