function countMovies(db) {
    const amountOfMovies = {}

    db?.forEach((element) => {
        if (element["Original Country"]?.length > 1) {
            element["Original Country"].forEach((element) => {
                amountOfMovies[element] === undefined
                    ? (amountOfMovies[element] = 1)
                    : (amountOfMovies[element] += 1)
            })
        } else {
            amountOfMovies[element["Original Country"]] === undefined
                ? (amountOfMovies[element["Original Country"]] = 1)
                : (amountOfMovies[element["Original Country"]] += 1)
        }
    })

    amountOfMovies["RU"] += amountOfMovies["SU"]
    delete amountOfMovies["SU"]

    return amountOfMovies
}

export default countMovies
