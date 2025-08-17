<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useDeviceStore } from '../stores/device';
import { useStore } from '../stores/store';
import { initializeDevice } from '../utils/device';
import { IconCardboards } from '@tabler/icons-vue';
const store = useStore()
const deviceStore = useDeviceStore()
</script>

<template>
    <div class="container fixed-top">
        <nav class="navbar navbar-expand-lg bg-body-tertiary mt-3 rounded">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" to="/"><img src="../assets/logo.png" height="34" alt=""></RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink class="nav-link" aria-current="page" to="/">Charts</RouterLink>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <div v-if="!deviceStore.deviceConnected">
                            <button class="btn btn-outline-primary" @click="initializeDevice()" type="submit">Connect your
                                Headset</button>
                        </div>
                        <RouterLink to="/device" v-if="deviceStore.deviceConnected" class="device-info me-3">
                            <IconCardboards />
                            <div class="ms-3">
                                <p class="sub">Connected Device</p>
                                <p class="dname">{{ deviceStore.currentDeviceInfo.productName }}</p>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <p class="text-center w-100 m-0 status-text" v-if="store.currentStatus">{{ store.currentStatus }}</p>
        </nav>
    </div>
</template>

<style scoped>
.nav-link.router-link-active {
    color: whitesmoke;
}

.status-text {
    animation: statusIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes statusIn {
    0% {
        opacity: 0;
        transform: translateY(-12px);
    }

    100% {
        opacity: 1;
    }
}

.device-info {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: whitesmoke;
}

.device-info p {
    margin: -4px;
}

.device-info .sub {
    font-size: 12px;
    text-transform: uppercase;
    opacity: 0.8;
}

.device-info .dname {
    font-size: 16px;
}
</style>