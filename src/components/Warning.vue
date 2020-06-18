<template>
    <b-alert v-if="warning" :show="true" :variant="warning.variant">
        <p class="mb-1">{{warning.text}}</p>
    </b-alert>
</template>

<script>
    import {warnings} from "../refs-data";

    export default {
        name: "Warning",
        props: {
            pathologies: {
                type: Array,
            },
        },
        computed: {
            warning: function () {
                if (this.pathologies.length >= 3) {
                    return warnings[warnings.length - 1];
                }
                let warningLevels = this.pathologies
                    .filter(p => p.warningLevel !== undefined)
                    .map(p => p.warningLevel);
                if (warningLevels.length === 0) {
                    return undefined;
                }
                let warningLevel = Math.max(...warningLevels);
                return warnings[warningLevel];
            }
        },
    }
</script>

<style scoped>

</style>
