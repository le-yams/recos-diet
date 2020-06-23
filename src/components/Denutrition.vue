<template>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <h1>Crit&egrave;res de d&eacute;nutrition HAS</h1>
        </div>
        <div class="row mb-3">
            <b-checkbox v-model="patientIsOld" size="lg">Patient ag&eacute; (cocher si age &ge; 70 ans)
            </b-checkbox>
        </div>
        <div class="row">
            <b-alert show variant="info" v-if="!patientIsOld">
                Une d&eacute;nutrition est pr&eacute;sente s'il y a pr&eacute;sence d'au moins <strong>1 crit&egrave;re
                ph&eacute;notypique et 1 crit&egrave;re &eacute;tiologique</strong>.
            </b-alert>
            <b-alert show variant="info" v-if="patientIsOld">
                Une d&eacute;nutrition est pr&eacute;sente s'il y a pr&eacute;sence d'au moins <strong>1 crit&egrave;re
                ph&eacute;notypique</strong> (il n'y a pas de crit&egrave;re &eacute;tiologique).
            </b-alert>
        </div>
        <div class="row" v-if="!patientIsOld">
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title><u>Crit&egrave;res ph&eacute;notypiques</u></b-card-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>Perte de poids &ge; 5 &percnt; en 1 mois ou &ge; 10 &percnt; en 6 mois ou
                            &ge; 10 &percnt; par rapport au poids habituel avant le d&egrave;but de la maladie.
                        </b-list-group-item>
                        <b-list-group-item>IMC &lt; 18,5 kg/m.</b-list-group-item>
                        <b-list-group-item>R&eacute;duction quantifi&eacute;e de la masse musculaire et/ou de la
                            fonction musculaire.
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title><u>Crit&egrave;res &eacute;tiologiques</u></b-card-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>R&eacute;duction de la prise alimentaire &ge; 50 &percnt; pendant plus d'1
                            semaine,
                            ou toute r&eacute;duction des apports pendant plus de 2 semaines par rapport &agrave; la
                            consommation alimentaire habituelle quantifi&eacute;e ou aux besoins prot&eacute;ino-&eacute;nerg&eacute;tiques
                            estim&eacute;s.
                        </b-list-group-item>
                        <b-list-group-item>Absorption r&eacute;duite (maldigestion/malabsorption).</b-list-group-item>
                        <b-list-group-item>Situation d'agression (hypercatabolisme prot&egrave;ique avec ou sans
                            syndrome inflammatoire) : pathologie aigu&euml; ou pathologie chronique
                            &egrave;volutive ou pathologie maligne &egrave;volutive.
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
        </div>
        <div class="row" v-if="patientIsOld">
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title><u>Crit&egrave;res ph&eacute;notypiques</u></b-card-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>Perte de poids &ge; 5 &percnt; en 1 mois ou &ge; 10 &percnt; en 6 mois.
                        </b-list-group-item>
                        <b-list-group-item>IMC &lt; 21 kg/m.</b-list-group-item>
                        <b-list-group-item>Albumin&eacute;mie &lt; 35 g/L.</b-list-group-item>
                        <b-list-group-item>MNA global &lt; 17.</b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
        </div>

        <hr class="my-4">

        <div class="row">
            <b-alert show variant="info">
                La s&eacute;v&eacute;rit&eacute; d'une d&eacute;nutrition av&eacute;r&eacute;e est &eacute;valu&eacute;e
                selon les crit&egrave;res suivants.
            </b-alert>
        </div>
        <div class="row" v-if="!patientIsOld">
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title>D&eacute;nutrition mod&eacute;r&eacute;e</b-card-title>
                        <b-card-sub-title>(1 seul crit&egrave;re suffit)</b-card-sub-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>17 &lt; IMC &lt; 18,5 kg/m.</b-list-group-item>
                        <b-list-group-item>Perte de poids &ge; 5 &percnt; en 1 mois ou &ge; 10 &percnt; en 6 mois ou
                            &ge; 10 &percnt; par rapport au poids habituel avant le d&eacute;but de la maladie.
                        </b-list-group-item>
                        <b-list-group-item>Albumin&egrave;mie &gt; 30 g/L et &lt; 35 g/L.</b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title>D&eacute;nutrition s&eacute;v&egrave;re</b-card-title>
                        <b-card-sub-title>(1 seul crit&egrave;re suffit)</b-card-sub-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>IMC &le; 17 kg/m.</b-list-group-item>
                        <b-list-group-item>Perte de poids &ge; 10 &percnt; en 1 mois ou &ge; 15 &percnt; en 6 mois ou
                            &ge; 15 &percnt; par rapport au poids habituel avant le d&eacute;but de la maladie.
                        </b-list-group-item>
                        <b-list-group-item>Albumin&eacute;mie &le; 30 g/L.</b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
        </div>

        <div class="row" v-if="patientIsOld">
            <div class="col">
                <b-card>
                    <b-card-body>
                        <b-card-title>D&egrave;nutrition s&eacute;v&eacute;re</b-card-title>
                        <b-card-sub-title>(1 seul crit&egrave;re suffit)</b-card-sub-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>IMC &lt; 18 kg/m.</b-list-group-item>
                        <b-list-group-item>Perte de poids &ge; 10 &percnt; en 1 mois ou &ge; 15 &percnt; en 6 mois.
                        </b-list-group-item>
                        <b-list-group-item>Albumin&eacute;mie &lt; 30 g/L.</b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
        </div>

        <div class="row mt-5">
            <span>Source:</span>
            <a :href="sourceUrl">Fiche outil pour le diagnostic de la d&eacute;nutrition de l'enfant et de l'adulte.</a>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Denutrition",
        data: function () {
            return {
                patientIsOld: false,
                sourceUrl: "https://www.has-sante.fr/jcms/p_3120231/fr/diagnostic-de-la-denutrition-de-l-enfant-et-de-l-adulte-fiche-outil"
            };
        }
    }
</script>

<style scoped>
    div.alert {
        width: 100 & percnt;;
    }

    #oldPatient {
        font-size: 1.2em;
    }
</style>
