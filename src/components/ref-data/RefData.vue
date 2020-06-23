<template>
    <div class="container-fluid">
        <div class="row">
            <b-tabs card>
                <b-tab class="p-0">
                    <template v-slot:title>
                        Produits
                    </template>
                    <b-card-body>
                        <div class="container-fluid">
                            <div class="row">

                                <div class="col-6">
                                    <products-ref-data :nutrition-type="enterale"></products-ref-data>
                                </div>

                                <div class="col-6">
                                    <products-ref-data :nutrition-type="parenterale"></products-ref-data>
                                </div>
                            </div>

                        </div>
                    </b-card-body>
                </b-tab>
            </b-tabs>
        </div>
        <div class="container-fluid">
            <b-button variant="outline-primary" class="ml-5"
                      @click="$router.push('/')">Retour
            </b-button>
        </div>
    </div>
</template>

<script>
    import ProductsRefData from "./ProductsRefData";
    import {nutritionTypes} from "../../refs-data";

    export default {
        name: "RefData",
        components: {ProductsRefData},
        data: function () {
            return {
                enterale: nutritionTypes.ENTERALE,
                parenterale: nutritionTypes.PARENTERALE,
            }
        }
    }
</script>

<style scoped>

    div.tabs {
        width: 100%;
    }
</style>
