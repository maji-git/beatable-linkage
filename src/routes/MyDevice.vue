<script setup lang="ts">
import { onMounted } from 'vue';
import { useDeviceStore } from '../stores/device';
import { deleteChartFile, initializeDevice, refreshChartsInDevice } from '../utils/device';
import { IconMusic } from '@tabler/icons-vue';

const deviceStore = useDeviceStore()

onMounted(() => {
    refreshChartsInDevice()
})

const connectDevice = () => {
    initializeDevice()
}
</script>

<template>
    <div v-if="deviceStore.deviceConnected">
        <hr>
        <h3>Installed Soundtracks</h3>

        <div class="card soundtrack-card mb-1" v-for="f in deviceStore.installedCharts">
            <div class="card-body">
                <p>
                    <IconMusic class="me-1" stroke-width="1.5" /> {{ f.fileName }}
                </p> <button class="btn btn-danger" @click="deleteChartFile(f)">Delete</button>
            </div>
        </div>

        <p class="text-muted" v-if="deviceStore.installedCharts.length == 0">No custom songs installed -w-</p>

        <hr>
        </hr>
    </div>

    <div v-else class="text-center">
        <p>Get started by connecting your device!</p>
        <button class="btn btn-primary" @click="connectDevice">Connect your device</button>
    </div>
</template>

<style scoped>
.soundtrack-card .card-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.soundtrack-card .card-body p {
    margin: 0;
}
</style>