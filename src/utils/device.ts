import AdbWebCredentialStore from "@yume-chan/adb-credential-web";
import { AdbDaemonWebUsbConnection, AdbDaemonWebUsbDevice, AdbDaemonWebUsbDeviceManager } from "@yume-chan/adb-daemon-webusb";
import { Adb, AdbDaemonTransport } from "@yume-chan/adb";
import { useStore } from "../stores/store";
import { useDeviceStore } from "../stores/device";
import path from 'path-browserify';
import type { IChartFile } from "../types";

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
    const deviceStore = useDeviceStore()
    store.currentStatus = "Please select your device from the list"
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
    }
}

export async function refreshChartsInDevice() {
    const deviceStore = useDeviceStore()

    if (!window.adbsync) {
        return
    }

    deviceStore.installedCharts = []
    const customSongs = await window.adbsync.readdir(CUSTOM_SONG_LOCATION)

    for (const song of customSongs) {
        if (song.name.endsWith(".beats")) {
            deviceStore.installedCharts.push({
                fileName: song.name,
                filePath: path.join(CUSTOM_SONG_LOCATION, song.name)
            })
        }
    }
}

export const deleteChartFile = async (chartFileData: IChartFile) => {
  await window.adb.rm(chartFileData.filePath)
  console.log(chartFileData.fileName, " Deleted")
  refreshChartsInDevice()
}
