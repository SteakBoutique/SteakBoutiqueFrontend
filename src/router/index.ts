import {createRouter, createWebHistory} from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import Ventas from '../views/Ventas.vue';
import { supabase } from '../lib/supabaseClient';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
    },
    {
        path: '/ventas',
        name: 'Ventas',
        component: Ventas
    ,    meta: { requiresAuth: true}
    }
]



const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
  // 1. Obtenemos la sesión actual directamente de Supabase
  const { data: { session } } = await supabase.auth.getSession()
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 2. Lógica de redirección
  if (requiresAuth && !session) {
    // Si la ruta requiere auth y NO hay sesión, mandamos al login
    next({ name: 'Login' })
  } else if (to.name === 'Login' && session) {
    // Si el usuario ya está logueado e intenta ir al login, lo mandamos al dashboar
    next({ name: 'Dashboard' })
  } else {
    // En cualquier otro caso, permitimos el paso
    next()
  }
})

export default router;