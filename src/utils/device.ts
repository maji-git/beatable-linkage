import AdbWebCredentialStore from "@yume-chan/adb-credential-web";
import { AdbDaemonWebUsbConnection, AdbDaemonWebUsbDevice, AdbDaemonWebUsbDeviceManager } from "@yume-chan/adb-daemon-webusb";
import { Adb, AdbDaemonTransport } from "@yume-chan/adb";
import { useStore } from "../stores/store";
import { useDeviceStore } from "../stores/device";
import path from 'path-browserify';
import type { IChartFile, ISongModInfo } from "../types";
import { downloadChart } from "./chart";
import { useToast } from "vue-toast-notification";

const CUSTOM_SONG_LOCATION = "storage/emulated/0/Android/data/com.xrgames.beatable/files/CustomSongs"

const Manager: AdbDaemonWebUsbDeviceManager | undefined = AdbDaemonWebUsbDeviceManager.BROWSER;
const CredentialStore: AdbWebCredentialStore = new AdbWebCredentialStore("BeatableWebInstaller");

export async function requestDevice() {
    if (!Manager) {
        alert("Error: No ADB Interface (Your device may be unsupported)")
        return
    }
    const device: AdbDaemonWebUsbDevice | undefined = await Manager.requestDevice();
    return device
}

export async function connectDevice(device: AdbDaemonWebUsbDevice) {
    try {
        return await device.connect();
    } catch (error) {
        throw error;
    }
}

export async function getAdb(device: AdbDaemonWebUsbDevice, connection: AdbDaemonWebUsbConnection) {
    const transport = await AdbDaemonTransport.authenticate({
        serial: device.serial,
        connection,
        credentialStore: CredentialStore,
    });

    return new Adb(transport);
}

export async function initializeDevice() {
    const store = useStore()
    const toast = useToast();
    const deviceStore = useDeviceStore()
    store.currentStatus = "Connect your headset to your computer, then select your headset from the list"
    const device = await requestDevice()

    if (device) {
        console.log(device)
        deviceStore.currentDeviceInfo = device.raw
        try {
            store.currentStatus = "Connecting via USB..."
            console.log("Connecting...")
            const connection = await connectDevice(device)
            store.currentStatus = 'Put on your headset then press "Allow" to continue'
            console.log("Authenticating...")
            const adb = await getAdb(device, connection)
            window.adb = adb

            if (adb) {
                const sync = await adb.sync();
                window.adbsync = sync

                const appFiles = await sync.readdir("storage/emulated/0/Android/data/")
                const beatableInstalled = appFiles.find((e) => e.name == "com.xrgames.beatable") != undefined
                store.currentStatus = ''

                if (beatableInstalled) {
                    console.log("Beatable installed")

                    const beatableFolder = await sync.readdir("storage/emulated/0/Android/data/com.xrgames.beatable/files")

                    console.log(beatableFolder)

                    // Check for custom song folder
                    const customSongFolder = beatableFolder.find((e) => e.name == "CustomSongs") != undefined

                    if (!customSongFolder) {
                        console.log("CustomSongs folder not found, creating one now.")
                        await adb.subprocess.noneProtocol.spawn(`mkdir ${CUSTOM_SONG_LOCATION}`)
                    }

                    deviceStore.deviceConnected = true
                    toast.success("Device connected!")
                    refreshChartsInDevice()
                } else {
                    alert("Beatable is not installed")
                }
            }
        } catch (err) {
            console.error(err)
            if (err instanceof AdbDaemonWebUsbDevice.DeviceBusyError) {
                alert(
                    "The device is already in use by another program. (If you have adb.exe installed, please kill the process first)",
                );
            } else {
                alert(err)
            }

            store.currentStatus = ""
        }
    } else {
        store.currentStatus = ""
    }
}

export async function refreshChartsInDevice() {
    const deviceStore = useDeviceStore()

    if (!window.adbsync) {
        return
    }

    const installedCharts = []
    const customSongs = await window.adbsync.readdir(CUSTOM_SONG_LOCATION)

    for (const song of customSongs) {
        if (song.name.endsWith(".beats")) {
            installedCharts.push({
                fileName: song.name,
                filePath: path.join(CUSTOM_SONG_LOCATION, song.name)
            })
        }
    }
    deviceStore.installedCharts = installedCharts
}

export const deleteChartFile = async (chartFileData: IChartFile) => {
    const toast = useToast();
    await window.adb.rm(chartFileData.filePath)
    console.log(chartFileData.fileName, " Deleted")
    toast.info(`${chartFileData.fileName} deleted.`)
    refreshChartsInDevice()
}

export async function downloadChartToDevice(songData: ISongModInfo) {
    const store = useStore()
    const deviceStore = useDeviceStore()
    const toast = useToast();

    if (!deviceStore.deviceConnected) {
        await initializeDevice()
    }

    if (window.adb && window.adbsync) {
        store.currentStatus = "Downloading chart..."
        const chartFile = await downloadChart(songData)
        store.currentStatus = "Uploading to device..."
        try {
            await window.adbsync.write({
                filename: path.join(CUSTOM_SONG_LOCATION, chartFile.fileName),
                //@ts-expect-error Stream file
                file: chartFile.blob.stream()
            })
            toast.success(`${songData.name} loaded!`)
        } catch(err) {
            alert(err)
        }
        store.currentStatus = ""
    }
}