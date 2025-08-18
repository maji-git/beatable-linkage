<script setup lang="ts">
import { RouterView } from 'vue-router';
import WebNavbar from './components/WebNavbar.vue';
import Footer from './components/Footer.vue';
import SongPreviewModal from './components/SongPreviewModal.vue';
</script>

<template>
  <div class="container">
    <WebNavbar/>
    <div class="main">
      <RouterView />
      <Footer></Footer>
    </div>
    <SongPreviewModal/>
  </div>
</template>
