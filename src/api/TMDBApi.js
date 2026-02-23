import { options, BASE_URL } from "../utils/variables"

export async function getMovieByTMDBId(id) {
    try {
        const response = await fetch(BASE_URL + `/movie/${id}`, options)

        const data = await response.json()

        return data
    } catch (e) {
        console.log(e)
    }
}

export async function getTVByTMDBId(id) {
    try {
        const response = await fetch(BASE_URL + `/tv/${id}`, options)

        const data = await response.json()

        return data
    } catch (e) {
        console.log(e)
    }
}

export async function getMovieCreditsByTMDBID(id, isTV, controller) {
    try {
        const response = isTV
            ? await fetch(BASE_URL + `/tv/${id}/credits?language=uk`, {
                  ...options,
                  signal: controller?.signal,
              })
            : await fetch(BASE_URL + `/movie/${id}/credits?language=uk`, {
                  ...options,
                  signal: controller?.signal,
              })

        const data = await response.json()

        return data
    } catch (e) {
        console.log(e)
    }
}
