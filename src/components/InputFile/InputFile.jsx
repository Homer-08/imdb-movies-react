import parseFile from "../../utils/parseFile"
import cl from "./InputFile.module.css"
import LocalStorage from "../../services/LocalStorage/LocalStorage.js"
import { useDispatch, useSelector } from "react-redux"
import {
    setIsDataLoadedFromFile,
    setIsDataLoadedFromTMDB,
    setIsDataLoading,
    setIsCreditsLoadedFromTMDB,

} from "../../store/slices/isDataLoaded"
import { useLocation } from "react-router-dom"

const InputFile = (props) => {
    const { id } = props

    const { pathname } = useLocation()
    const dispatch = useDispatch()

    const { isDataLoadedFromFile, isDataLoadedFromTMDB } = useSelector(
        (state) => state.isDataLoaded
    )

    const onChange = (event) => {
        parseFile(
            event.target.files,
            (value) => {
                dispatch(setIsDataLoadedFromFile(value))
            },
            (value) => {
                dispatch(setIsDataLoading(value))
            }
        )
    }

    const onDelete = (event) => {
        event.preventDefault()

        LocalStorage.remove("moviesDB")
        LocalStorage.remove("updatedMoviesDB")
        LocalStorage.remove("actors")

        dispatch(setIsDataLoadedFromFile(false))
        dispatch(setIsDataLoadedFromTMDB(false))
        dispatch(setIsCreditsLoadedFromTMDB(false))
    }

    return (
        <div className={pathname === "/" ? "null" : cl.visuallyHidden}>
            {isDataLoadedFromFile || isDataLoadedFromTMDB ? (
                <input
                    id={id}
                    className={cl.inputFile}
                    type="button"
                    onClick={onDelete}
                />
            ) : (
                <input
                    id={id}
                    className={cl.inputFile}
                    type="file"
                    accept=".csv"
                    onChange={onChange}
                />
            )}
            <label className={cl.inputLabel} htmlFor={id}>
                {isDataLoadedFromFile || isDataLoadedFromTMDB
                    ? "Очистити дані"
                    : "Завантажити файл"}
            </label>
        </div>
    )
}

export default InputFile
