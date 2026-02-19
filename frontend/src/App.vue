<template>
 <Layout>
    <template #header>
      <Header></Header>
    </template>
    
    <template #main>
      <Main :selectedSport="selectedSport"></Main>
    </template>

    <template #filters>
      <Filters @sport-changed="handleSportChanged"></Filters>
    </template>

    <template #footer>
      <Footer></Footer>
    </template>     
  </Layout>
</template>
<script setup>
import { ref } from 'vue';
import Layout from './views/Layout.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Main from './components/Main.vue';
import Filters from './components/Filters.vue';

const selectedSport = ref("");

const handleSportChanged = (newSport) => {
  selectedSport.value = newSport;
};

</script>
<style scoped></style>
