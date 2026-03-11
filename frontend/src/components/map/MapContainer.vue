<template>
    <Map 
        ref="mapRef"
        @map-coordinates="handleMapCoordinates" 
        @change-selected-field="handleChangeSelectedField"
        :sports-fields="sportsFields" 
        :isLoadingFields="isLoadingFields">
    </Map>
    <RetourRequeteUtilisateur @close="isRetourUserVisible = false" v-if="isRetourUserVisible" :message="message" />
    <MenuSportElement 
        v-if="selectedField" 
        :selectedField="selectedField"
        :isLoggedIn="isLoggedIn"
        @close="handleCloseMenuSportElement"/>
    />
</template>
<script setup>
import { ref, watch } from 'vue';
import Map from './Map.vue';
import RetourRequeteUtilisateur from '../popup/RetourRequeteUtilisateur.vue';
import { getBoudingBox } from '../../utils/UtilsMap.js';
import { fetchSportsFields } from '@/services/fetchSportsFields';
import MenuSportElement from '../popup/MenuSportElement.vue';

const props = defineProps({
    selectedSport: String,
    isLoggedIn: Boolean
});

const mapRef = ref(null);

const mapCoordinates = ref([47.218102, -1.552800]);
const boudingBox = ref(null);

const sportsFields = ref([]);

const isLoadingFields = ref(false);

const timer = ref(null);
const message = ref("");
const isRetourUserVisible = ref(false);

const selectedField = ref(null);

const handleChangeSelectedField = (field) => {
    selectedField.value = field;
    console.log("Selected field:", selectedField.value);
}

const handleMapCoordinates = (coordinates) => {
    mapCoordinates.value = coordinates;
    boudingBox.value = getBoudingBox(coordinates, 5);

    console.log("boundingbox", boudingBox.value);
};

const handleCloseMenuSportElement = () => {
    selectedField.value = null;
    mapRef.value.clearSelectedMarker();
}

watch(() => props.selectedSport, () => {
    isLoadingFields.value = true;

    const start = performance.now();

    fetchSportsFields(props.selectedSport, boudingBox.value)
        .then((sportsFieldsData) => {
            const end = performance.now();
            timer.value = end - start;
            
            sportsFields.value = sportsFieldsData;
            isLoadingFields.value = false;

            if (sportsFieldsData.elements.length === 0) {
                message.value = "Aucun terrain de sport trouvé dans cette zone pour ce sport.";
            } else {
                message.value = `${sportsFieldsData.elements.length} terrains de sport trouvés dans cette zone en ${(timer.value / 1000).toFixed(2)} s.`;
            }

            isRetourUserVisible.value = true;
        })
        .catch((error) => {
            isLoadingFields.value = false;

            const end = performance.now();
            timer.value = end - start;
            message.value = "Error fetching sports fields:" + error.message + ` (after ${timer.value.toFixed(2)} ms)`;

            isRetourUserVisible.value = true;
        });
});
</script>