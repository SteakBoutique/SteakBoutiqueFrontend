<script setup lang="ts">
import modalVentas from "./../components/ventas/modalVentas.vue"
import { ref } from "vue";
import {useAuthStore} from '../stores/auth';

const authStore = useAuthStore();

const vendedor_id = authStore.user?.id || '';

const modalVenta = ref(false);
</script>

<template>
  <header class="w-full border-b-2 border-steak-900 bg-white sticky top-0 z-10">
    <h1 class="text-steak-600 text-2xl font-bold p-4">VENTAS</h1>
  </header>

  <UButton
    class="fixed bottom-24 right-6 bg-steak-600 text-white p-4 rounded-full shadow-lg hover:bg-steak-700 transition-colors"
    @click="modalVenta = true" icon="i-lucide-plus"
  >
  </UButton>

    <modalVentas :open="modalVenta" 
    :vendedor_id="vendedor_id"
    @close="modalVenta = false "/>
</template>
