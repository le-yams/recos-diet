<template>
  <div class="container-fluid mt-3">
    <b-button variant="outline-primary" class="ml-5"
              @click="$router.push('/')">Retour
    </b-button>
    <div class="survey">
      <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfpgafhXhrTCMxt1h68rmn6oKI_viUSZxZcfSy_Vnd89qom6w/viewform?embedded=true">
        Loading…
      </iframe>
    </div>
    <b-button variant="outline-primary" class="ml-5"
              @click="$router.push('/')">Retour
    </b-button>
  </div>
</template>

<script>
export default {
  name: "SurveyFrame",
  mounted: function () {
    console.log('mounted!');
    window.scrollTo(0,0);
  }
}
</script>

<style scoped>

.survey {
  margin: 0;
  padding: 0;
}

.survey iframe {
  display: block;
  border: none; /* Reset default border */
  height: 100vh; /* Viewport-relative units */
  width: 100vw;
}

</style>