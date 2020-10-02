<template>
  <p class="m-0 mb-2">
    Pour un apport de <strong>{{ calTarget }}</strong> kcal/kg
    <biblio-links :sources="sources"></biblio-links>
    soit {{ dayEnergy.toFixed(0) }} kcal et {{ dayProteins.toFixed(0) }} g de prot&eacute;ines
    ({{ proteinsForWeight.toFixed(1).replace(/[.,]0+$/, "") }} g/kg)
    <br/>
    &rArr; d&eacute;bit cible=<strong>{{ hourFlowML.toFixed(0) }}</strong> ml/h
  </p>
</template>

<script>
import BiblioLinks from "./BiblioLinks";

export default {
  name: "TargetFlow",
  components: {BiblioLinks},
  props: {
    calTarget: {
      type: Number,
      required: true,
    },
    patientInfo: {
      type: Object,
      required: true,
    },
    nutrition: {
      type: Object,
      required: true,
    },
    sources: {
      type: Array,
    }
  },
  computed: {
    hourFlowML: function () {
      return this.dayFlowLiter * 1000 / 24;
    },
    dayFlowLiter: function () {
      return this.patientInfo.adjustedWeight * this.calTarget / this.nutrition.product.kcalPerLiter;
    },
    dayEnergy: function () {
      return this.nutrition.product.kcalPerLiter * this.dayFlowLiter;
    },
    dayProteins: function () {
      return this.nutrition.product.proteinsGramsPerLiter * this.dayFlowLiter;
    },
    proteinsForWeight: function () {
      return this.dayProteins / this.patientInfo.adjustedWeight;
    },
  },
}
</script>

<style scoped>

</style>
