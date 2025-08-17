<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import SoundtrackCard from '../components/SoundtrackCard.vue';

const songListing = ref()
const loadingList = ref(false)

const fetchListing = async() => {
    loadingList.value = true
    const req = await axios.get("/listing", {
        baseURL: import.meta.env.VITE_LISTING_SERVER_URL
    })
    const data = req.data.data

    songListing.value = data
    loadingList.value = false
}

onMounted(() => {
    fetchListing()
})

</script>

<template>
    <!--
    <div class="container p-5">
        <h3 class="text-center mb-4">Browse songs</h3>
        <input type="search" name="" placeholder="Search songs..." class="form-control col-md-5" id="">
    </div>
    -->
    <div class="spinner-border text-primary" role="status" v-if="loadingList"></div>

    <div class="row justify-content-center p-md-0 p-2">
        <SoundtrackCard v-for="song in songListing" :coverArt="song.logo.thumb_320x180" :songTitle="song.name" :songMapper="song.submitted_by" :songData="song"/>
    </div>

</template>