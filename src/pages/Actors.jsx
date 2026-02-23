import { useEffect, useState } from "react"
import LocalStorage from "../services/LocalStorage/LocalStorage"
import ActorCard from "../components/ActorCard/ActorCard"
import Pagination from "../components/Pagination/Pagination"
import ActorList from "../components/ActorList/ActorList"
import MyCircularProgressbar from "../components/MyCircularProgressbar/MyCircularProgressbar"
import { useDispatch, useSelector } from "react-redux"
import {
    setIsCreditsLoading,
    setIsCreditsLoadedFromTMDB,
    setloadActorsPercentage,
} from "../store/slices/isDataLoaded"
import setCredits from "../utils/setCredits"

const Actors = () => {
    const dispatch = useDispatch()

    const {
        isCreditsLoading,
        loadActorsPercentage,
        isDataLoadedFromTMDB,
        isCreditsLoadedFromTMDB,
    } = useSelector((state) => state.isDataLoaded)

    let moviesCredits = LocalStorage.get("actors")

    const [itemOffset, setItemOffset] = useState(0)
    const [selectedPage, setSelectedPage] = useState()

    // useEffect(() => {
    //     const creditsController = new AbortController()
    //     const updatedMoviesDBFromLS = LocalStorage.get("updatedMoviesDB")

    //     if (isDataLoadedFromTMDB && !isCreditsLoadedFromTMDB) {
    //         dispatch(setIsCreditsLoading(true))

    //         setCredits(
    //             updatedMoviesDBFromLS,
    //             creditsController,
    //             (value) => {
    //                 dispatch(setIsCreditsLoadedFromTMDB(value))
    //             },
    //             (value) => {
    //                 dispatch(setIsCreditsLoading(value))
    //             },
    //             (value) => {
    //                 dispatch(setloadActorsPercentage(value))
    //             },
    //         )
    //     }

    //     return () => {
    //         creditsController.abort()
    //         dispatch(setloadActorsPercentage(0))
    //     }
    // }, [])

    return (
        <>
            {/* <main>
                {isCreditsLoading ? (
                    <MyCircularProgressbar
                        value={loadActorsPercentage}
                        text={`${loadActorsPercentage} %`}
                    />
                ) : (
                    <Pagination
                        itemsPerPage={10}
                        itemOffset={itemOffset}
                        items={moviesCredits}
                        setItemOffset={setItemOffset}
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                        //ref={moviesListRef}
                        ComponentForPagination={ActorList}
                    />
                )}
            </main> */}
            <main>
                <h1>Will be soon</h1>
            </main>
        </>
    )
}

export default Actors
