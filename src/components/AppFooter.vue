<template>
  <footer class="footer py-3 bg-light text-muted small border-top border-bottom mt-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          Site &eacute;labor&eacute; en partenariat avec
          <router-link to="/about">l'&eacute;quipe di&eacute;t&eacute;tique du
            service de r&eacute;animation du CHU de Toulouse
          </router-link>
        </div>
        <div class="col text-center clignote">
          <b-button variant="outline-warning" class="ml-5"
                    @click="$router.push('/survey')">Donnez votre avis ici !
          </b-button>
        </div>

        <div class="col text-right">
          <app-version url="https://gitlab.com/ydisanto/recos-diet/-/blob/master/CHANGELOG.md"></app-version>&nbsp;
          <copyright name="Yann D'Isanto" url="https://gitlab.com/ydisanto/recos-diet"></copyright>&nbsp;
          <licence-badge licence="cc-by-4.0"></licence-badge>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Copyright from "@/components/Copyright";
import LicenceBadge from "@/components/LicenceBadge";
import AppVersion from "@/components/AppVersion";

export default {
  name: "AppFooter",
  components: {AppVersion, Copyright, LicenceBadge},
}
</script>

<style scoped>
.clignote {
  /*color:green;*/
  animation: clignote 2s linear infinite;
}

@keyframes clignote {
  50% {
    opacity: 0;
  }
}
</style>
