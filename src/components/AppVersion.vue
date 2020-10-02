<template>
  <b-badge variant="secondary">
    <span v-if="!url">{{ $store.getters.currentVersion }}</span>
    <a v-if="url" :href="url">{{ $store.getters.currentVersion }}</a>
  </b-badge>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "AppVersion",
  props: {
    url: {
      type: String,

    },
  },
  data: function () {
    return {
      checkForUpdateIntervalId: null,
      checkingForUpdate: false,
      lastWarningTimestamp: 0,
    };
  },
  methods: {
    initializeUpdateInterval() {
      console.group("initializing check for update interval");
      if (this.checkForUpdateIntervalId) {
        console.log("clearing previous interval with handle id=" + this.checkForUpdateIntervalId);
        window.clearInterval(this.checkForUpdateIntervalId);
      }
      this.checkForUpdateIntervalId = window.setInterval(() => {
        this.checkForUpdate()
      }, this.checkForUpdateDelay);
      console.log("new interval set with handle id=" + this.checkForUpdateIntervalId + " and delay=" + this.checkForUpdateDelay);
      this.checkForUpdate();
      console.groupEnd()
    },
    checkForUpdate() {
      const elapsedFromLastWarning = new Date().getTime() - this.lastWarningTimestamp;
      if (this.checkingForUpdate || elapsedFromLastWarning < this.$store.getters.updateWarningSleep) {
        return;
      }
      this.checkingForUpdate = true;
      this.$http.get(location.origin + '/version.json?dummy=' + new Date().getTime()).then(
          response => {
            const latestVersion = response.body.version;
            if (this.$store.getters.currentVersion !== latestVersion) {
              if (confirm("Une nouvelle version du site a été publiée, il est nécessaire de rafraîchir la page. Voulez-vous rafraîchir maintenant ?")) {
                location.reload();
              } else {
                this.lastWarningTimestamp = new Date().getTime();
              }
            }
            this.checkingForUpdate = false;
          },
          error => {
            console.warn("error getting remote latest version: ", error);
            this.checkingForUpdate = false;
          }
      )
    }
  },
  computed: {
    ...mapState({
      checkForUpdateDelay: state => state.appVersion.checkForUpdateDelay,
      updateWarningSleep: state => state.appVersion.updateWarningSleep,
    })
  },
  watch: {
    checkForUpdateDelay() {
      this.initializeUpdateInterval();
    },
  },
  mounted: function () {
    this.initializeUpdateInterval();
  }
}
</script>

<style scoped>
a {
  color: #fff !important;
  text-decoration: none !important;
}

a:hover {
  color: goldenrod !important;
}
</style>