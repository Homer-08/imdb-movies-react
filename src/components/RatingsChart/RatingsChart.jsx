import { useDispatch, useSelector } from "react-redux"
import getSortedMoviesByRatings from "../../utils/ratingsChart/sortMoviesByRatings"
import getMaxLenghtOfMoviesByRatings from "../../utils/ratingsChart/getMaxLenghtOfMoviesByRatings"
import { setTitle, setStyles } from "../../store/slices/toolTipSlice"
import { setMoviesDBForShowing } from "../../store/slices/moviesSlice"
import cl from "./RatingsChart.module.css"
import Loader from "../Loader/Loader"

const RatingsChart = (props) => {
    const { setItemOffset, setSelectedPage } = props

    const { updatedMoviesDB } = useSelector((state) => state.movies)
    const { isDataLoadedFromTMDB } = useSelector((state) => state.isDataLoaded)

    const dispatch = useDispatch()

    const sortedMovies = getSortedMoviesByRatings(updatedMoviesDB)
    const maxLenghtOfMovies = getMaxLenghtOfMoviesByRatings(sortedMovies)

    const onMouseOver = (event) => {
        const rating = event.target.getAttribute("rating")
        const count = event.target.getAttribute("count")

        dispatch(setTitle(`${rating}: ${count} movies`))
    }

    const onMouseMove = (event) => {
        dispatch(
            setStyles({
                display: "block",
                left: event.pageX + "px",
                top: event.pageY - 50 + "px",
            })
        )
    }

    const onClick = (movies) => {
        if (!movies.length) {
            return
        }
        
        dispatch(setMoviesDBForShowing(movies))

        setItemOffset(0)
        setSelectedPage(0)
    }

    if (!isDataLoadedFromTMDB) {
        return <Loader />
    }

    return (
        <div className={cl.ratingsChart}>
            <div className={cl.ratingsChartList}>
                {Object.entries(sortedMovies).map((item) => {
                    let heightOfElement =
                        (item[1].length * 100) / maxLenghtOfMovies

                    return (
                        <div key={item[0]} className={cl.ratingsChartColumn}>
                            <div
                                className={cl.wholeColumn}
                                rating={item[0]}
                                count={item[1].length}
                                onMouseOver={(event) => onMouseOver(event)}
                                onMouseMove={(event) => onMouseMove(event)}
                                onMouseOut={() => {
                                    dispatch(setTitle(""))
                                    dispatch(setStyles({}))
                                }}
                                onClick={() => onClick(item[1])}
                            >
                                <div
                                    className={cl.columnFullness}
                                    style={{ height: `${heightOfElement}%` }}
                                    rating={item[0]}
                                    count={item[1].length}
                                ></div>
                            </div>
                            <div>{item[0]}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RatingsChart
