<template>
    <b-card no-body>
        <b-card-header>
            <span><font-awesome-icon icon="bullseye"/>&nbsp;Débits cible</span>

          <span class="strip p-aigue ml-5">phase aigu&euml;</span>
          <span class="strip p-aigue"><font-awesome-icon icon="angle-double-right"/></span>
          <span class="strip p-gradient"><strong>25</strong> kcal</span>
          <span class="strip p-rehab"><font-awesome-icon icon="angle-double-right"/></span>
          <span class="strip p-rehab">phase de r&eacute;habilitation</span>
          <span class="strip p-rehab"><font-awesome-icon icon="angle-double-right"/></span>
          <span class="strip p-rehab"><strong>30</strong> kcal</span>
        </b-card-header>
        <b-card-title></b-card-title>
        <b-card-body class="p-1">
            <ul>
                <li v-if="hasAnorexia || hasDenutrition || hasCovid">
                    <target-flow :cal-target="10" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li v-if="!hasAnorexia && (hasDenutrition || hasCovid)">
                    <target-flow :cal-target="15" :nutrition="nutrition" :patient-info="patientInfo"/>
                </li>
                <li v-if="!hasAnorexia">
                    <target-flow :cal-target="20" :nutrition="nutrition" :patient-info="patientInfo" :sources="['espen-p58']" />
                </li>
                <li v-if="!hasAnorexia">
                    <target-flow :cal-target="25" :nutrition="nutrition" :patient-info="patientInfo" :sources="['espen-p58', 'afar-p204']" />
                </li>
                <li v-if="!hasAnorexia && !hasObesity">
                    <target-flow :cal-target="30" :nutrition="nutrition" :patient-info="patientInfo" :sources="['afar-p204']" />
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
                required: true,
            },
            nutrition: {
                type: Object,
                required: true,
            },
            pathologies: {
                type: Array,
                required: true,
            },
        },
        computed: {
            hasAnorexia: function () {
                return this.pathologies.find(p => p.label === pathologieNames.ANOREXIE_MENTALE);
            },
            hasDenutrition: function () {
                return this.pathologies.find(p => p.label === pathologieNames.DENUTRITION_SRI);
            },
            hasCovid: function () {
                return this.pathologies.find(p => p.label === pathologieNames.COVID_19);
            },
            hasObesity: function () {
                return this.pathologies.find(p => p.label === pathologieNames.OBESITE);
            },
        },
    }
</script>

<style scoped>

.strip {
  padding: 1em 0.5em;
}

.p-aigue {
  background-color: #f8d7da;
}

.p-gradient {
  background: linear-gradient(to right, #f8d7da, #d4edda);
}

.p-rehab {
  background-color: #d4edda;
}

</style>
