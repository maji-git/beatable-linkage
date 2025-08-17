import mitt from 'mitt'
import { defineStore } from 'pinia'
const emitter = mitt()

export const useEmitter = defineStore('mitt', {
  state: () => {
    return emitter
  },
})


export const useStore = defineStore('store', {
  state: () => {
    return {
      currentStatus: ""
    }
  },
  actions: {
  },
})


