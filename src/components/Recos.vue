<template>
    <b-card no-body>
        <b-card-header>
            <font-awesome-icon icon="pills"/>&nbsp;Recommendations
        </b-card-header>
        <b-card-body>
            <div class="container">
                <div class="row">
                    <ul>
                        <li v-for="p in pathologies" v-bind:key="p.label">{{p.label}}</li>
                    </ul>
                </div>
            </div>
        </b-card-body>
    </b-card>
</template>

<script>
    export default {
        name: "Recos",
        props: {
            pathologies: {
                type: Array,
            },
        },
    }
</script>

<style scoped>

</style>
