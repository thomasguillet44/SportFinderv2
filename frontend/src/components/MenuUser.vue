<template>
    <div class="menu-container">
        <ul class="menu-list">
            <li class="menu-item">Réglages</li>
            <li class="menu-item">Favoris</li>
            <li class="menu-item logout" @click="logout">Logout</li>
        </ul>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
}

</script>