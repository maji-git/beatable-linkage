<script setup lang="ts">
import { RouterView } from 'vue-router';
import WebNavbar from './components/WebNavbar.vue';

</script>

<template>
  <div class="container">
    <WebNavbar class="mb-3"/>
    <RouterView />
  </div>
</template>
