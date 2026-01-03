<script setup lang="ts">
import { onMounted } from 'vue';
import { useProducts } from '../../composables/useProducts';
import { ref, watch } from 'vue';
import { supabase } from '../../lib/supabaseClient';


const props = defineProps<{
    open: boolean;
    vendedor_id: string;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();




const { products, getProducts } = useProducts()

onMounted(async () => {
    await getProducts()
})

const selectedProduct = ref({
    "producto_id": '',
    "cantidad": 1,
    "precio_unitario": 0,
});

const arrayProducts = ref<typeof selectedProduct.value[]>([])

const getPrecioUnitario = () => {
    const product = products.value.find(p => p.id === selectedProduct.value.producto_id);
    if (product) {
        selectedProduct.value.precio_unitario = product.selling_price;
    } else {
        selectedProduct.value.precio_unitario = 0;
    }
}

const getProductById = (id: string) => {
    return products.value.find(p => p.id === id);
}

const pushProduct = () => {
    arrayProducts.value.push({...selectedProduct.value});
    
    // Limpiar selectedProduct
    selectedProduct.value = {
        "producto_id": '',
        "cantidad": 1,
        "precio_unitario": 0,
    };
}

watch(() => selectedProduct.value.producto_id, () => {
    
    getPrecioUnitario();
});



const calculateTotal = (productos: any, porcentaje: number) => {
    const subtotal = productos.reduce((total: number, product: any) => {
        return total + (product.precio_unitario * product.cantidad);
    }, 0);
    
    const descuentoMonto = (subtotal * porcentaje) / 100;
    const totalConDescuento = subtotal - descuentoMonto;
    
    return totalConDescuento;
}

const ventaData = ref({
    vendedor_id: props.vendedor_id,
    cliente_id: null,
    precio_envio: 0,
    descuento: 0,
    total_venta: 0,
    productos: arrayProducts.value,
});

const submitVenta = async () => {
    try {
        const dataToSend = {
            p_vendedor_id: ventaData.value.vendedor_id,
            p_precio_envio: ventaData.value.precio_envio,
            p_descuento_total: ventaData.value.descuento,
            p_total: calculateTotal(arrayProducts.value, ventaData.value.descuento),
            p_items: arrayProducts.value,
        };

        const { data, error } = await supabase.rpc('registrar_venta', dataToSend);
        if (error) throw error;
        
        console.log("Venta registrada con éxito:", data);
        const toast = useToast();
        toast.add({
            title: 'Éxito',
            description: 'Venta registrada con éxito',
            color: 'success',
            duration: 5000,
        });
        emit('close');

        return { success: true, ventaId: data };
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        return { success: false, error: error };
    }
}

</script>

<template>
    <!-- Modal Ventas Component -->
    <UModal :open="props.open" title="Agregar nueva venta" >
        
        <template #body>
            <UFormField size="xl" label="Elija Producto" class="mt-4">
            <select id="selectedProduct" v-model="selectedProduct.producto_id">
                <option v-for="product in products" :key="product.id" :value="product.id" >
                    {{ product.name }} - {{ product.current_stock }} {{ product.unit }} disponibles
                </option>
            </select>
            </UFormField>
            <UFormField label="Cantidad del Producto" size="xl" class="mt-10">
            <UInput v-model="selectedProduct.cantidad" type="number"   label="Cantidad" />
            </UFormField>
            <p class="text-gray-400 font-bold mt-8">Precio Unitario: ${{ selectedProduct.precio_unitario }}</p>
            <p class="text-gray-400 font-bold">Importe: ${{ selectedProduct.precio_unitario * selectedProduct.cantidad }}</p>

        <UButton :disabled="!selectedProduct.producto_id || selectedProduct.cantidad <= 0" class="mt-4 bg-steak-600 text-white" icon="i-lucide-plus" @click=pushProduct>
            Agregar Producto
        </UButton>
            
        <section class="mt-10 ">
            <h1 class="text-2xl mt-4 mb-5 border-b-2 border-gray-300 pb-2">Costos Adicionales</h1>
            <UFormField label="Costo de envío" description="Costo adicional por envío" >
            <UInput v-model="ventaData.precio_envio" placeholder="$20" type="number" class="mb-4" />
            </UFormField>
            <UFormField label="Descuento" description="Descuento aplicable" >
            <UInput v-model="ventaData.descuento" placeholder="15%" type="number" class="mb-4" />
            </UFormField>
        </section>

        <section class="mt-10 ">
            <h1 class="text-2xl mt-4 mb-5">Resumen de productos</h1>
            <article v-for="product in arrayProducts" :key="product.producto_id" class="border-t-2 border-gray-300 p-2 mb-4 flex justify-between items-center">
                <div>
                <h1 class="font-bold text-2xl">{{ getProductById(product.producto_id)?.name }}</h1>
                <p class="text-lg text-gray-700">{{ product.cantidad }} {{ getProductById(product.producto_id)?.unit }}</p>
                <p>${{ product.precio_unitario }} cada {{ getProductById(product.producto_id)?.unit }}</p>
                <p class="text-lime-700 text-2xl font-bold">${{ product.precio_unitario * product.cantidad }}</p>
                </div>
            </article>

            <div class="border-t-2 border-gray-300 pt-4 flex   flex-col text-right gap-4">
                <div class="flex flex-row justify-between">
                <h1 class="text-xl font-bold">Subtotal:</h1>
                <p class="text-xl font-bold ml-2">
                     ${{ arrayProducts.reduce((total, product) => total + (product.precio_unitario * product.cantidad), 0) }}
                </p>
                </div>
                <div class="flex flex-row justify-between">
                <h1 class="text-3xl font-bold text-steak-600">Total: </h1>
                <p class="text-3xl font-bold text-steak-600 ml-2"> ${{ calculateTotal(arrayProducts, ventaData.descuento) }}</p>
                </div>
            </div>
        </section>

        <!-- <pre>
{{ ventaData }}
        </pre> -->

        </template>



        <template #footer>
            <UButton variant="solid" class="bg-gray-200 text-black border border-gray-300 hover:bg-gray-300" @click="emit('close')">Cancelar</UButton>

            <UButton class="text-white bg-steak-400"  @click="submitVenta()">Guardar</UButton>
        </template>
    </UModal>

</template>

<style scoped>
    select {
        width: auto;
        padding: 0.5rem;
        border: 1px solid #d1d5db; /* Tailwind's gray-300 */
        border-radius: 0.375rem; /* Tailwind's rounded-md */
        background-color: white;
        font-size: 1rem;
    }

    select:focus {
        outline: none;
        border-color: rgb(163, 107, 107); /* Tailwind's blue-500 */
        box-shadow: 0 0 0 3px rgba(144, 91, 91, 0.5); /* Tailwind's blue-500 with opacity */
    }

    select > option {
        border-top: 10px solid #e5e7eb; /* Tailwind's gray-200 */
        padding: 0.5rem;
        font-size: 15px;

    }

    select > option:focus {
        background-color: #f3f4f6; /* Tailwind's gray-100 */
    }
</style>