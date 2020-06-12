<template>
    <span>

    <sup v-for="source in normalizedSources" v-bind:key="source">
        <b-button variant="link" class="p-0" size="sm"
                  @click="displayBibliography(source)">
            [{{source}}]
        </b-button>
    </sup>
    </span>
</template>

<script>
    import refs from "../refs-data";

    export default {
        name: "BiblioLinks",
        props: {
            sources: {
                type: Array,
            },
        },
        computed: {
            normalizedSources: function () {
                return this.sources.map(sourceId =>
                    refs.bibliography
                        .find(b => b.id === sourceId)
                        .index);
            }
        },
        methods: {
            displayBibliography: function (index) {
                this.$emit('display-bibliography', index);
            }
        },
    }
</script>

<style scoped>

</style>
