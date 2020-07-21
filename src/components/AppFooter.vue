<template>
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
                    <copyright name="Yann D'Isanto" url="https://gitlab.com/ydisanto/recos-diet"></copyright>&nbsp;
                    <licence-badge licence="cc-by-4.0"></licence-badge>
                    <clicky-analytics site-id="101267359"></clicky-analytics>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import Copyright from "./Copyright";
    import LicenceBadge from "./LicenceBadge";
    import ClickyAnalytics from "./ClickyAnalytics";

    export default {
        name: "AppFooter",
        components: {ClickyAnalytics, Copyright, LicenceBadge},
    }
</script>

<style scoped>

</style>