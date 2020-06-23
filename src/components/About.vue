<template>
    <div>
        <b-alert v-if="thanks" variant="success"
                 fade :show="thanksDismissCountDown" @dismissed="dismissCountDown=0" dismissible>
            Merci beaucoup pour votre donation !
        </b-alert>
        <div class="jumbotron m-5 p-5">
            <p class="lead">Site &eacute;labor&eacute; en partenariat avec l'&eacute;quipe di&eacute;t&eacute;tique du
                service de r&eacute;animation du CHU de Toulouse.</p>
            <hr class="my-4">
            <p>Remerciements &agrave; toute l'&eacute;quipe di&eacute;t&eacute;tique du
                service de r&eacute;animation du CHU de Toulouse et en particuliers &agrave; :</p>
            <ul>
                <li>Carine Baux</li>
                <li>Sarah Chenal</li>
                <li>Am&eacute;lie Defossez</li>
                <li>V&eacute;ronique Fouss</li>
            </ul>

            <hr class="my-4">

            <p>{{donationText1}}
                <font-awesome-icon icon="smile"/>
                .
            </p>
            <p>{{donationText2}}</p>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick"/>
                <input type="hidden" name="hosted_button_id" value="MKFWK5Q6FSEQW"/>
                <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donate_SM.gif"
                       border="0"
                       name="submit" title="Faire un don"
                       alt="Bouton Faites un don avec PayPal"/>
                <img alt="" border="0" src="https://www.paypal.com/fr_FR/i/scr/pixel.gif" width="1" height="1"/>
            </form>

            <hr class="my-4">

            <p>Favicon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a
                    href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </div>

        <div class="container-fluid">
            <b-button variant="outline-primary" class="ml-5"
                      @click="$router.push('/')">Retour
            </b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "About",
        data: function () {
            return {
                donationText1: "Merci d'avoir utilisé ce site, j'espère qu'il vous aura été utile",
                donationText2: "Si vous aimez ce site ou qu'il vous a été utile, n'hésitez pas à contribuer à son maintien en activité (développement et hébergement) assuré de manière bénévole.",

                thanksDismissCountDown: 5
            };
        },
        computed: {
            thanks: function () {
                console.log(this.$route.query);
                return this.$route.query['thanks-for-donation'] !== undefined;
            }
        },
    }
</script>

<style scoped>

</style>
