<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="disease"/>&nbsp;Pathologies
        </b-card-header>
        <b-card-body>
            <div class="container">
                <div class="row">
                    <b-form-group>
                        <b-form-checkbox
                                v-for="p in availablePathologies" v-bind:key="p.label"
                                v-model="selectedPathologies"
                                :value="p"
                                class="mb-1">{{p.label}}
                        </b-form-checkbox>
                        <b-form-checkbox
                                v-for="p in calculatedPathologies" v-bind:key="p.label"
                                v-bind:checked="selectedCalculatedPathologies"
                                :value="p"
                                :disabled="true"
                                class="mb-1">
                            <span>{{p.label}}</span>
                            <span class="font-weight-light font-italic"> ({{p.calculation.description}})</span>
                        </b-form-checkbox>
                    </b-form-group>
                </div>
            </div>
        </b-card-body>
    </b-card>
</template>

<script>
    import refs from "../refs-data";
    import {mapMutations} from "vuex";
    import {comparingByLabel} from "../utils";

    export default {
        name: "Pathos",
        props: {
            patientInfo: {
                type: Object,
            },
        },
        data: function () {
            return {
                availablePathologies: refs.pathologies
                    .filter(p => !p.calculation)
                    .sort(comparingByLabel),
                selectedPathologies: [],
            };
        },
        computed: {
            calculatedPathologies: function () {
                return refs.pathologies
                    .filter(p => p.calculation)
                    .sort(comparingByLabel);
            },
            selectedCalculatedPathologies: function () {
                return this.calculatedPathologies
                    .filter(p => p.calculation.perform(this.patientInfo))
            },
        },
        watch: {
            selectedPathologies: function () {
                this.updateSelectedPathologies(this.selectedPathologies)
            },
        },
        methods: {
            ...mapMutations(['updateSelectedPathologies']),
        },
    }
</script>

<style scoped>

</style>
