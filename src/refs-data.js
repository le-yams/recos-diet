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
            label: "Dénutrition-SRI"
        },
        {
            label: "Obésité",
            calculation: {
                perform: function (patientInfo) {
                    return patientInfo.bmi >= 30;
                },
                description: 'IMC >= 30'
            }
        },
        {
            label: "OH"
        },
        {
            label: "CVVHDF"
        },
        {
            label: "Cirrhotique"
        },
        {
            label: "COVID-19"
        },
    ],
    calculatedPathologies: function () {
        return this.pathologies.filter(p => p.calculation)
    },
};
