<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';

    // Esta función valida las credenciales creadas previamente por el administrador
    const {error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    router.push('/dashboard');
    
  } catch (error) {
    // Manejo de errores específico para un entorno privado
    if (error.message === 'Invalid login credentials') {
      errorMessage.value = 'Credenciales no reconocidas. Contacta con el administrador si has olvidado tu acceso.';
    } else {
      errorMessage.value = 'Error de conexión. Inténtalo de nuevo más tarde.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      

      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          
          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Correo</label>
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="ejemplo@empresa.com"
              class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-200"
            />
          </div>

          <!-- Contraseña -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Contraseña</label>
            <input 
              v-model="password"
              type="password" 
              required
              placeholder="••••••••"
              class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-200"
            />
          </div>

          <!-- Mensaje de Error -->
          <div v-if="errorMessage" class="flex items-center p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ errorMessage }}
          </div>

          <!-- Botón de Acción -->
          <button 
            type="submit"
            :disabled="loading"
            class="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center"
          >
            <span v-if="loading" class="animate-spin mr-3">
              <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Verificando...' : 'Iniciar Sesión' }}
          </button>

        </form>

        
      </div>
      
     
    </div>
  </div>
</template>