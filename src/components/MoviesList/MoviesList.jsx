import React from "react"
import MovieItem from "../MovieItem/MovieItem"
import cl from "./MoviesList.module.css"

const MoviesList = React.forwardRef((props, ref) => {
    const { items: movies, itemOffset } = props

    return (
        <>
            <ul className={cl.moviesList} ref={ref}>
                {movies?.map((movie, index) => (
                    <MovieItem
                        key={movie.Const}
                        index={index + itemOffset + 1}
                        {...movie}
                    />
                ))}
            </ul>
        </>
    )
})

export default MoviesList
