import { useDispatch, useSelector } from "react-redux"
import { setMoviesDBForShowing } from "../../store/slices/moviesSlice"
import cl from "./YearsChart.module.css"
import { setTitle, setStyles } from "../../store/slices/toolTipSlice"
import getMaxLenghtOfMoviesByYears from "../../utils/chartYears/getMaxLenghtOfMoviesByYears"
import sortMoviesByYears from "../../utils/chartYears/sortMoviesByYears"
import Loader from "../Loader/Loader"

const YearsChart = (props) => {
    const { setItemOffset, setSelectedPage } = props

    const { updatedMoviesDB } = useSelector((state) => state.movies)
    const { isDataLoadedFromTMDB } = useSelector((state) => state.isDataLoaded)
    const dispatch = useDispatch()

    const moviesDBByYears = sortMoviesByYears(updatedMoviesDB)
    let maxLenghtOfMoviesByYears = getMaxLenghtOfMoviesByYears(moviesDBByYears)

    const onMouseOver = (event) => {
        const year = event.target.getAttribute("year")
        const count = event.target.getAttribute("count")

        dispatch(setTitle(`${year}: ${count} movies`))
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

    const getYearText = (index, year) => {
        // if (index == 0) {
        //     return <div className={cl.columnTitle}>{year}</div>
        // }

        if (year % 10 === 0) {
            return <div key={year} className={cl.year} >{year}</div>
        }
        return <div key={year} className={cl.year} >{}</div>
    }

    if (!isDataLoadedFromTMDB) {
        return <Loader />
    }

    return (
        <div className={cl.yearsChart}>
            <h2 className={cl.yearsChartTitle}>Ratings by Years</h2>
            <div className={cl.yearsChartList}>
                {Object.entries(moviesDBByYears).map((item) => {
                    let heightOfElement =
                        (item[1].length * 100) / maxLenghtOfMoviesByYears

                    return (
                        <div key={item[0]} className={cl.test}>
                            <div
                                className={cl.yearsChartColumn}
                                year={item[0]}
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
                                    year={item[0]}
                                    count={item[1].length}
                                    style={{ height: `${heightOfElement}%` }}
                                ></div>
                            </div>
                            {/* {getYearText(index, item[0])} */}
                        </div>
                    )
                })}
            </div>
            <div className={cl.years}>
                {Object.entries(moviesDBByYears).map((item, index) => {
                    return getYearText(index, item[0])
                })}
            </div>
        </div>
    )
}

export default YearsChart
