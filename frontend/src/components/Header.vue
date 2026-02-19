<template>
    <h1 class="main-title">Sports Finder</h1>
    <button v-if="!isLoggedIn" class="btn login-btn" title="Se connecter ou créer un compte">
        <i class="bi bi-box-arrow-in-right"></i>
    </button>
    <div v-else class="user-container">
        <i class="bi bi-person"></i>
        <div class="user-title">Thomas Test</div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
</script>