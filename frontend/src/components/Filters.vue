<template>
    <div class="sports-filters">
        <select id="sport" v-model="selectedSport">
            <option disabled value="">-- Sélectionner un sport --</option>
            <option
                v-for="sport in sportOptions"
                :key="sport.value"
                :value="sport.value">
                    {{ sport.label }}
            </option>
        </select>
    </div>    
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { Sports } from '@/enums/sports';

const emit = defineEmits(["sport-changed"]);

const selectedSport = ref("");
const sportOptions = computed(() => Object.values(Sports));


watch(selectedSport, (newSport) => {
    emit("sport-changed", newSport);
});
</script>