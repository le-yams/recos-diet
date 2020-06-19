<template>
    <div>
        <b-alert v-if="dietOpinionWarning" :show="true" :variant="dietOpinionWarning.variant">
            <p class="mb-1">{{dietOpinionWarning.text}}</p>
        </b-alert>
        <b-alert v-for="warning in warnings" :show="true" :variant="warning.variant" v-bind:key="warning.text">
            <p class="mb-1">{{warning.text}}</p>
        </b-alert>
    </div>
</template>

<script>
    import {dietOpinionWarnings} from "../refs-data";

    export default {
        name: "Warnings",
        props: {
            pathologies: {
                type: Array,
            },
        },
        computed: {
            dietOpinionWarning: function () {
                if (this.pathologies.length >= 3) {
                    return dietOpinionWarnings[dietOpinionWarnings.length - 1];
                }
                let warningLevels = this.pathologies
                    .filter(p => p.dietOpinionWarningLevel !== undefined)
                    .map(p => p.dietOpinionWarningLevel);
                if (warningLevels.length === 0) {
                    return undefined;
                }
                let warningLevel = Math.max(...warningLevels);
                return dietOpinionWarnings[warningLevel];
            },
            warnings: function () {
                return this.pathologies
                    .filter(p => p.warning)
                    .map(p => p.warning);
            },
        },
    }
</script>

<style scoped>

</style>
