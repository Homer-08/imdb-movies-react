function getMaxLenghtOfMoviesByRatings(db) {
    let ratingsAmount = 0

    for (let key in db) {
        ratingsAmount = ratingsAmount < db[key].length ? db[key].length : ratingsAmount
    }

    return ratingsAmount
}

export default getMaxLenghtOfMoviesByRatings