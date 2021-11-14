<template>
  <div class="container-fluid">
    <div class="row">
      <disclaimer></disclaimer>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="container-fluid pr-0">
          <div class="row">
            <patient-form style="width: 100%;"></patient-form>
          </div>
          <div class="row">
            <nutrition-form :pathologies="pathologies"
                            v-on:nutrition-update="nutrition=$event" style="width: 100%;"></nutrition-form>
          </div>
          <div class="row">
            <pathos style="width: 100%;" :patient-info="patientInfo"></pathos>
          </div>
        </div>
      </div>

      <div class="col-8">
        <b-card no-body>
          <div v-if="survey.enabled" style="display: flex; justify-content: center">
            <b-button variant="warning" class="m-2 clignote text-center"
                      @click="$router.push('/survey')">Donnez votre avis ici !
            </b-button>
          </div>

          <b-tabs card v-model="tabIndex" v-on:input="tabChanged">
            <b-tab class="p-0">
              <template v-slot:title>
                <font-awesome-icon icon="heartbeat"/>&nbsp;Réanimation
              </template>
              <b-card-body>
                <warnings :pathologies="pathologies"></warnings>
                <target-flows :patient-info="patientInfo" :nutrition="nutrition"
                              :pathologies="pathologies"></target-flows>
                <recos :nutrition="nutrition" :pathologies="pathologies"></recos>
              </b-card-body>
            </b-tab>
            <b-tab class="p-0">
              <template v-slot:title>
                <font-awesome-icon icon="sticky-note"/>
                SRI
              </template>
              <b-card-body>
                <sri></sri>
              </b-card-body>
            </b-tab>
            <b-tab class="p-0">
              <template v-slot:title>
                <font-awesome-icon icon="sticky-note"/>
                D&eacute;nutrition
              </template>
              <b-card-body>
                <denutrition></denutrition>
              </b-card-body>
            </b-tab>
            <b-tab class="p-0">
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
import Bibliography from "./Bibliography";
import Sri from "./Sri";
import Pathos from "./Pathos";
import Recos from "./Recos";
import TargetFlows from "./TargetFlows";
import PatientForm from "./PatientForm";
import NutritionForm from "./NutritionForm";
import Warnings from "./Warnings";
import Disclaimer from "./Disclaimer";
import Denutrition from "./Denutrition";
import {bus} from "@/main";
import {DISPLAY_BIBLIOGRAPHY} from "@/bus-events";

const TAB_BIBLIO_INDEX = 3;

export default {
  name: "Home",
  components: {
    Denutrition,
    Disclaimer,
    Warnings,
    NutritionForm,
    PatientForm,
    TargetFlows,
    Recos,
    Pathos,
    Sri,
    Bibliography,
  },
  created() {
    bus.$on(DISPLAY_BIBLIOGRAPHY, index => {
      this.outlineBiliography(index);
      this.tabIndex = TAB_BIBLIO_INDEX;
    })
  },
  data: function () {
    return {
      tabIndex: 0,
    };
  },
  computed: {
    ...mapState(['nutrition', 'pathologies', 'survey']),
    ...mapState({
      patientInfo: 'patient',
      outlinedBibliography: state => state.bibliography.outlinedIndex,
    }),
  },

  methods: {
    ...mapMutations(['outlineBiliography']),
    tabChanged: function () {
      if (this.outlinedBibliography > 0) {
        let anchor = "#bibliography-" + (this.outlinedBibliography);
        setTimeout(() => this.$scrollTo(anchor));
      }
    },
  }
}
</script>

<style scoped>
.clignote {
  animation: clignote 2s linear infinite;
}

@keyframes clignote {
  50% {
    opacity: 0;
  }
}
</style>
