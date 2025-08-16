import { unzip } from 'unzipit';

export function downloadChart(songData: ISongModInfo): Promise<{
    fileName: string
    blob: Blob
}> {
    return new Promise(async (resolve) => {
        const arraybuffer = await fetch(songData.modfile.download.binary_url).then(
            res => res.arrayBuffer()
        );
        console.log(arraybuffer)

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
    try {
        const chartFile = await downloadChart(songData)
        const url = URL.createObjectURL(chartFile.blob)
        const a = document.createElement("a")
        a.href = url;
        a.download = chartFile.fileName;
        a.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        alert(err)
    }
}