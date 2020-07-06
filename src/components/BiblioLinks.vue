<template>
    <span v-if="sources">
    <sup v-for="source in normalizedSources" v-bind:key="source">
        <b-button variant="link" class="p-0 biblio-link" size="sm"
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
                required: false,
            },
        },
        computed: {
            normalizedSources: function () {
                return this.sources.map(this.findBiblio)
                    .filter(source => !!source)
                    .map(source => source.index);
            }
        },
        methods: {
            displayBibliography: function (index) {
                this.$emit('display-bibliography', index);
            },
            findBiblio: function (sourceId) {
                let source = refs.bibliography.find(b => b.id === sourceId);
                if (!source) {
                    console.error("unknown biblio id: " + sourceId)
                }
                return source;
            }
        },
    }
</script>

<style scoped>
    .biblio-link {
        font-size: 0.7rem;
    }
</style>
