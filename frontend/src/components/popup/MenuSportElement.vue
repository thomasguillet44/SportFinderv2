<template>
    <div class="popup menu-sport-element">
        <div class="first-line-menu-sport-element">
            <h3>{{ selectedField.name }}</h3>
            <button class="btn btn-close-menu-sport-element" @click="$emit('close')">
                <i class="bi bi-x"></i>
            </button>
        </div>
        <div class="second-line-menu-sport-element">
            <p>{{ selectedField.sport }}</p>
        </div>
        <div class="third-line-menu-sport-element">
            <button class="btn btn-primary" :disabled="!isLoggedIn" @click="addToFavorit">Ajouter aux favoris</button>
            <a :href="`https://www.google.com/maps/search/?api=1&query=${selectedField.lat},${selectedField.lon}`" target="_blank">
                <button class="btn btn-primary">S'y rendre</button>
            </a>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { addFavoriServiceFrontend } from '@/services/favoriServiceFrontend.js';

const props = defineProps({
    selectedField: Object,
    isLoggedIn: Boolean
});

const isLoading = ref(false);
const errorAddFavoriMessage = ref('');

const emit = defineEmits(['close']);

const addToFavorit = async () => {
    isLoading.value = true;
    errorAddFavoriMessage.value = '';
    try {
        const userId = localStorage.getItem('userid');
        const addFavoriResult = await addFavoriServiceFrontend(userId, props.selectedField);
        if (addFavoriResult.status === 200) {
            alert('Added to favorites successfully!');
            emit('close');
        } else {
            errorAddFavoriMessage.value = 'Failed to add to favorites';
        }
    } catch (error) {
        errorAddFavoriMessage.value = error.message;
    } finally {
        isLoading.value = false;
    }
}


</script>