<template>
    <b-alert show variant="warning">
        <small>
            <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
            Cet outil a pour but de pr&eacute;senter les recommandations nutritionnelles pour le
            patient de r&eacute;animation aliment&eacute; en nutrition artificielle.
            Il ne tient cependant pas compte de l'ensemble des paramètres médicaux.
            <br/>
            Aussi, en cas de doute, <strong>n'h&eacute;sitez pas &agrave; solliciter l'avis de votre di&eacute;t&eacute;ticien(ne)</strong>.
            <br/>
            <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
            Ces recommendations ne sont valables que pour les <strong>adultes</strong>.
        </small>
    </b-alert>
</template>

<script>
    export default {
        name: "Disclaimer"
    }
</script>

<style scoped>
    div.alert {
        width: 100%;
        padding: 0 1em 0 1em;
    }
</style>
