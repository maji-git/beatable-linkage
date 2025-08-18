<template>
    <div v-if="songData">
        <div class="st-info-container" :style="{ backgroundImage: `url(${songData.logo.thumb_320x180})` }">
            <div class="soundtrack-info">
                <div :style="{ backgroundImage: `url(${songData.logo.original})` }" class="coverart" alt="">
                    <PreviewSongCover :songData="songData"/>
                </div>
                <div class="song-info p-3">
                    <h3>{{ songData.name }}</h3>
                    <p>mapped by
                        <img :src="songData.submitted_by.avatar.thumb_50x50" class="avatar-img" alt="" height="20"> <a
                            :href="songData.submitted_by.profile_url" target="_blank">{{ songData.submitted_by.username
                            }}</a>
                    </p>
                    <SoundtrackTags :songData="songData" />
                    <div class="mt-3">
                        <button class="btn btn-primary" @click="downloadChartToDevice(songData)">
                            <IconArrowUp /> Upload to your headset
                        </button>
                        <button class="btn btn-outline-primary ms-2" @click="downloadChartIndividual(songData)">
                            <IconDownload /> Download
                        </button>
                        <a class="btn btn-outline-primary ms-2" target="_blank" :href="songData.profile_url">
                            <IconExternalLink />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <SoundtrackStats :songData="songData" />
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                About this chart
            </div>
            <div class="card-body">
                {{ songData.summary }}
                {{ songData.description }}
            </div>
        </div>
    </div>
    <div v-else>
        <div class="spinner-border text-primary" role="status"></div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import SoundtrackStats from '../components/SoundtrackStats.vue';
import { IconArrowUp, IconDownload, IconExternalLink } from '@tabler/icons-vue';
import { downloadChartIndividual } from '../utils/chart';
import SoundtrackTags from '../components/SoundtrackTags.vue';
import type { ISongModInfo } from '../types';
import { downloadChartToDevice } from '../utils/device';
import PreviewSongCover from '../components/PreviewSongCover.vue';

const route = useRoute()
const songData = ref<ISongModInfo>()

onMounted(async () => {
    const req = await axios.get(`/info/${route.params.id}`, {
        baseURL: import.meta.env.VITE_LISTING_SERVER_URL
    })

    songData.value = req.data
})
</script>

<style scoped>
.st-info-container {
    background-position: center;
    background-size: cover;
    overflow: hidden;
    border-radius: 8px;
}

.soundtrack-info {
    background-color: hsla(267, 59%, 8%, 0.8);
    backdrop-filter: blur(14px);
    display: flex;
    width: 100%;
    height: 100%;
}

@media (max-width: 576px) {
    .soundtrack-info {
        display: flex;
        flex-direction: column;
    }
}

.coverart {
    aspect-ratio: 1.5 / 1;
    height: 220px;
    background-position: center;
    background-size: cover;
}
</style>