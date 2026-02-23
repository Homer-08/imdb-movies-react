import Papa from "papaparse"
import LocalStorage from "../services/LocalStorage/LocalStorage"

function parseFile(file, setIsDataLoadedFromFile, setIsLoading) {
    Papa.parse(file[0], {
        header: false,
        skipEmptyLines: true,
        complete: (result) => {
            const jsonObj = []
            let headers = result.data[0]

            headers.push("Original Country")
            headers.push("Poster Path")
            headers.push("TMDB id")

            for (let i = 1; i < result.data.length; i++) {
                const data = result.data[i]
                let obj = {}

                for (let j = 0; j < result.data[0].length - 1; j++) {
                    obj[headers[j]] = data[j]
                    obj["Original Country"] = null
                    obj["Poster Path"] = null
                    obj["TMDB id"] = null
                }

                jsonObj.push(obj)
            }

            LocalStorage.set("moviesDB", jsonObj)

            setIsDataLoadedFromFile(true)
            setIsLoading(true)
        },
        error: (error) => {
            console.error("Error parsing CSV:", error)
        },
    })
}

export default parseFile
