<template>
    <p class="m-0">
        Pour un besoin de <strong>{{ calTarget }}</strong> kcal/kg, débit cible = <strong>{{ flow.toFixed(0) }}</strong> ml/h ({{
        dayEnergy.toFixed(0) }} kcal/j)
    </p>
</template>

<script>
    export default {
        name: "TargetFlow",
        props: {
            calTarget: {
                type: Number,
            },
            patientInfo: {
                type: Object,
            },
            nutrition: {
                type: Object,
            },
        },
        computed: {
            flow: function () {
                let kcalByML = this.nutrition.product.kcalByLiter / 1000;
                return this.patientInfo.adjustedWeight * this.calTarget / 24 / kcalByML;
            },
            dayEnergy: function () {
                return this.flow * 24 * this.nutrition.product.kcalByLiter / 1000;
            },
        }
    }
</script>

<style scoped>

</style>
