<template>
    <div class="map-wrapper">
        <div id="map" :class="{ 'map-blur': isLocating }"></div>
        <div v-if="isLoading" class="map-overlay">
            <div class="spinner"></div>
        </div>
    </div>  
</template>
<script setup>
import { onMounted, watch, ref, computed } from 'vue';
import { centerMapOnCurrentLocation } from '@/utils/UtilsMap';

const props = defineProps({
    sportsFields: {
        type: Array,
        default: () => []
    },
    isLoadingFields: {
        type: Boolean
    }
});

const currentLocation = {
    lat: 47.218102,
    lng: -1.552800
}

const whereAmIIcon = L.divIcon({
    className: '',  // vide pour éviter les styles par défaut de Leaflet
    html: `<div style="
        width: 10px;
        height: 10px;
        background-color: var(--yellow-500);
        border-radius: 50%;
    "></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5] //sinon par défaut centre par rapport au coin supérieur gauche
});

const isLocating = ref(true);

const isLoading = computed(() => isLocating.value || props.isLoadingFields);

const emit = defineEmits(["map-coordinates"]);

let markersLayer = L.layerGroup(); //layer pour les marqueurs des terrains de sport

onMounted(async() => {
    let map = L.map('map', {
        zoomControl: false,
        attributionControl: false // on supprime les crédits en bas, c pas cool mais c plus beau
    }).setView([currentLocation.lat, currentLocation.lng], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map)

    const coordinates = await centerMapOnCurrentLocation(map);

    isLocating.value = false;

    emit("map-coordinates", coordinates);
   
    L.marker([coordinates[0], coordinates[1]], { icon: whereAmIIcon })
        .bindPopup("Vous êtes ici")
        .addTo(map);

    markersLayer.addTo(map);
});

watch(() => props.sportsFields, (newSportsFields) => {
    markersLayer.clearLayers(); // on vide le layer directement et on le réalimente pour éviter d'avoir à recréer la map à chaque fois

    newSportsFields.elements.forEach((field) => {
        // on fait out center dans notre requete OSM, donc pour les ways et les relations 
        // on recupere un centre, mais pas pour les nodes, qui sont des points, d'ou les deux traitements différents
        if (field.type === 'node' && field.lat && field.lon) {
            L.marker([field.lat, field.lon])
                .bindPopup(field.tags?.name || field.tags?.sport || 'N/A')
                .addTo(markersLayer);
        } else if ((field.type === 'way' || field.type === 'relation') && field.center?.lat && field.center?.lon) {
            L.marker([field.center.lat, field.center.lon])
                .bindPopup(field.tags?.name || field.tags?.sport || 'N/A')
                .addTo(markersLayer);
        }
    });
});
</script>
