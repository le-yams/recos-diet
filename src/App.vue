<template>
    <div id="app" class="container-fluid">
        <div class="row">
            <b-alert show variant="warning" style="width: 100%">
                <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                Cet outil à pour but de présenter un certain nombre de recommandations nutritionnelles en
                environnement hospitalier.
                Il ne tient cependant pas compte de l'ensemble du contexte santé du patient.
                Aussi <strong>il ne saurait en aucun cas remplacer l'avis de votre diététicien(ne)</strong>.
            </b-alert>
        </div>
        <div class="row">

            <div class="col-4">
                <div class="container-fluid pr-0">
                    <div class="row">
                        <patient-form style="width: 100%;"></patient-form>
                    </div>
                    <div class="row">
                        <nutrition-form v-on:nutrition-update="nutrition=$event" style="width: 100%;"></nutrition-form>
                    </div>
                    <div class="row">
                        <pathos style="width: 100%;" :patient-info="patientInfo"></pathos>
                    </div>
                </div>
            </div>

            <div class="col-8">
                <b-card no-body>
                    <b-tabs card v-model="tabIndex" v-on:input="tabChanged">
                        <b-tab class="p-0">
                            <template v-slot:title>
                                <font-awesome-icon icon="heartbeat"/>&nbsp;Réanimation
                            </template>
                            <b-card-body>
                                <target-flows :patient-info="patientInfo" :nutrition="nutrition"
                                              :pathologies="pathologies"></target-flows>
                                <recos :nutrition="nutrition" :pathologies="pathologies"
                                       @display-bibliography="displayBibliography"></recos>
                            </b-card-body>
                        </b-tab>
                        <b-tab v-on:change="tabChanged" class="p-0">
                            <template v-slot:title>
                                <font-awesome-icon icon="sticky-note"/>
                                SRI
                            </template>
                            <b-card-body>
                                <sri></sri>
                            </b-card-body>
                        </b-tab>
                        <b-tab v-on:change="tabChanged" class="p-0">
                            <template v-slot:title>
                                <font-awesome-icon icon="book-medical"/>&nbsp;Bibliographie
                            </template>
                            <b-card-body>
                                <bibliography></bibliography>
                            </b-card-body>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from "vuex";
    import PatientForm from "./components/PatientForm";
    import NutritionForm from "./components/NutritionForm";
    import TargetFlows from "./components/TargetFlows";
    import Recos from "./components/Recos";
    import Pathos from "./components/Pathos";
    import Bibliography from "./components/Bibliography";
    import Sri from "./components/Sri";

    const TAB_BIBLIO_INDEX = 2;

    //var VueScrollTo = require('vue-scrollto');
    export default {
        name: 'App',
        components: {
            NutritionForm,
            PatientForm,
            TargetFlows,
            Recos,
            Pathos,
            Sri,
            Bibliography,
        },
        data: function () {
            return {
                tabIndex: 0,
            };
        },
        computed: {
            ...mapState(['nutrition', 'pathologies']),
            ...mapState({
                patientInfo: 'patient',
                outlinedBibliography: state => state.bibliography.outlined,
            }),
        },
        methods: {
            ...mapMutations(['outlineBiliography']),

            displayBibliography: function (index) {
                this.outlineBiliography(index);
                this.tabIndex = TAB_BIBLIO_INDEX;
            },
            tabChanged: function () {
                if (this.outlinedBibliography > 0) {
                    let anchor = "#bibliography-" + (this.outlinedBibliography - 1);
                    this.$scrollTo(anchor)
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
