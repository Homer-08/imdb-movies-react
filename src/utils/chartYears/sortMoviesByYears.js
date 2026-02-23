function addYearsInObjectForMoviesDBByYears(db, moviesDBByYears) {
    const currentDate = new Date()

    let minYear = currentDate.getFullYear()
    let currentYear = currentDate.getFullYear()

    db?.forEach((element) => {
        minYear = minYear < element["Year"] ? minYear : element["Year"]
    })

    for (let i = minYear; i <= currentYear; i++) {
        moviesDBByYears[i] = []
    }
}

export default function sortMoviesByYears(db) {

    const moviesDBByYears = {}

    addYearsInObjectForMoviesDBByYears(db, moviesDBByYears)

    let year = null

    db?.forEach((element) => {
        year = element.Year

        moviesDBByYears[year].push(element)
    })

    return moviesDBByYears
}
