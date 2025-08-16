import mitt from 'mitt'
import { defineStore } from 'pinia'

const emitter = mitt()

export const useEmitter = defineStore('mitt', {
  state: () => {
    return emitter
  },
})


export const useStore = defineStore('counter', {
  state: () => {
    return {
        currentStatus: ""
    }
  },
  actions: {
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