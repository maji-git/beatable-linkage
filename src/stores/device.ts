import type { Adb, AdbSync } from '@yume-chan/adb'
import { defineStore } from 'pinia'
import { connectDevice, getAdb, requestDevice } from '../utils/device'
import { AdbDaemonWebUsbDevice } from '@yume-chan/adb-daemon-webusb'
import { useStore } from './store'
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