<template>
    <div class="stats">
        <VTooltip>
            <div>
                <IconDownload />
                {{ songData.stats.downloads_total }}
            </div>
            <template #popper>Total Downloads</template>
        </VTooltip>
        <VTooltip>
            <div>
                <IconClockDown />
                {{ songData.stats.downloads_today }}
            </div>
            <template #popper>Today's Downloads</template>
        </VTooltip>
        <VTooltip v-if="extraChartData">
            <div>
                <IconMetronome />
                {{ extraChartData.songDetails.bpm }}
            </div>
            <template #popper>BPM</template>
        </VTooltip>
        <VTooltip v-if="extraChartData">
            <div>
                <IconClock />
                {{ formatTime(extraChartData.songDetails.totalLengthInSeconds) }}
            </div>
            <template #popper>Song length</template>
        </VTooltip>
    </div>
</template>

<script setup lang="ts">
import { IconClock, IconClockDown, IconDownload, IconMetronome } from '@tabler/icons-vue';
import type { ISongModInfo } from '../types';
import type { BeatableChartData } from '../utils/beats-reader';
import { formatTime } from '../utils/datetime';

defineProps<{
    songData: ISongModInfo,
    extraChartData?: BeatableChartData
}>()
</script>

<style scoped>
.stats {
    display: flex;
}

.stats > div {
    margin: 8px;
}

.stats .tabler-icon {
    width: 16px;
}
</style>