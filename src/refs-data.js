export default {
    ENTERALE: 'Entérale',
    PARENTERALE: 'Parentérale',
    nutritions: {
        'Entérale': {
            products: [
                {
                    label: "Sondalis HP Energy",
                    kcal: 1.5,
                },
                {
                    label: "Nutrison Protein Plus Energy Multifibres",
                    kcal: 1.5,
                },
                {
                    label: "Sondalis T Energy",
                    kcal: 1.55,
                },
                {
                    label: "Peptamen HN",
                    kcal: 1.33,
                },
                {
                    label: "Sondalis Junior",
                    kcal: 1,
                },
            ],
            recommendations: [
                {
                    label: "Alvityl (po/sng)",
                    quantity: "1",
                    unit: "comprimé/jour",
                    clauses: ["si apports < 1500 kcal"],
                    sources: [1],
                }
            ],
        },
        'Parentérale': {
            products: [
                {
                    label: "Réanutriflex Omega",
                    kcal: 1.18,
                },
                {
                    label: "Olimel N7E",
                    kcal: 1.14,
                },
                {
                    label: "Olimel N9E",
                    kcal: 1.7,
                },
            ],
            recommendations: [
                {
                    label: "Nutryelt",
                    quantity: "1",
                    unit: "ampoule 10ml/jour",
                    clauses: ["si apports < 1500 kcal"],
                    sources: [1, 2],
                },
                {
                    label: "Cernevit",
                    quantity: "1",
                    unit: "ampoule 5ml/jour",
                    clauses: ["si apports < 1500 kcal"],
                    sources: [1],
                },
                {
                    label: "K",
                    quantity: "1",
                    unit: "ampoule 10ml 2 fois par semaine",
                    clauses: [],
                    sources: [1],
                },
            ],
        },
    },
    pathologies: [
        {
            label: "Dénutrition-SRI",
            recommendations: {
                'Entérale': [
                    {
                        label: "Alvityl (po/sng)",
                        quantity: "1",
                        unit: "comprimé/jour",
                        clauses: ["pendant 10 jours minimum"],
                        sources: [1],
                    },
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["pendant 10 jours minimum"],
                        sources: [1],
                    },
                    {
                        label: "B9",
                        quantity: "25-50",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: [1],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: ["pendant 10 jours minimum"],
                        sources: [1],
                    },
                    {
                        label: "B9",
                        quantity: "25-50",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                        sources: [1],
                    },
                ],
            },
        },
        {
            label: "Obésité",
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
            label: "OH",
            recommendations: {
                'Entérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [
                            "ajouter 500 mg/jour pendant 10 jours en cas de dénutrition-SRI",
                            "ajouter 500 mg/jour en cas de COVID-19",
                        ],
                        sources: [1],
                    },
                    {
                        label: "B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
                        sources: [4],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [
                            "ajouter 500 mg/jour pendant 10 jours en cas de dénutrition-SRI",
                            "ajouter 500 mg/jour en cas de COVID-19",
                        ],
                        sources: [3],
                    },
                    {
                        label: "B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
                        sources: [1],
                    },
                ],
            },
        },
        {
            label: "CVVHDF",
            recommendations: {
                'Entérale': [
                    {
                        label: "Alvityl (po/sng)",
                        quantity: "2",
                        unit: "comprimés/jour",
                        clauses: ["puis 1 comprimé/jour lorsque le BE est atteint"],
                        sources: [1, 3, 4],
                    },
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "2",
                        unit: "ampoules 10ml",
                        clauses: [],
                        sources: [1],
                    },
                    {
                        label: "Cernevit",
                        quantity: "2",
                        unit: "ampoule 5ml",
                        clauses: [],
                        sources: [1],
                    },
                ],
            },
        },
        {
            label: "Cirrhotique",
            recommendations: {
                'Entérale': [
                    {
                        label: "Zinc",
                        quantity: "15",
                        unit: "mg/jour",
                        clauses: [],
                        sources: [1],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Zinc",
                        quantity: "15",
                        unit: "mg/jour",
                        clauses: [],
                        sources: [1],
                    }
                ],
            },
        },
        {
            label: "COVID-19",
            recommendations: {
                'Entérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: [],
                        sources: [1],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: [],
                        sources: [1],
                    },],
            },
        },
    ],
    bibliography: [
        "TODO1",
        "TODO2",
        "TODO3",
        "TODO4",
        "TODO5",
    ],
    calculatedPathologies: function () {
        return this.pathologies.filter(p => p.calculation)
    },
};
