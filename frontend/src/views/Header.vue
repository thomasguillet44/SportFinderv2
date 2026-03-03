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
            <MenuUser/>
        </div>
    </div>
    
</template>
<script setup>
import MenuUser from '@/components/MenuUser.vue';
import { ref } from 'vue';

const props = defineProps({
    username: String,
    isLoggedIn: Boolean
});

const isMenuToggled = ref(false);

const emits = defineEmits(['open-login']);

const openModaleLogin = () => {
    emits('open-login');
}
</script>