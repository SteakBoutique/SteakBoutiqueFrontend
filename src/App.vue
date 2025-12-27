<script setup>
  import Navbar from './components/Navbar.vue';
  import { onMounted } from 'vue';
  import { supabase } from './lib/supabaseClient';
  import {useAuthStore} from './stores/auth';

  const authStore = useAuthStore()

onMounted(() => {
  // 1. Cargar sesión actual al refrescar pantalla
  authStore.fetchUser()

  // 2. Escuchar cambios (login, logout, token refrescado)
  supabase.auth.onAuthStateChange((_event, session) => {
    authStore.session = session
    authStore.user = session?.user || null
  })
})


</script>

<template>
  <div class="app-container">
    
    <main class="main-content">
      <router-view />
    </main>
    <Navbar />
  </div>
</template>

<style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100dvh; /* Dynamic viewport height (mejor para móviles) */
    width: 100%;
    overflow: hidden;
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 70px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    -webkit-overflow-scrolling: touch; /* Smooth scroll en iOS */
  }

  /* Prevenir que el contenido se oculte bajo la notch */
  @supports (padding: max(0px)) {
    .main-content {
      padding-left: max(16px, env(safe-area-inset-left));
      padding-right: max(16px, env(safe-area-inset-right));
      padding-top: max(16px, env(safe-area-inset-top));
      padding-bottom: max(70px, calc(70px + env(safe-area-inset-bottom)));
    }
  }
</style>
