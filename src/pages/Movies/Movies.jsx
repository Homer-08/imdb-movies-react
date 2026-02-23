import { useEffect, useState, useRef } from "react"
import LocalStorage from "../../services/LocalStorage/LocalStorage"
import Pagination from "../../components/Pagination/Pagination"
import setData from "../../utils/setDataToMoviesDB"
import Helper from "../../components/Helper/Helper"
import WorldMap from "../../components/WorldMap/WorldMap"
import ToolTip from "../../components/ToolTip/ToolTip"
import { useDispatch, useSelector } from "react-redux"
import {
    setMoviesDB,
    setUpdatedMoviesDB,
    setMoviesDBForShowing,
} from "../../store/slices/moviesSlice"
import {
    setIsDataLoadedFromFile,
    setIsDataLoadedFromTMDB,
    setIsDataLoading,
    setLoadPercentage,
    setIsCreditsLoading,
    setIsCreditsLoadedFromTMDB,
    setloadActorsPercentage,
} from "../../store/slices/isDataLoaded"
import StatisticBox from "../../components/StatisticBox/StatisticBox"
import sortMoviesByTypes from "../../utils/sortMoviesByTypes"
import YearsChart from "../../components/YearsChart/YearsChart"
import cl from "./Movies.module.css"
import RatingsChart from "../../components/RatingsChart/RatingsChart"
import MoviesList from "../../components/MoviesList/MoviesList"
import setCredits from "../../utils/setCredits"
import setTestingData from "../../utils/setTestingData"

const Movies = () => {
    const dispatch = useDispatch()

    const [itemOffset, setItemOffset] = useState(0)
    const [selectedPage, setSelectedPage] = useState()

    const { moviesDB, updatedMoviesDB, moviesDBForShowing } = useSelector(
        (state) => state.movies,
    )
    const {
        isDataLoadedFromFile,
        isDataLoadedFromTMDB,
        isCreditsLoadedFromTMDB,
    } = useSelector((state) => state.isDataLoaded)

    const moviesByTypes = sortMoviesByTypes(LocalStorage.get("updatedMoviesDB"))

    const moviesListRef = useRef()

    useEffect(() => {
        const moviesDBFromLS = LocalStorage.get("moviesDB")
        const updatedMoviesDBFromLS = LocalStorage.get("updatedMoviesDB")
        const actorsFromLS = LocalStorage.get("actors")

        if(!moviesDBFromLS) {
            setTestingData()
        }

        dispatch(setIsDataLoadedFromFile(!!moviesDBFromLS))
        dispatch(setIsDataLoadedFromTMDB(!!updatedMoviesDBFromLS))
        dispatch(setIsCreditsLoadedFromTMDB(!!actorsFromLS))

        dispatch(setMoviesDB(moviesDBFromLS))
        dispatch(setUpdatedMoviesDB(updatedMoviesDBFromLS))

        if (moviesDB || updatedMoviesDB) {
            dispatch(setMoviesDBForShowing(updatedMoviesDB ?? moviesDB))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        //const creditsController = new AbortController()
        const moviesDBFromLS = LocalStorage.get("moviesDB")
        const updatedMoviesDBFromLS = LocalStorage.get("updatedMoviesDB")

        if (isDataLoadedFromFile && !isDataLoadedFromTMDB) {
            dispatch(setIsDataLoading(true))

            setData(
                moviesDBFromLS,
                (value) => {
                    dispatch(setIsDataLoadedFromTMDB(value))
                },
                controller,
                (value) => {
                    dispatch(setIsDataLoading(value))
                },
                (value) => {
                    dispatch(setLoadPercentage(value))
                },
            )
        }

        // if (isDataLoadedFromTMDB && !isCreditsLoadedFromTMDB) {
        //     dispatch(setIsCreditsLoading(true))

        //     setCredits(updatedMoviesDBFromLS, creditsController, 
        //         (value) => {
        //             dispatch(setIsCreditsLoadedFromTMDB(value))
        //         },
        //         (value) => {
        //             dispatch(setIsCreditsLoading(value))
        //         },
        //         (value) => {
        //             dispatch(setloadActorsPercentage(value))
        //         },
        //     )
        // }

        dispatch(setMoviesDB(moviesDBFromLS))
        dispatch(setUpdatedMoviesDB(updatedMoviesDBFromLS))
        dispatch(setMoviesDBForShowing(updatedMoviesDBFromLS ?? moviesDBFromLS))

        return () => {
            controller.abort()
            //creditsController.abort()
        }
    }, [
        dispatch,
        isDataLoadedFromFile,
        isDataLoadedFromTMDB,
        isCreditsLoadedFromTMDB,
    ])

    if (!moviesDBForShowing) {
        return (
            <main>
                <Helper />
            </main>
        )
    }

    return (
        <main className={cl.main}>
            <StatisticBox
                types={moviesByTypes}
                setItemOffset={setItemOffset}
                setSelectedPage={setSelectedPage}
            />
            <WorldMap
                setItemOffset={setItemOffset}
                setSelectedPage={setSelectedPage}
                moviesListRef={moviesListRef}
            />
            <ToolTip />

            <YearsChart
                setItemOffset={setItemOffset}
                setSelectedPage={setSelectedPage}
            />

            <RatingsChart
                setItemOffset={setItemOffset}
                setSelectedPage={setSelectedPage}
            />

            <Pagination
                itemsPerPage={10}
                itemOffset={itemOffset}
                items={moviesDBForShowing}
                setItemOffset={setItemOffset}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                ref={moviesListRef}
                ComponentForPagination={MoviesList}
            />
        </main>
    )
}

export default Movies
