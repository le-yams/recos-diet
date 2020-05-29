<template>
    <div class="container-fluid">
        <div class="row" v-for="(source, index) in bibliography" v-bind:key="index"
             v-bind:class="{ 'font-weight-bold': isOutlined(index) }">
            <p :id="'bibliography-' + index" class="mb-1">
                <span v-if="source.url">[{{index+1}}]&nbsp;<a :href="source.url">{{source.label}}</a></span>
                <span v-else>[{{index+1}}]&nbsp;{{source.label}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    import refs from "../refs-data";
    import {mapState} from "vuex";

    export default {
        name: "Bibliography",
        data: function () {
            return {
                bibliography: refs.bibliography,
            };
        },
        computed: {
            ...mapState({
                outlined: state => state.bibliography.outlined,
            }),
        },
        methods: {
            isOutlined(index) {
                return this.outlined === (index + 1);
            }
        },
    }
</script>

<style scoped>

</style>
