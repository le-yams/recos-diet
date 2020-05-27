<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="pills"/>&nbsp;Recommendations
        </b-card-header>
        <b-card-body class="container-fluid">
            <!--            <div class="container">-->
            <div class="row" v-for="reco in recommendations" v-bind:key="reco.label">
                <div class="container-fluid">
                    <div class="row">
                        <span>{{reco.label}}: {{reco.quantity}} {{reco.unit}}</span>
                    </div>
                    <div class="row">
                        <ul v-if="reco.clauses.length > 0" class="font-italic font-weight-light">
                            <li v-for="clause in reco.clauses" v-bind:key="clause">{{clause}}</li>
                        </ul>
                    </div>
                </div>
                <!--                    <span v-if="reco.clauses.length > 0" class="font-italic font-weight-light">({{reco.clauses.join(', ')}})</span>-->
            </div>
            <!--            </div>-->
        </b-card-body>
    </b-card>
</template>

<script>

    import {withLabel} from "../utils";

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
                let recos = [];
                let nutritionType = this.nutrition.type;
                this.pathologies.map(p => p.recommendations)
                    .map(recos => recos[nutritionType])
                    .forEach(pathoRecos =>
                        pathoRecos.forEach(pathoReco => {
                            let reco = recos.find(withLabel(pathoReco.label));
                            if (reco) {
                                let quantity = Math.max(reco.quantity, pathoReco.quantity);
                                reco.quantity = quantity;
                                reco.clauses = [...new Set(reco.clauses.concat(pathoReco.clauses))];
                                console.log("updating reco ", reco);
                            } else {
                                reco = {
                                    ...pathoReco
                                };
                                console.log("adding reco ", reco);
                                recos.push(reco);
                            }
                        })
                    );
                console.log("updated recommendations ", recos);
                return recos;
            }
        },
    }

</script>

<style scoped>

</style>
