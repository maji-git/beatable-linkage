<template>
    <div class="difficulties">
        <span class="badge me-1" v-for="diff in difficulties"
            :style="{ backgroundColor: `${diffData.colors[diff]}` }">{{ diff }}</span>
    </div>
    <div class="tags">
        <span class="badge bg-secondary me-1" v-for="tag in tagRef">{{ tag }}</span>
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';

const diffData = inject<any>("difficultyData")
const difficulties = ref<string[]>([])
const tagRef = ref<string[]>([])

const props = defineProps<{
    songData: ISongModInfo
}>()

onMounted(() => {
    const tags = props.songData.tags
    console.log(diffData)
    for (const tag of tags) {
        if (diffData.types.includes(tag.name)) {
            difficulties.value.push(tag.name)
        } else {
            tagRef.value.push(tag.name)
        }
    }
})
</script>

<style scoped>
.stats .tabler-icon {
    width: 16px;
}
</style>