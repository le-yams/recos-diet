<template>
  <div class="container-fluid">
    <div class="row">
      <span class="pb-2"><strong>{{product.label}}</strong></span>
    </div>

    <div>
      <p class="pl-2"><i v-html="product.indications"></i></p>
    </div>

    <div class="composition">
      <div>
        <span>Composition: </span>
        <b-button v-b-toggle="'compo-' + refId" size="sm" variant="outline-secondary" squared>
          <span class="when-open"><font-awesome-icon icon="minus-square"/></span>
          <span class="when-closed"><font-awesome-icon icon="plus-square"/></span>
        </b-button>
      </div>
      <b-collapse :id="'compo-' + refId" class="mt-2">
      <ul>
        <li>Apport énergétique: {{product.kcalPerLiter}} kcal/L</li>
        <li>Apport en protéines: {{product.proteinsGramsPerLiter}} g/L</li>
      </ul>
      </b-collapse>
    </div>

  </div>
</template>

<script>
export default {
  name: "ProductRef",
  props: {
    refId: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.btn {
  border: none !important;
}
.btn:focus {
  box-shadow: none !important;
}

.composition {
  color: #566573;
}
</style>