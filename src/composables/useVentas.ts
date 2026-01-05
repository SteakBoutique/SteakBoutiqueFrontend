import type { ventas } from '../types/ventas';
import {ref} from 'vue'
import {supabase} from '../lib/supabaseClient.ts'

export function useVentas() {
    const ventas = ref<ventas[]>([])
    const loading = ref(false)
    const error = ref(null)

    async function getVentas(){
        loading.value = true

        const {data, error:fetchError} = await 
        supabase.from('ventas').select('*').range(0, 10)
        loading.value = false

        if(fetchError){
            console.error("Error al cargar los datos")
            return null
        }

        ventas.value = data
        return data 
    }

    return{
        ventas,
        loading,
        error,
        getVentas
    }
}