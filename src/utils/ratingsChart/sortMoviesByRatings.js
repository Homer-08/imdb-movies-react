function sortByRatings(db) {
    const obj = {}

    for (let i = 1; i <= 10; i++) {
        obj[i] = []
    }

    db?.forEach((element) => {
        obj[element["Your Rating"]].push(element)
        
    })
    
    return obj
}

export default sortByRatings