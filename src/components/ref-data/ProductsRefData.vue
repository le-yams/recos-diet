<template>
    <div>
        <b-list-group-item><strong><u>{{nutritionType}}</u></strong></b-list-group-item>
        <b-list-group-item v-for="product in products" v-bind:key="product.name">
            <span>{{product.label}}</span>
            <ul>
                <li>Apport énergétique: {{product.kcalPerLiter}} kcal/L</li>
                <li>Apport en protéines: {{product.proteinsGramsPerLiter}} g/L</li>
            </ul>
        </b-list-group-item>
    </div>
</template>

<script>
    import refs from "../../refs-data";

    export default {
        name: "ProductsRefData",
        props: {
            nutritionType: {
                type: String,
                required: true,
            },
        },
        computed: {
            products: function () {
                return refs.nutritions[this.nutritionType].products;
            }
        },
    }
</script>

<style scoped>

</style>
