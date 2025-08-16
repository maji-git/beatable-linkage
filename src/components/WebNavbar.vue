<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useStore } from '../stores/device';
const store = useStore()
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mt-3 rounded">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/"><img src="../assets/logo.png" height="34" alt=""></RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/">Charts</RouterLink>
                    </li>
                </ul>
                <div class="d-flex">
                    <button class="btn btn-outline-light" type="submit">Connect your Headset</button>
                </div>
            </div>
        </div>
        <p class="text-center w-100 m-0 status-text" v-if="store.currentStatus">{{ store.currentStatus }}</p>
    </nav>
</template>

<style scoped>
.nav-link.router-link-active {
    color: whitesmoke;
}

.status-text {
    animation: statusIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes statusIn {
    0% { opacity: 0; transform: translateY(-12px); }
    100% { opacity: 1; }
}
</style>