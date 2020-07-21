<template>
    <div id="app">
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppFooter from "./components/AppFooter";

    export default {
        name: 'App',
        components: {AppFooter},
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
