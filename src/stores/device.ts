import { defineStore } from 'pinia'
import type { IChartFile } from '../types'

export const useDeviceStore = defineStore('device', {
  state: () => {
    return {
      currentDeviceInfo: {} as any,
      deviceConnected: false,
      installedCharts: [] as IChartFile[]
    }
  },
  actions: {
  },
})