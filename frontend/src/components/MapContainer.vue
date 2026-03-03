<template>
    <Map 
        @map-coordinates="handleMapCoordinates" 
        :sports-fields="sportsFields" 
        :isLoadingFields="isLoadingFields">
    </Map>
</template>
<script setup>
import { ref, watch } from 'vue';
import Map from './Map.vue';
import { getBoudingBox } from '../utils/UtilsMap.js';
import { fetchSportsFields } from '@/services/fetchSportsFields';

const props = defineProps({
    selectedSport: String
});

const mapCoordinates = ref([47.218102, -1.552800]);
const boudingBox = ref(null);

const sportsFields = ref([]);

const isLoadingFields = ref(false);

const handleMapCoordinates = (coordinates) => {
    mapCoordinates.value = coordinates;
    boudingBox.value = getBoudingBox(coordinates, 5);

    console.log("boundingbox", boudingBox.value);
};

watch(() => props.selectedSport, () => {
    isLoadingFields.value = true;
    fetchSportsFields(props.selectedSport, boudingBox.value)
        .then((sportsFieldsData) => {
            sportsFields.value = sportsFieldsData;
            isLoadingFields.value = false;

            if (sportsFieldsData.elements.length === 0) {
                console.log("Aucun terrain de sport trouvé dans cette zone pour ce sport.");
            } else {
                console.log(`${sportsFieldsData.elements.length} terrains de sport trouvés dans cette zone pour ce sport.`);
            }
        })
        .catch((error) => {
            console.error("Error fetching sports fields:", error);
            isLoadingFields.value = false;
        });
});
</script>