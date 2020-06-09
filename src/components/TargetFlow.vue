<template>
    <p class="m-0">
        Pour un besoin de <strong>{{ calTarget }}</strong> kcal/kg, débit cible = <strong>{{ flow }}</strong> ml/h ({{
        dayEnergy }} kcal/j)
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
                return (this.patientInfo.adjustedWeight * this.calTarget / 24 / kcalByML).toFixed(0);
            },
            dayEnergy: function () {
                return this.flow * 24 * this.nutrition.product.kcalByLiter / 1000;
            },
        }
    }
</script>

<style scoped>

</style>
