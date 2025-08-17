<template>
    <div class="stats">
        <div title="Total Downloads">
            <IconDownload />
            {{ songData.stats.downloads_total }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconDownload } from '@tabler/icons-vue';
import type { ISongModInfo } from '../types';

defineProps<{
    songData: ISongModInfo
}>()
</script>

<style scoped>
.stats .tabler-icon {
    width: 16px;
}
</style>