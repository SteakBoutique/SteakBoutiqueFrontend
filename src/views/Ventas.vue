<script setup lang="ts">
import modalVentas from "./../components/ventas/modalVentas.vue"
import { ref, onMounted } from "vue";
import {useAuthStore} from '../stores/auth';
import { useVentas } from '../composables/useVentas';
import TablaVentas from "../components/ventas/tablaVentas.vue";
const { getVentas, ventas, loading, error } = useVentas();

onMounted(() => {
  getVentas();
});

const ventaSuccess = () =>{
  getVentas();
  modalVenta.value = false
  
}

const authStore = useAuthStore();

const vendedor_id = authStore.user?.id || '';

const modalVenta = ref(false);

const filter = [
  {
    label: 'Hoy',
    value: 'hoy',
  },
  {
    label: 'Esta semana',
    value: 'semana',
  },
  {
    label: 'Este mes',
    value: 'mes',
  },
  {
    label: 'Este año',
    value: 'año',
  },
];
</script>

<template>
  <header class="w-full border-b-2 border-steak-900 bg-white sticky top-0 z-10">
    <h1 class="text-steak-600 text-2xl font-bold p-4">VENTAS</h1>

  </header>

  <main>
    <section class="p-2 mt-2 flex flex-row gap-4 ">
      <UInput
        size="xl"
        class="bg-white rounded-lg"
        placeholder="Vendedor o cliente"
        icon="i-lucide-search"
      ></UInput>
      <UDropdownMenu :items="filter">
      <UButton
        size="xl"
        class="bg-steak-600 text-white rounded-lg hover:bg-steak-700 transition-colors"
        icon="i-lucide-filter"
        ></UButton>
        </UDropdownMenu>
    </section>
    <section class="p-2">
      <div v-if="loading" class="text-center text-gray-500">Cargando ventas...</div>
      <div v-else-if="error" class="text-center text-red-500">Error al cargar las ventas: {{ error }}</div>
      <div v-else>
        <div v-if="ventas.length === 0" class="text-center text-gray-500">No hay ventas registradas.</div>
        <div v-else>
          <TablaVentas v-for="venta in ventas" :key="venta.id" :ventas="venta" class="mb-4"/>
        </div>
      </div>
    </section>
  </main>

  <UButton
    class="fixed bottom-24 right-6 bg-steak-600 text-white p-4 rounded-full shadow-lg hover:bg-steak-700 transition-colors"
    @click="modalVenta = true" icon="i-lucide-plus"
  >
  </UButton>

    <modalVentas :open="modalVenta" 
    :vendedor_id="vendedor_id"
    @success="ventaSuccess"
    @close="modalVenta = false"
    />
</template>
