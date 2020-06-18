<template>
    <b-badge variant="secondary">&copy; {{name}}</b-badge>
</template>

<script>
    export default {
        name: "Copyright",
        props: {
            name: {
                type: String,
            },
        },
    }
</script>

<style scoped>

</style>
