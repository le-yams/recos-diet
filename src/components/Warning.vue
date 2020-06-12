<template>
    <b-alert :show="true" :variant="warning.variant">
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
                    return warnings[2];
                }
                let warningLevels = this.pathologies
                    .filter(p => p.warningLevel)
                    .map(p => p.warningLevel)
                    .concat(0); // default value
                let warningLevel = Math.max(...warningLevels);
                return warnings[warningLevel];
            }
        },
    }
</script>

<style scoped>

</style>