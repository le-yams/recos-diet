<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="pills"/>&nbsp;Recommandations
        </b-card-header>
        <b-card-body class="container-fluid">
            <div class="row" v-for="reco in recommendations" v-bind:key="reco.label">
                <div class="container-fluid">
                    <div class="row">
                        <p class="mb-0">{{reco.label}}: {{reco.quantity}} {{reco.unit}}
                            <biblio-links :sources="reco.sources"
                                          @display-bibliography="displayBibliography"></biblio-links>
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
    import BiblioLinks from "./BiblioLinks";

    export default {
        name: "Recos",
        components: {BiblioLinks},
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
                let pathoRecos = this.pathologies.map(p => p.recommendations);
                let exclusions = [...new Set(pathoRecos.filter(r => r.exclusions).flatMap(r => r.exclusions))];
                console.log("exclusions: ", exclusions);
                let notExcluded = reco => !exclusions.find(e => e === reco.label);
                let recos = [...refs.nutritions[nutritionType].recommendations.filter(notExcluded).map(r => {
                    return {...r};
                })];
                console.log("global recommendations: ", recos);
                pathoRecos.flatMap(recos => recos[nutritionType])
                    .filter(notExcluded)
                    .forEach(pathoReco => {
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
                        }
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
