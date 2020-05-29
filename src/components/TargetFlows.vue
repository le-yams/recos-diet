<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="bullseye"/>&nbsp;Débits cible
        </b-card-header>
        <b-card-title></b-card-title>
        <b-card-body class="p-1">
            <ul>
                <li v-if="displayLowTarget">
                    <target-flow :cal-target="10" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li>
                    <target-flow :cal-target="20" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li>
                    <target-flow :cal-target="25" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li>
                    <target-flow :cal-target="30" :nutrition="nutrition" :patient-info="patientInfo"
                                 :grayed="hasObesity"/>
                </li>
            </ul>
        </b-card-body>
    </b-card>
</template>

<script>
    import TargetFlow from "./TargetFlow";

    export default {
        name: "TargetFlows",
        components: {TargetFlow},
        props: {
            patientInfo: {
                type: Object,
            },
            nutrition: {
                type: Object,
            },
            pathologies: {
                type: Array,
            },
        },
        computed: {
            hasObesity: function () {
                return this.pathologies.find(p => p.label === 'Obésité');
            },
            displayLowTarget: function () {
                return this.pathologies.find(p => p.label === 'Anorexie mentale');
            },
        }
    }
</script>

<style scoped>

</style>
