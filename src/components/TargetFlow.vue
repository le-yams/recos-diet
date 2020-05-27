<template>
    <p>
        Pour un besoin de <strong>{{ calTarget }}</strong> kcal/kg:
        <strong v-if="flow !== 0">{{ flow }}</strong>
        <em v-if="flow === 0">--</em>
        ml/h
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
                return (this.patientInfo.adjustedWeight * this.calTarget / 24 / this.nutrition.product.kcal).toFixed(0);
            }
        }
    }
</script>

<style scoped>

</style>
