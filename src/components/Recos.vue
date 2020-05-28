<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="pills"/>&nbsp;Recommandations
        </b-card-header>
        <b-card-body class="container-fluid">
            <div class="row" v-for="reco in recommendations" v-bind:key="reco.label">
                <div class="container-fluid">
                    <div class="row">
                        <p>{{reco.label}}: {{reco.quantity}} {{reco.unit}}
                            <sup v-for="sourceIndex in reco.sources" v-bind:key="sourceIndex">
                                <b-button variant="link" class="p-0"
                                          @click="displayBibliography(sourceIndex)">
                                    [{{sourceIndex}}]
                                </b-button>
                            </sup>
                        </p>
                    </div>
                    <div class="row">
                        <ul v-if="reco.clauses.length > 0" class="font-italic font-weight-light">
                            <li v-for="clause in reco.clauses" v-bind:key="clause">{{clause}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </b-card-body>
    </b-card>
</template>

<script>

    import {withLabel} from "../utils";
    import refs from "../refs-data";

    export default {
        name: "Recos",
        props: {
            nutrition: {
                type: Object,
            },
            pathologies: {
                type: Array,
            },
        },
        computed: {
            recommendations: function () {
                let nutritionType = this.nutrition.type;
                let recos = [...refs.nutritions[nutritionType].recommendations.map(r => {
                    return {...r};
                })];
                this.pathologies.map(p => p.recommendations)
                    .map(recos => recos[nutritionType])
                    .forEach(pathoRecos =>
                        pathoRecos.forEach(pathoReco => {
                            let reco = recos.find(withLabel(pathoReco.label));
                            if (reco) {
                                let quantity = Math.max(reco.quantity, pathoReco.quantity);
                                reco.quantity = quantity;
                                reco.clauses = [...new Set(reco.clauses.concat(pathoReco.clauses))];
                                reco.sources = [...new Set(reco.sources.concat(pathoReco.sources))];
                            } else {
                                reco = {
                                    ...pathoReco
                                };
                                recos.push(reco);
                            }
                        })
                    );
                return recos;
            },
        },
        methods: {
            displayBibliography: function (index) {
                this.$emit('display-bibliography', index);
            }
        },
    }

</script>

<style scoped>

</style>
