<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> |
        <RouterLink to="/review">複習</RouterLink> |
        <RouterLink to="/async">Async 非同步</RouterLink> |
        <RouterLink to="/todo">Todo 串接 API</RouterLink> |
        <RouterLink to="/week2">Week2</RouterLink> |
        <RouterLink to="/week2work">Week2Work</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
