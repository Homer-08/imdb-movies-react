import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import { getMovieByTMDBId, getTVByTMDBId } from "../../api/TMDBApi"
import cl from "./MoviePage.module.css"

const MoviePage = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const navagate = useNavigate()

    const [movie, setMovie] = useState(null)

    const isTV = state.type === "TV Series" || state.type === "TV Mini Series" ? true : false

    useEffect(() => {
        async function fetchMovie() {
            const data = isTV
                ? await getTVByTMDBId(id)
                : await getMovieByTMDBId(id)

            setMovie(data)
        }

        fetchMovie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!movie) {
        return <Loader />
    }

    return (
        <>
            <main>
                <button onClick={() => navagate(-1)} className={cl.backBtn}>
                    Back
                </button>
                <div>{movie.original_name ?? movie.title}</div>
            </main>
        </>
    )
}

export default MoviePage
