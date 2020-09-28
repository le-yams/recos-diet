<template>
  <b-card no-body>
    <b-card-header>
      <font-awesome-icon icon="utensils"/>&nbsp;Nutrition
    </b-card-header>
    <b-card-body>
      <form>
        <div class="form-group form-row mb-1">
          <label for="inputType" class="col-sm-3 col-form-label">Type</label>
          <div class="col-sm">
            <v-select id="inputType" :value="selectedNutritionType" @input="selectedNutritionTypeChange"
                      :options="nutritionTypes" :clearable="false" :searchable="false"/>
          </div>
        </div>
        <div class="form-group form-row mb-1">
          <label for="inputProduct" class="col-sm-3 col-form-label">Produit</label>
          <div class="col-sm-9">
            <v-select id="inputProduct" :value="selectedProduct.label" @input="selectedProductChange"
                      :options="productsForSelectedNutritionType" :clearable="false" :searchable="false"/>
          </div>
        </div>
        <div class="pull-right">
          <small>
            <router-link to="/refs" href="refs.html">[refs]
            </router-link>
          </small>
        </div>
      </form>
    </b-card-body>
  </b-card>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {pathologieNames, productsLabel} from "../refs-data";

export default {
  name: "NutritionForm",
  props: {
    pathologies: {
      type: Array,
      required: true,
    }
  },
  computed: {
    hasAnorexia: function () {
      return this.pathologies.find(p => p.label === pathologieNames.ANOREXIE_MENTALE);
    },
    nutritionTypes: function () {
      return Object.keys(this.nutritions);
    },
    productsForSelectedNutritionType: function () {
      let products = this.productsForNutritionType(this.selectedNutritionType);
      if (this.hasAnorexia) {
        return products.filter(p =>
            p.label === productsLabel.MEDNUTRIFLEX_OMEGA ||
            p.label === productsLabel.SONDALIS_JUNIOR_STANDARD);
      } else {
        return products;
      }
    },
    ...mapState({
      nutritions: state => state.constants.nutritions,
      selectedNutritionType: state => state.nutrition.type,
      selectedProduct: state => {
        return state.nutrition.product;
      },

    }),
  },
  watch: {
    productsForSelectedNutritionType: function () {
      if (!this.productsForSelectedNutritionType.find(p => p === this.selectedProduct)) {
        this.updateNutrition({
          type: this.selectedNutritionType,
          product: this.productsForSelectedNutritionType[0],
        });
      }
    }
  },
  methods: {
    productsForNutritionType: function (nutritionType) {
      return this.nutritions[nutritionType].products;
    },
    defaultSelectedProductForType: function (nutritionType) {
      return this.productsForNutritionType(nutritionType).find(nt => nt.default);
    },
    selectedProductChange: function (product) {
      this.updateNutrition({
        type: this.selectedNutritionType,
        product: product,
      });
    },
    selectedNutritionTypeChange: function (nutritionType) {
      this.updateNutrition({
        type: nutritionType,
        product: this.defaultSelectedProductForType(nutritionType),
      });
    },
    ...mapMutations(['updateNutrition']),
  },
}

</script>

<style scoped>

</style>
