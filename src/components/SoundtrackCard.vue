<template>
    <div class="st-card-container col-md-5 p-0 m-2" :style="{ 'background-image': `url(${coverArt})` }">
        <div class="soundtrack-card">
            <div class="coverart" :style="{ 'background-image': `url(${coverArt})` }">
                <PreviewSongCover :songData="songData" />
            </div>

            <RouterLink :to="`/song/${songData.name_id}`" class="contents">
                <div class="song-metadata">
                    <p class="song-title">{{ songTitle }}</p>
                    <p>mapped by <a :href="songMapper.profile_url">{{ songMapper.username }}</a></p>
                    <SoundtrackTags :songData="songData" />
                </div>

                <div>
                    <SoundtrackStats :songData="songData" />
                </div>
            </RouterLink>
            <div class="buttons chart-options">
                <VTooltip placement="right-start">
                    <button class="btn" @click="downloadChartToDevice(songData)">
                        <IconArrowUp />
                    </button>
                    <template #popper>Upload to headset</template>
                </VTooltip>
                <VTooltip placement="right-start">
                    <button class="btn" @click="downloadChartIndividual(songData)">
                        <IconDownload />
                    </button>
                    <template #popper>Download</template>
                </VTooltip>
                <VTooltip placement="right-start">
                    <a class="btn" target="_blank" :href="songData.profile_url">
                        <IconExternalLink />
                    </a>
                    <template #popper>View on mod.io</template>
                </VTooltip>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconArrowUp, IconDownload, IconExternalLink } from '@tabler/icons-vue';
import SoundtrackStats from './SoundtrackStats.vue';
import SoundtrackTags from './SoundtrackTags.vue';
import { downloadChartIndividual } from '../utils/chart';
import { downloadChartToDevice } from '../utils/device';
import type { ISongModInfo } from '../types';
import PreviewSongCover from './PreviewSongCover.vue';

defineProps<{
    coverArt: string,
    songTitle: string
    songMapper: {
        profile_url: string,
        username: string
    },
    songData: ISongModInfo
}>()
</script>

<style scoped>
.st-card-container {
    background-color: hsl(0, 0%, 15%);
    border-radius: 8px;
    overflow: hidden;
    background-position: center;
    background-size: cover;
}

.soundtrack-card {
    background-color: hsla(267, 59%, 8%, 0.8);
    backdrop-filter: blur(14px);
    width: 100%;
    height: 100%;
    display: flex;
}

.coverart {
    width: 140px;
    height: 100%;
    aspect-ratio: 1 / 1;
    background-position: center;
    background-size: cover;
}

.contents {
    padding: 16px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    width: 1px;
    color: whitesmoke;
    text-decoration: none;
}

.song-metadata {
    display: inline-block;
    align-items: baseline;
    position: relative;
}

.contents p {
    margin: 0;
    font-size: 14px;
}

.contents .song-title {
    display: block;
    font-size: 18px;
    font-weight: 500;
    max-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: whitesmoke;
    text-decoration: none;
}

.chart-options {
    display: flex;
    flex-direction: column;
    padding: 8px;
}

.chart-options .btn {
    padding: 4px;
    width: 36px;
    height: 36px;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 2px;
}

.chart-options .btn .tabler-icon {
    width: 16px;
}
</style>