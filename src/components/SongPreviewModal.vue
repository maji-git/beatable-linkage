<script setup lang="ts">
import { IconPlayerStopFilled } from '@tabler/icons-vue';
import { useStore } from '../stores/store';
import { stopSong } from '../utils/song-preview';

const store = useStore()
</script>

<template>
    <div class="song-preview card p-2" v-if="store.songPreview.playingID">
        <div class="coverart" v-if="store.songPreview.playingData" :style="{backgroundImage: `url(${store.songPreview.playingData.logo.thumb_320x180})`}"></div>
        <button class="btn ms-2" @click="stopSong"><IconPlayerStopFilled/></button>
    </div>
</template>

<style scoped>
.song-preview {
    position: fixed;
    bottom: 16px;
    right: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    animation: songPreviewAppear 0.2s;
}

@keyframes songPreviewAppear {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0);
    }
}

.coverart {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;

    animation: spin 10s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>