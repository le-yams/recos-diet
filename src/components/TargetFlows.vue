<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="bullseye"/>&nbsp;Débits cible
        </b-card-header>
        <b-card-title></b-card-title>
        <b-card-sub-title class="p-1 pl-3">
            {{nutrition.product.label}}
        </b-card-sub-title>
        <b-card-body class="p-1">
            <ul>
                <li>
                    <target-flow :cal-target="20" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li>
                    <target-flow :cal-target="25" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li>
                    <target-flow :cal-target="30" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
            </ul>
        </b-card-body>
    </b-card>
</template>

<script>
    import TargetFlow from "./TargetFlow";
    import {mapState} from "vuex";

    export default {
        name: "TargetFlows",
        components: {TargetFlow},
        props: {
            patientInfo: {
                type: Object,
            },
        },
        computed: {
            ...mapState(['nutrition']),
        }
    }
</script>

<style scoped>

</style>
