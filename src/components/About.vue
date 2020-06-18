<template>
    <div>
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
        </div>
        <b-button variant="outline-primary" class="ml-5"
                  @click="$router.push('/')">Retour
        </b-button>
    </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>
