<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> |
        <RouterLink to="/review">複習</RouterLink> |
        <RouterLink to="/async">Async 非同步</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
