<template>
    <div class="popup retour-user">
        <p class="message-retour-user">{{ message }}</p>
        <button class="btn btn-close-retour-user" @click="$emit('close')">
            <i class="bi bi-x"></i>
        </button>
    </div>
</template>
<script setup>
const props = defineProps({
    message: String
})

const emits = defineEmits(['close']);
</script>