import {createRouter, createWebHistory} from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import Ventas from '../views/Ventas.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/products',
        name: 'Products',
        component: Products
    },
    {
        path: '/ventas',
        name: 'Ventas',
        component: Ventas
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;