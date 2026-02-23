export default function getMaxLenghtOfMoviesByYears(db) {
    let year = 0

    for (let key in db) {
        year = year < db[key].length ? db[key].length : year
    }

    return year
}
