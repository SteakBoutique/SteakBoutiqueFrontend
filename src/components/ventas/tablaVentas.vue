<script lang="ts" setup>
import type { ventas } from '../../types/ventas';

const props = defineProps<{
    ventas: ventas
}>()
</script>

<template>
    <section class="border border-gray-400 rounded-sm mt-2">
        <div class="flex justify-between p-4 bg-white">
            <div>
                <p class="text-gray-500 mt-1">Fecha: {{ new Date(props.ventas.created_at).toLocaleDateString()}}</p> 
                <p class="text-gray-500 mt-2">Hora: {{ new Date(props.ventas.created_at).toLocaleTimeString() }}</p>
            </div>
            <div class="flex flex-col items-end">
                <p class="text-green-600 font-semibold text-lg">${{ props.ventas.total_venta.toFixed(2) }}</p>
                <UButton
                    class=" text-steak-500 p-0 mt-2 hover:bg-black "
                    variant="ghost"
                    color="warning"
                >
                    Ver Detalles
                </UButton>
            </div>
        </div>
    </section>
</template>