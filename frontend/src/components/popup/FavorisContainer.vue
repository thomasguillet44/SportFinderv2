<template>
    <div class="favoris-container">
        <div class="first-line-favoris-container">
            <h2>Mes Favoris</h2>
            <button class="btn btn-close-favoris-container" @click="$emit('close')">
                <i class="bi bi-x"></i>
            </button>
        </div>
        <div v-if="favoris.length === 0">
            <p>Aucun favori ajouté.</p>
        </div>
        <ul v-else class="favoris-list">
            <li v-for="favori in favoris" :key="favori.id" class="favori-item">
    
                <div class="favori-info">
                    <span class="favori-name">{{ favori.name }}</span>
                    <span class="favori-sport">{{ favori.sport }}</span>
                </div>

                <div class="button-container">
                    <a :href="`https://www.google.com/maps/search/?api=1&query=${favori.latitude},${favori.longitude}`" target="_blank">
                        <button class="btn btn-primary">
                            <i class="bi bi-arrow-return-right"></i>
                        </button>
                    </a>
                    <button class="btn btn-primary" @click="deleteFavori(favori.id)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getFavorisByUserIdServiceFrontend, deleteFavoriServiceFrontend } from '@/services/favoriServiceFrontend.js';

const favoris = ref([]);

const emit = defineEmits(['close']);

const deleteFavori = async (favoriId) => {
    try {
        await deleteFavoriServiceFrontend(favoriId);
        favoris.value = favoris.value.filter(favori => favori.id !== favoriId);
    } catch (error) {
        console.error("Erreur lors de la suppression du favori :", error);
    }
};

onMounted(async () => {
    try {
        const userId = localStorage.getItem('userid');
        const response = await getFavorisByUserIdServiceFrontend(userId);
        favoris.value = response.data;
        console.log("Favoris récupérés :", favoris.value);
    } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
    }
});
</script>