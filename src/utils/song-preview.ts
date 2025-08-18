import { useStore } from "../stores/store";
import type { ISongModInfo } from "../types";
import { readBeats } from "./beats-reader";
import { downloadChart } from "./chart";

export async function previewSong(songData: ISongModInfo) {
    const { Howl } = await import("howler")

    const store = useStore()

    // If same ID, stop the song
    if (songData.name_id == store.songPreview.playingID && store.songPreview.songPlayer) {
        stopSong()
        return
    }

    if (store.songPreview.songPlayer) {
        stopSong()
    }

    store.songPreview.playingID = songData.name_id
    store.songPreview.playingData = songData

    const song = await downloadChart(songData)
    const beatsBuffer = await song.blob.arrayBuffer()

    const beats = readBeats(beatsBuffer)

    if (songData.name_id != store.songPreview.playingID) {
        return
    }

    if (beats) {
        const audioBlob = new Blob([beats.audioBuffer], { type: 'audio/mp3' });
        const sound = new Howl({
            src: URL.createObjectURL(audioBlob),
            html5: true,
            format: 'mp3',
            volume: 0.5
        });

        store.songPreview.songPlayer = sound

        sound.once('load', function () {
            sound.seek(sound.duration() / 2)
            sound.play()
        })
    }
}

export async function stopSong() {
    const store = useStore()
    if (store.songPreview.songPlayer) {
        store.songPreview.songPlayer.stop()
        store.songPreview.playingID = ""
    }
}