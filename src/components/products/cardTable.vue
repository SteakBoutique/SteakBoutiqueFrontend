<script setup lang="ts">

    import type { Product } from '../../types/product';

    const props = defineProps<{
        products: Product
    }>()
</script>

<template>
    <section class="flex flex-row justify-between bg-white border-t-2  border-gray-300   p-4">
        <div>
        <h1 class="font-bold text-lg">{{ props.products.name }}</h1>
        <p class="text-gray-600 font-bold mt-2">Stock: {{ props.products.current_stock }} {{ props.products.unit.toLocaleUpperCase() }}</p>
        <p class="text-sm mt-2 ">{{ props.products.description }}</p>
        </div>

        <div class="">
        <p class="text-green-600 font-semibold mt-4">${{ props.products.selling_price.toFixed(2) }}</p>
        </div>
    </section>

</template>