<script setup lang="ts">
</script>

<template>
    <nav class="navbar">
      <router-link to="/" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
        <span>Inicio</span>
      </router-link>
      
      <router-link to="/products" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>Productos</span>
      </router-link>
      
      <router-link to="/ventas" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
        <span>Ventas</span>
      </router-link>
    </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 8px;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  color: #666;
  font-size: 12px;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.nav-icon {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}

.nav-link:active {
  transform: scale(0.95);
}

.nav-link.router-link-active {
  color: #b85a3f;
  font-weight: 600;
}

.nav-link.router-link-active .nav-icon {
  stroke-width: 2.5;
}
</style>