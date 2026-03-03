<template>
 <Layout>
    <template #header>
      <Header 
        @open-login="modaleLoginVisible = true"
        :username="username"
        :is-logged-in="isLoggedIn">
      </Header>
    </template>
    
    <template #main>
      <MapContainer :selectedSport="selectedSport"></MapContainer>
    </template>

    <template #filters>
      <Filters @sport-changed="handleSportChanged"></Filters>
    </template>

    <template #footer>
      <Footer></Footer>
    </template>    
  </Layout>

  <ModaleLogin
      v-show="modaleLoginVisible"
      @close="modaleLoginVisible = false"
      @login-success="handleLoginSuccess">
  </ModaleLogin>
</template>
<script setup>
import { ref, computed } from 'vue';
import Layout from './views/Layout.vue';
import Header from './views/Header.vue';
import Footer from './views/Footer.vue';
import MapContainer from './components/MapContainer.vue';
import Filters from './components/Filters.vue';
import ModaleLogin from './components/modales/ModaleLogin.vue';

const modaleLoginVisible = ref(false);

const token = ref(localStorage.getItem('token'));
const username = ref(localStorage.getItem('username'));

const isLoggedIn = computed(() => token.value !== null);

const handleLoginSuccess = ({ token: newToken, username: newUsername }) => {
    token.value = newToken;
    username.value = newUsername;
};

const selectedSport = ref("");

const handleSportChanged = (newSport) => {
  selectedSport.value = newSport;
};
</script>
<style scoped></style>
