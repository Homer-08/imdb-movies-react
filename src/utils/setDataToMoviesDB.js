import { options, BASE_URL } from "./variables"
import fetchMultipleUrls from "./fetchMultipleUrls"

async function setData(
    db,
    setIsDataLoadedFromTMDB,
    controller,
    setIsLoading,
    setPercentage
) {
    const arrayForMovies = []
    let arrayForFetchUrls = []
    let dbIndex = 0
    const numberOfRequests = 50
    const clonedData = JSON.parse(JSON.stringify(db))

    for (let i = 0; i < clonedData?.length; i++) {
        let urlWithIMDBId =
            BASE_URL + `/find/${clonedData[i].Const}?external_source=imdb_id`

        arrayForFetchUrls.push(urlWithIMDBId)

        if ((i + 1) % numberOfRequests === 0 || i + 1 === clonedData.length) {
            let fetchedMovies = await fetchMultipleUrls(
                arrayForFetchUrls,
                options,
                controller
            )

            arrayForFetchUrls = []

            if (!fetchedMovies) return

            fetchedMovies.forEach((element) => {
                const movieTMDBId =
                    element.movie_results[0]?.id ??
                    element.tv_results[0]?.id ??
                    null
                
                const isMovie =
                    // eslint-disable-next-line no-constant-binary-expression
                    !!element.movie_results[0]?.id ??
                    !!element.tv_results[0]?.id
                let urlWithTMDBId =
                    BASE_URL +
                    (isMovie ? `/movie/${movieTMDBId}` : `/tv/${movieTMDBId}`)

                arrayForFetchUrls.push(urlWithTMDBId)
            })

            fetchedMovies = await fetchMultipleUrls(
                arrayForFetchUrls,
                options,
                controller
            )

            if (!fetchedMovies) return

            fetchedMovies.forEach((element, index) => {
                clonedData[index + dbIndex]["Original Country"] =
                    element?.origin_country ?? null
                clonedData[index + dbIndex]["Poster Path"] =
                    element?.poster_path ?? element?.poster_path ?? null
                clonedData[index + dbIndex]["TMDB id"] = element?.id ?? null

                arrayForMovies.push(clonedData[index + dbIndex])
            })

            setPercentage(
                ((arrayForMovies.length / clonedData.length) * 100).toFixed(1)
            )

            dbIndex += numberOfRequests
            arrayForFetchUrls = []
        }
    }

    setTimeout(() => {
        localStorage.setItem("updatedMoviesDB", JSON.stringify(arrayForMovies))
        setIsDataLoadedFromTMDB(true)
        setIsLoading(false)
        setPercentage(0)
    }, 1000)
}

export default setData
