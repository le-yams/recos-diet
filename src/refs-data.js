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
                },
                {
                    label: "Cernevit",
                    quantity: "1",
                    unit: "ampoule 5ml/jour",
                    clauses: ["si apports < 1500 kcal"],
                },
                {
                    label: "K",
                    quantity: "1",
                    unit: "ampoule 10ml 2 fois par semaine",
                    clauses: [],
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
                    },
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/jour",
                        clauses: ["pendant 10 jours minimum"],
                    },
                    {
                        label: "B9",
                        quantity: "25-50",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: ["pendant 10 jours minimum"],
                    },
                    {
                        label: "B9",
                        quantity: "25-50",
                        unit: "mg/jour",
                        clauses: ["Si dénutrition sévère uniquement", "pendant les 3 premier jours"],
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
                    },
                    {
                        label: "B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
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
                    },
                    {
                        label: "B6",
                        quantity: "250",
                        unit: "mg/jour",
                        clauses: ["sur une courte durée"],
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
                    },
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "2",
                        unit: "ampoules 10ml",
                        clauses: [],
                    },
                    {
                        label: "Cernevit",
                        quantity: "2",
                        unit: "ampoule 5ml",
                        clauses: [],
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
                    }
                ],
                'Parentérale': [
                    {
                        label: "Zinc",
                        quantity: "15",
                        unit: "mg/jour",
                        clauses: [],
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
                    },
                ],
                'Parentérale': [
                    {
                        label: "B1",
                        quantity: "500",
                        unit: "mg/j",
                        clauses: [],
                    },],
            },
        },
    ],
    calculatedPathologies: function () {
        return this.pathologies.filter(p => p.calculation)
    },
};
