import { getMovieCreditsByTMDBID } from "../api/TMDBApi"
import LocalStorage from "../services/LocalStorage/LocalStorage"

async function setCredits(
    db,
    controller,
    setIsCreditsLoadedFromTMDB,
    setIsCreditsLoading,
    setActorsPercentage,
) {
    const moviesCreditsWithActors = []    
    const clonedData = JSON.parse(JSON.stringify(db))

    for (let i = 0; i < db?.length; i++) {
        let isTV =
            db[i]["Title Type"] === "TV Series" ||
            db[i]["Title Type"] === "TV Mini Series"
                ? true
                : false
        let movieOriginalTitle = db[i]["Original Title"]

        let movieCredits = await getMovieCreditsByTMDBID(
            db[i]["TMDB id"],
            isTV,
            controller,
        )
        console.log(i, movieOriginalTitle)

        for (let j = 0; j < movieCredits.cast?.length; j++) {
            let { gender, id, name, original_name, profile_path } =
                movieCredits.cast[j]

            let actorObj = {
                id,
                original_name,
                name,
                gender,
                profile_path,
                movies: [movieOriginalTitle],
            }

            const isInArray = moviesCreditsWithActors.filter((item) => {
                return movieCredits.cast[j]?.id === item?.id
            })

            //console.log(!!isInArray.length)

            if (!isInArray.length) {
                moviesCreditsWithActors.push(actorObj)
            } else {
                moviesCreditsWithActors.map((actor) => {
                    //console.log(actor)

                    if (actor.id === id) {
                        actor.movies.push(movieOriginalTitle)
                    }
                })
            }
        }

        setActorsPercentage(
            ((i / clonedData.length) * 100).toFixed(1),
        )
    }

    // let findDuplicates = moviesCreditsWithActors.filter(
    //     (item, index) => moviesCreditsWithActors.indexOf(item) !== index,
    // )

    //console.log(findDuplicates);
    console.log(moviesCreditsWithActors)

    moviesCreditsWithActors.sort((a, b) => b.movies.length - a.movies.length)

    let filteredActors = moviesCreditsWithActors.filter(
        (actor) => actor.movies.length > 4,
    )

    LocalStorage.set("actors", filteredActors)

    setIsCreditsLoadedFromTMDB(true)
    setIsCreditsLoading(false)
    setActorsPercentage(0)
}

export default setCredits
