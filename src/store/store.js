import { configureStore } from "@reduxjs/toolkit"
import moviesReducer from "./slices/moviesSlice"
import isDataLoadedReducer from "./slices/isDataLoaded"
import toolTipReducer from "./slices/toolTipSlice"

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        isDataLoaded: isDataLoadedReducer,
        toolTip: toolTipReducer,
    },
})

export default store
