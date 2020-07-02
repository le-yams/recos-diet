<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="user-injured"/>&nbsp;Patient
        </b-card-header>
        <b-card-body>
            <form>
                <div class="form-group form-row mb-1">
                    <label for="inputHeight" class="col-sm-3 col-form-label">Taille (cm)</label>
                    <div class="col-sm">
                        <input type="number" v-bind:value="height" ref="height"
                               v-on:change="updateHeight" v-on:keyup.enter="$refs.weight.focus()"
                               class="form-control" id="inputHeight" placeholder="Taille (cm)">
                    </div>
                </div>
                <div class="form-group form-row mb-1">
                    <label for="inputWeight" class="col-sm-3 col-form-label">Poids</label>
                    <div class="col-sm">
                        <input type="number" v-bind:value="weight" ref="weight"
                               v-on:change="updateWeight" v-on:keyup.enter="$refs.bmi.focus()"
                               class="form-control" id="inputWeight" placeholder="Poids">
                    </div>
                </div>

                <div class="form-group form-row mb-1" v-if="bmi > idealBmi">
                    <label for="inputAdjustedWeight" class="col-sm-3 col-form-label">Poids ajusté</label>
                    <div class="col-sm">
                        <input v-bind:value="adjustedWeight" class="form-control" id="inputAdjustedWeight" readonly>
                    </div>
                </div>
                <div class="form-group form-row mb-1">
                    <label for="inputIMC" class="col-sm-3 col-form-label">IMC</label>
                    <div class="col-sm">
                        <input v-bind:value="bmi" class="form-control" id="inputIMC" readonly ref="bmi">
                    </div>
                </div>

            </form>
        </b-card-body>
    </b-card>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "PatientForm",
        computed: {
            ...mapState(['idealBmi', 'patient']),

            height: function () {
                return this.patient.height;
            },
            weight: function () {
                return this.patient.weight;
            },
            bmi: function () {
                return this.patient.bmi;
            },
            adjustedWeight: function () {
                return this.patient.adjustedWeight;
            },
        },
        mounted() {
            this.$refs.height.focus()
        },
        methods: {
            updateHeight(evt) {
                let height = evt.target.value;
                this.updatePatientInfo({height: height, weight: this.weight});
            },
            updateWeight(evt) {
                let weight = evt.target.value;
                this.updatePatientInfo({height: this.height, weight: weight});
            },
            ...mapMutations(['updatePatientInfo']),
        },
    }
</script>

<style scoped>

</style>
