<template>
    <h1 class="main-title">Sports Finder</h1>
    <div class="login-container">
        <button v-if="!isLoggedIn" class="btn login-modale-btn" @click="openModaleLogin">
                <i class="bi bi-box-arrow-in-right"></i>
        </button>
        <div v-else class="user-wrapper">
            <div class="user-container">
                <i class="bi bi-person"></i>
                <span class="username">{{ username }}</span>
            </div>
            <MenuUser @show-favoris="handleShowFavoris"/>
        </div>
    </div>
    
</template>
<script setup>
import MenuUser from '@/components/MenuUser.vue';

const props = defineProps({
    username: String,
    isLoggedIn: Boolean
});

const emits = defineEmits(['open-login', 'show-favoris']);

const openModaleLogin = () => {
    emits('open-login');
}

const handleShowFavoris = () => {
    emits('show-favoris');
}
</script>