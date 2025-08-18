import { unzip } from 'unzipit';
import { useStore } from '../stores/store';
import type { ISongModInfo } from '../types';

export function downloadChart(songData: ISongModInfo): Promise<{
    fileName: string
    blob: Blob
}> {
    return new Promise(async (resolve) => {
        const arraybuffer = await fetch(songData.modfile.download.binary_url).then(
            res => res.arrayBuffer()
        );

        let unzipped = await unzip(arraybuffer);
        for (const [key,val] of Object.entries(unzipped.entries)) {
            if (key.endsWith(".beats")) {
                const blob = await val.blob('application/x-binary')
                resolve({
                    fileName: key,
                    blob
                })
                return
            }
        }
        throw "ERR:BEATS_NOT_FOUND"
    })
}

export async function downloadChartIndividual(songData: ISongModInfo) {
    const store = useStore()

    try {
        store.currentStatus = `Downloading ${songData.name}...`
        const chartFile = await downloadChart(songData)
        const url = URL.createObjectURL(chartFile.blob)
        const a = document.createElement("a")
        a.href = url;
        a.download = chartFile.fileName;
        store.currentStatus = ""
        a.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        alert(err)
    }
}