<script setup lang="ts">
import { RouterLink } from 'vue-router';

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
    </nav>
</template>

<style scoped>
.nav-link.router-link-active {
    color: whitesmoke;
}
</style>