<template>
        <span ref="clicky"></span>
</template>

<script>
    export default {
        name: "ClickyAnalytics",
        props: {
            siteId: {
                type: String
            }
        },
        mounted: function () {

            let clickyIdScript = document.createElement('script');
            clickyIdScript.setAttribute('data-some-param', 'paramvalue');
            clickyIdScript.nodeValue = `var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(${this.siteId});`;

            let clickyImportScript = document.createElement('script');
            clickyImportScript.setAttribute('src', '//static.getclicky.com/js');
            clickyImportScript.setAttribute('async', 'true');

            this.$refs.clicky.appendChild(clickyIdScript);
            this.$refs.clicky.appendChild(clickyImportScript);
        }
    }
</script>

<style scoped>

</style>