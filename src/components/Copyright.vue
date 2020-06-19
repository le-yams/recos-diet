<template>
    <b-badge variant="secondary">
        <span v-if="!url">&copy; {{name}}</span>
        <a v-if="url" :href="url">&copy; {{name}}</a>
    </b-badge>
</template>

<script>
    export default {
        name: "Copyright",
        props: {
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,

            },
        },
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
