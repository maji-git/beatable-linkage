import mitt from 'mitt'
import { defineStore } from 'pinia'

const emitter = mitt()

export const useEmitter = defineStore('mitt', {
  state: () => {
    return emitter
  },
})

export const useDeviceStore = defineStore('counter', {
  state: () => {
    return {
        adb: null,
        sync: null,
        currentDeviceInfo: null
    }
  },
  actions: {
    increment() {
    },
    installSongFromID() {
        
    }
  },
})

emitter.on("install_song", (id) => {

})