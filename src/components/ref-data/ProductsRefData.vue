<template>
  <div>
    <b-list-group-item><strong><u>{{ nutritionType }}</u></strong></b-list-group-item>

    <b-list-group-item v-for="(product, index) in products" v-bind:key="product.name">
      <product-ref :ref-id="nutritionType + index" :product="product"></product-ref>
    </b-list-group-item>
  </div>
</template>

<script>
import refs from "../../refs-data";
import ProductRef from "@/components/ref-data/ProductRef";

export default {
  name: "ProductsRefData",
  components: {ProductRef},
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
