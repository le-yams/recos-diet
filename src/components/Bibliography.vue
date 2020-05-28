<template>
    <div class="container-fluid">
        <div class="row" v-for="(source, index) in bibliography" v-bind:key="index"
             v-bind:class="{ 'font-weight-bold': isOutlined(index) }">
            <span :id="'bibliography-' + index">[{{index+1}}] {{source}}</span>
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
