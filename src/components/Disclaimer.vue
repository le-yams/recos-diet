<template>
    <b-alert show variant="warning">
        <small>
            <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
            Cet outil &agrave; pour but de pr&eacute;senter un certain nombre de recommandations nutritionnelles pour le
            patient de r&eacute;animation.
            Il ne tient cependant pas compte de l'ensemble des paramètres médicaux.
            <br/>
            Aussi <strong>en cas de doute n'hésitez pas à solliciter l'avis de votre diététicien(ne)</strong>.
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
