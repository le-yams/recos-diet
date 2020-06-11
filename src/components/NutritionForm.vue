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
                         :options="nutritionTypes" :clearable="false" :searchable="false" />
                    </div>
                </div>
                <div class="form-group form-row mb-1">
                    <label for="inputProduct" class="col-sm-3 col-form-label">Produit</label>
                    <div class="col-sm-9">
                        <v-select id="inputProduct" :value="selectedProduct.label" @input="selectedProductChange"
                                  :options="productsForSelectedNutritionType" :clearable="false" :searchable="false" />
                    </div>
                </div>
            </form>
        </b-card-body>
    </b-card>
</template>

<script>
    import {mapMutations, mapState} from "vuex";
    import refs from "../refs-data";

    export default {
        name: "NutritionForm",
        data: function () {
            return {
                lastSelectedEnterale: null,
                lastSelectedParenterale: null,
            }
        },
        computed: {
            nutritionTypes: function () {
                return Object.keys(this.nutritions);
            },
            productsForSelectedNutritionType: function () {
                return this.productsForNutritionType(this.selectedNutritionType);
            },
            ...mapState({
                nutritions: state => state.constants.nutritions,
                selectedNutritionType: state => state.nutrition.type,
                selectedProduct: state => {
                    return state.nutrition.product;
                },

            }),
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

                if (this.selectedNutritionType === refs.nutritionTypes.ENTERALE) {
                    this.lastSelectedEnterale = product;
                } else {
                    this.lastSelectedParenterale = product;
                }
            },
            selectedNutritionTypeChange: function (nutritionType) {
                var product;
                if (nutritionType === refs.nutritionTypes.ENTERALE) {
                    product = this.lastSelectedEnterale;
                } else {
                    product = this.lastSelectedParenterale;
                }
                if (product == null) {
                    product = this.defaultSelectedProductForType(nutritionType);
                }
                this.updateNutrition({
                    type: nutritionType,
                    product: product,
                });
            },
            ...mapMutations(['updateNutrition']),
        },
    }

</script>

<style scoped>

</style>
