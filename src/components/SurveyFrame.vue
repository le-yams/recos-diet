<template>
  <div class="container-fluid mt-3">
    <b-button variant="outline-primary" class="ml-5"
              @click="$router.push('/')">Retour
    </b-button>
    <div class="survey">
      <iframe :src="survey.url">
        Loading…
      </iframe>
    </div>
    <b-button variant="outline-primary" class="ml-5"
              @click="$router.push('/')">Retour
    </b-button>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SurveyFrame",
  mounted: function () {
    console.log('mounted!');
    window.scrollTo(0,0);
  },
  computed: {
    ...mapState(['survey']),
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