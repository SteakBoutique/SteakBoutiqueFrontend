<script setup lang="ts">
</script>

<template>
    <nav>
      <router-link to="/home">Inicio</router-link> 
      <router-link to="/products">Productos</router-link>
      <router-link to="/ventas">Ventas</router-link>
    </nav>
</template>

<style scoped>
nav {
  padding: 20px;
  background: #f0f0f0;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: bold;
  color: #df602a;
}
</style>