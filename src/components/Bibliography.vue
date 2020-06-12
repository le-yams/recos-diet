<template>
    <div class="container-fluid">
        <div class="row" v-for="source in bibliography" v-bind:key="source.index"
             v-bind:class="{ 'font-weight-bold': isOutlined(source.index) }">
            <p :id="'bibliography-' + source.index" class="mb-1">
                <span v-if="source.url">[{{source.index}}]&nbsp;<a :href="source.url">{{source.label}}</a></span>
                <span v-else>[{{source.index}}]&nbsp;{{source.label}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    import refs from "../refs-data";
    import {mapState} from "vuex";
    import {comparingByIndex} from "../utils";

    export default {
        name: "Bibliography",
        data: function () {
            return {
                bibliography: refs.bibliography.sort(comparingByIndex),
            };
        },
        computed: {
            ...mapState({
                outlinedIndex: state => state.bibliography.outlinedIndex,
            }),
        },
        methods: {
            isOutlined(index) {
                return this.outlinedIndex === index;
            }
        },
    }
</script>

<style scoped>

</style>
