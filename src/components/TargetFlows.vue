<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="bullseye"/>&nbsp;Débits cible
        </b-card-header>
        <b-card-title></b-card-title>
        <b-card-body class="p-1">
            <ul>
                <li v-if="hasAnorexia || hasDenutrition">
                    <target-flow :cal-target="10" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li v-if="!hasAnorexia && hasDenutrition">
                    <target-flow :cal-target="15" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li v-if="!hasAnorexia">
                    <target-flow :cal-target="20" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li v-if="!hasAnorexia">
                    <target-flow :cal-target="25" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li v-if="!hasAnorexia && !hasObesity">
                    <target-flow :cal-target="30" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
            </ul>
        </b-card-body>
    </b-card>
</template>

<script>
    import TargetFlow from "./TargetFlow";
    import {pathologieNames} from "../refs-data";

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
                return this.pathologies.find(p => p.label === pathologieNames.OBESITE);
            },
            hasAnorexia: function () {
                return this.pathologies.find(p => p.label === pathologieNames.ANOREXIE_MENTALE);
            },
            hasDenutrition: function () {
                return this.pathologies.find(p => p.label === pathologieNames.DENUTRITION_SRI);
            },
        }
    }
</script>

<style scoped>

</style>
