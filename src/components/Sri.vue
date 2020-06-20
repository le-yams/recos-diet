<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <h1>Crit&egrave;res NICE 2006</h1>
        </div>
        <div class="row">
            <b-alert show variant="info">Les crit&egrave;res de NICE (National Institute for health and Clinical
                Excellence)
                permettent de d&eacute;pister les
                patients &agrave; haut risque de syndrome de renutrition inappropri&eacute;e. Les patients &agrave;
                risque de SRI
                comportent <strong>au moins 1 crit&egrave;re majeur ou au moins 2 crit&egrave;res mineurs</strong>.
            </b-alert>
        </div>
        <div class="row">
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title><u>Crit&egrave;res majeurs</u></b-card-title>
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
                        <b-card-title><u>Crit&egrave;res mineurs</u></b-card-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>IMC &lt; 18,5</b-list-group-item>
                        <b-list-group-item>Perte de poids involontaire &gt; 10% sur les 3-6 derniers mois
                        </b-list-group-item>
                        <b-list-group-item>Apport nutritionnel faible ou nul &gt; 5 jours</b-list-group-item>
                        <b-list-group-item>OH chronique</b-list-group-item>
                        <b-list-group-item>Insuline, chimiotéraphie, antiacides, diur&eacute;tiques</b-list-group-item>
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
    div.alert {
        width: 100%;
    }
</style>
