<template>
    <b-badge variant="secondary">
        <a :href="licenceUrl">
            <font-awesome-icon icon="balance-scale"/>&nbsp;{{ licenceLabel }}</a>
    </b-badge>
</template>

<script>
    export default {
        name: "LicenceBadge",
        props: {
            licence: {
                type: String,
            },
        },
        computed: {
            licenceLabel: function () {
                return this.licences[this.licence].label;
            },
            licenceUrl: function () {
                return this.licences[this.licence].url;
            },
        },
        data: function () {
            return {
                licences: {
                    "cc-by-4.0": {
                        label: "Creative Commons Attribution 4.0",
                        url: "https://creativecommons.org/licenses/by/4.0/deed.fr"
                    }
                }
            }
        }
    }
</script>

<style scoped>
    a {
        color: #fff !important;
        text-decoration: none !important;
    }

    a:hover {
        color: goldenrod !important;
    }
</style>
