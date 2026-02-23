import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    moviesDB: null,
    updatedMoviesDB: null,
    moviesDBForShowing: null,
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMoviesDB: (state, action) => {
            state.moviesDB = action.payload
        },
        setUpdatedMoviesDB: (state, action) => {
            state.updatedMoviesDB = action.payload
        },
        setMoviesDBForShowing: (state, action) => {
            state.moviesDBForShowing = action.payload
        },
        setMoviesDBForShowingByCountry: (state, action) => {
            state.moviesDBForShowing = state.updatedMoviesDB.filter((movie) => {
                if (movie["Original Country"]?.includes("SU")) {
                    if (action.payload === "RU") return movie
                }

                return movie["Original Country"]?.includes(action.payload)
            })
        },
    },
})

export const { setMoviesDB, setUpdatedMoviesDB, setMoviesDBForShowing, setMoviesDBForShowingByCountry } =
    moviesSlice.actions
export default moviesSlice.reducer
