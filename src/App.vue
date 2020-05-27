<template>
    <div id="app" class="container-fluid">
        <div class="row">

            <div class="col-4">

                <div class="container">
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
                    <b-tabs card>
                        <b-tab active>
                            <template v-slot:title>
                                <font-awesome-icon icon="heartbeat"/>&nbsp;Réanimation
                            </template>
                            <b-card-body>
                                <target-flows :nutrition="nutrition" :patient-info="patientInfo"></target-flows>
                                <recos :pathologies="pathologies"></recos>
                            </b-card-body>
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <font-awesome-icon icon="fire"/>&nbsp;Grand&nbsp;Brûlés
                            </template>
                            <b-card-text>Tab contents 2</b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import PatientForm from "./components/PatientForm";
    import NutritionForm from "./components/NutritionForm";
    import TargetFlows from "./components/TargetFlows";
    import Recos from "./components/Recos";
    import Pathos from "./components/Pathos";

    export default {
        name: 'App',
        components: {
            NutritionForm,
            PatientForm,
            TargetFlows,
            Recos,
            Pathos,
        },
        computed: {
            ...mapState(['pathologies']),
            ...mapState({
                patientInfo: 'patient',
            }),
        },
        data: function () {
            return {
                nutrition: {
                    type: 'Entérale',
                    product: {
                        name: "Sondalis HP Energy",
                        kcal: 1.5,
                    },
                },
            };
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
