<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <h1>Critères NICE 2006</h1>
        </div>
        <div class="row">
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title><u>Soit 1 des critères suivants</u></b-card-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>IMC &lt; 16</b-list-group-item>
                        <b-list-group-item>Perte de poids involontaire &gt; 15% sur les 3-6 derniers mois
                        </b-list-group-item>
                        <b-list-group-item>Apport nutritionnel faible ou nul &gt; 10 jours</b-list-group-item>
                        <b-list-group-item>HypoPh<sup>-</sup> / HypoK<sup>+</sup> / HypoMg<sup>+</sup>
                            avant renutrition
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title><u>Soit 2 des critères suivants</u></b-card-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>IMC &lt; 18,5</b-list-group-item>
                        <b-list-group-item>Perte de poids involontaire &gt; 10% sur les 3-6 derniers mois
                        </b-list-group-item>
                        <b-list-group-item>Apport nutritionnel faible ou nul &gt; 5 jours</b-list-group-item>
                        <b-list-group-item>OH chronique</b-list-group-item>
                        <b-list-group-item>insuline, chimiotéraphie, antiacides, diurétiques</b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sri"
    }
</script>

<style scoped>

</style>
