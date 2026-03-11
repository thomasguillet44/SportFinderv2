<template>
    <div class="menu-container">
        <ul class="menu-list">
            <li class="menu-item" @click="showFavoris">Favoris</li>
            <li class="menu-item" @click="logout">Logout</li>
        </ul>
    </div>
</template>
<script setup>
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
}

const emit = defineEmits(['show-favoris']);

const showFavoris = () => {
    emit('show-favoris');
}
</script>