<template>
    <div id="app">

        <router-view></router-view>

        <footer class="footer py-3 bg-light text-muted small border-top border-bottom mt-5">
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        Site &eacute;labor&eacute; en partenariat avec
                        <router-link to="/about" href="about.html">l'&eacute;quipe di&eacute;t&eacute;tique du
                            service de r&eacute;animation du CHU de Toulouse
                        </router-link>
                    </div>
                    <div class="col text-right">
                        <copyright name="Yann D'Isanto"></copyright>&nbsp;
                        <licence-badge licence="cc-by-4.0"></licence-badge>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import LicenceBadge from "./components/LicenceBadge";
    import Copyright from "./components/Copyright";

    export default {
        name: 'App',
        components: {Copyright, LicenceBadge},
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
