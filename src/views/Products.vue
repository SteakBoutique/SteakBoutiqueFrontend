<script setup lang="ts">
import { onMounted } from 'vue';
import { useProducts } from '../composables/useProducts';
import CardTable from '../components/products/cardTable.vue';

const { getProducts, products, loading, error } = useProducts()

onMounted(async () => {
    await getProducts()
    console.log(products.value)
})
</script>

<template>
    <div class="pb-20">
        <!-- Header -->
        <header class="w-full border-b-2 border-steak-900 bg-white sticky top-0 z-10">
            <h1 class="text-steak-600 text-2xl font-bold p-4">PRODUCTOS</h1>
        </header>
       

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center h-96">
            <p class="text-steak-600 text-lg">Cargando productos...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex items-center justify-center h-96">
            <p class="text-red-600 text-lg">Error al cargar productos</p>
        </div>

        <div v-else-if="products.length > 0" class="mt-5 grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
            
            <CardTable
                v-for="product in products"
                :key="product.id"
                :products="product"
            />

                
            
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center h-96">
            <p class="text-steak-600 text-lg">No hay productos disponibles</p>
        </div>
    </div>
</template>

<style scoped>
    
</style>