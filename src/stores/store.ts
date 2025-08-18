import mitt from 'mitt'
import { defineStore } from 'pinia'
import type { ISongModInfo } from '../types'
const emitter = mitt()

export const useEmitter = defineStore('mitt', {
  state: () => {
    return emitter
  },
})


export const useStore = defineStore('store', {
  state: () => {
    return {
      currentStatus: "",
      songPreview: {
        songPlayer: null as Howl | null,
        playingID: "",
        playingData: null as ISongModInfo | null
      }
    }
  },
  actions: {
  },
})


