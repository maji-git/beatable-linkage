interface ISongModInfo {
    id: number
    name: string
    name_id: string
    summary: string
    description: string
    stats: {
        downloads_total: number
        downloads_today: number
        ratings_positive: number
    }
    submitted_by: {
        id: number,
        name_id: string,
        username: string,
        avatar: {
            "filename": string,
            "original": string,
            "thumb_50x50": string,
            "thumb_100x100": string
        },
        profile_url: string
    },
    logo: {
        filename: string
        original: string
        thumb_320x180: string
        thumb_640x360: string
        thumb_1280x720: string
    }
    tags: Array<{
        name: string
    }>
    modfile: {
        download: {
            binary_url: string
        }
    }
    profile_url: string
}