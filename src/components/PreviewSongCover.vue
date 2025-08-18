<script setup lang="ts">
import { IconPlayerPlay, IconPlayerStopFilled } from '@tabler/icons-vue';
import { useStore } from '../stores/store';
import type { ISongModInfo } from '../types';
import { previewSong } from '../utils/song-preview';


defineProps<{
    songData: ISongModInfo
}>()

const store = useStore()
</script>

<template>
    <div class="preview-song" @click="previewSong(songData)">
        <IconPlayerStopFilled v-if="store.songPreview.playingID == songData.name_id" />
        <IconPlayerPlay v-else />
    </div>
</template>