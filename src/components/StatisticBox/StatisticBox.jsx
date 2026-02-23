import { useDispatch, useSelector } from "react-redux"
import cl from "./StatisticBox.module.css"
import { setMoviesDBForShowing } from "../../store/slices/moviesSlice"
import getMoviesRuntime from "../../utils/countMoviesRuntime"

const StatisticBox = (props) => {
    const dispatch = useDispatch()

    const { types, setItemOffset, setSelectedPage } = props
    const { updatedMoviesDB } = useSelector((state) => state.movies)
    const { isDataLoadedFromTMDB } = useSelector((state) => state.isDataLoaded)

    const textsForTypes = [
        "Фільм",
        "Короткометражка",
        "Серіал",
        "Серій серіалів",
        "Спец. випуск",
        "Ігри",
        "Муз. кліп",
        "Подкаст",
        "Серій подкастів",
    ]

    const averageRaiting =
        updatedMoviesDB?.reduce((accumulator, movie) => {
            return accumulator + +movie["Your Rating"]
        }, 0) / updatedMoviesDB?.length

    const moviesRuntime = getMoviesRuntime(updatedMoviesDB)

    return (
        <>
            {isDataLoadedFromTMDB && (
                <div className={cl.statistic}>
                    <div
                        className={cl.statisticTypeItem}
                        onClick={() => {
                            dispatch(setMoviesDBForShowing(updatedMoviesDB))
                            setItemOffset(0)
                            setSelectedPage(0)
                        }}
                    >
                        <span>
                            Всього переглянуто: {updatedMoviesDB?.length}
                        </span>
                    </div>
                    <ul className={`${cl.statisticTypesList}`}>
                        {Object.entries(types).map((type, index) => {
                            return type[1].length ? (
                                <li
                                    key={type[0]}
                                    className={cl.statisticTypeItem}
                                    onClick={() => {
                                        dispatch(
                                            setMoviesDBForShowing(
                                                types[type[0]]
                                            )
                                        )
                                        setItemOffset(0)
                                        setSelectedPage(0)
                                    }}
                                >
                                    {textsForTypes[index]} - {type[1].length}
                                </li>
                            ) : null
                        })}
                    </ul>
                    <div>
                        <span>Середня оцінка: {averageRaiting.toFixed(3)}</span>
                    </div>
                    <div>
                        <span>Переглянуто:</span>
                        <ul>
                            <li>днів - {moviesRuntime.days}</li>
                            <li>годин - {moviesRuntime.hours}</li>
                            <li>хвилин - {moviesRuntime.minutes}</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default StatisticBox
