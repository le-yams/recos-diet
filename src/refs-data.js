export default {
    ENTERALE: 'Entérale',
    PARENTERALE: 'Parentérale',
    nutritions: {
        'Entérale': [
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
        'Parentérale': [
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
    },
    pathologies: [
        {
            label: "Dénutrition-SRI",
            recommendations: {
                'Entérale': [
                    {
                        label: "Alvityl (po/sng)",
                        quantity: "1",
                        unit: "ampoule/jour",
                        clauses: ["pendant 10 jours"],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "1",
                        unit: "ampoule 10ml",
                        clauses: [],
                    }
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
                'Entérale': [
                    {
                        label: "Alvityl (po/sng)",
                        quantity: "1",
                        unit: "ampoule/jour",
                        clauses: ["si apports < 1500 kcals"],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "1",
                        unit: "ampoule 10ml",
                        clauses: [],
                    }
                ],
            },
        },
        {
            label: "OH",
            recommendations: {
                'Entérale': [
                    {
                        label: "Alvityl (po/sng)",
                        quantity: "1",
                        unit: "ampoule/jour",
                        clauses: ["si apports < 1500 kcals"],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "1",
                        unit: "ampoule 10ml",
                        clauses: [],
                    }
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
                        unit: "ampoule/jour",
                        clauses: ["puis 1 ampoule/jour lorsque le BE est atteint"],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "2",
                        unit: "ampoule 10ml",
                        clauses: [],
                    }
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
                        unit: "mg/jours",
                        clauses: [],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Zinc",
                        quantity: "15",
                        unit: "mg/jours",
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
                        label: "Alvityl (po/sng)",
                        quantity: "1",
                        unit: "ampoule/jour",
                        clauses: ["si apports < 1500 kcals"],
                    }
                ],
                'Parentérale': [
                    {
                        label: "Nutryelt",
                        quantity: "1",
                        unit: "ampoule 10ml",
                        clauses: [],
                    }
                ],
            },
        },
    ],
    calculatedPathologies: function () {
        return this.pathologies.filter(p => p.calculation)
    },
};
