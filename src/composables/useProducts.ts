import {ref} from 'vue'
import {supabase} from '../lib/supabaseClient.ts'
import type { Product } from '../types/product.ts'
export function useProducts() {
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref(null)

    async function getProducts() {
        loading.value = true 

        const {data, error:fetchError} = await supabase.from('productos').select('*')
        loading.value = false

        if(fetchError){
            console.error("Error al cargar los datos")
            return null
        }

        products.value = data
        return data 
        
    }

    return{
        products,
        loading,
        error,
        getProducts
    }
}