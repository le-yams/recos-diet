<template>
    <span>

    <sup v-for="source in normalizedSources" v-bind:key="source.index">
        <b-button variant="link" class="p-0" size="sm"
                  @click="displayBibliography(source.index)">
            [{{source.index}}<span v-if="source.extra">,{{source.extra}}</span>]
        </b-button>
    </sup>
    </span>
</template>

<script>
    export default {
        name: "BiblioLinks",
        props: {
            sources: {
                type: Array,
            },
        },
        computed: {
            normalizedSources: function () {
                return this.sources.map(source => {
                    let sourceType = typeof source;
                    if (sourceType === 'number') {
                        return {
                            index: source
                        };
                    } else if (sourceType === 'object') {
                        return source;
                    }
                });
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
