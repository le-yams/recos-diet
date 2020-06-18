<template>
    <div class="container m-5 p-5">
        <p class="lead">Site &eacute;labor&eacute; en partenariat avec l'&eacute;quipe di&eacute;t&eacute;tique du
            service de r&eacute;animation du CHU de Toulouse.</p>
        <p>Remerciement particuliers &agrave;:</p>
        <ul>
            <li>Carine Baux</li>
            <li>Sarah Chenal</li>
            <li>Am&eacute;lie Defossez</li>
            <li>V&eacute;ronique Fouss</li>
        </ul>
        <b-button variant="outline-primary" @click="$router.push('/')">Retour</b-button>
    </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>
