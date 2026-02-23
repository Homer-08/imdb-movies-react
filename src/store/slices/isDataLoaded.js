import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isDataLoadedFromFile: false,
    isDataLoadedFromTMDB: false,
    isDataLoading: false,
    isCreditsLoadedFromTMDB: false,
    isCreditsLoading: false,
    loadPercentage: 0,
    loadActorsPercentage: 0,
}

const isDataLoaded = createSlice({
    name: "isDataLoaded",
    initialState,
    reducers: {
        setIsDataLoadedFromFile: (state, action) => {
            state.isDataLoadedFromFile = action.payload
        },
        setIsDataLoadedFromTMDB: (state, action) => {
            state.isDataLoadedFromTMDB = action.payload
        },
        setLoadPercentage: (state, action) => {
            state.loadPercentage = action.payload
        },
        setIsDataLoading: (state, action) => {
            state.isDataLoading = action.payload
        },
        setIsCreditsLoadedFromTMDB: (state, action) => {
            state.isCreditsLoadedFromTMDB = action.payload
        },
        setIsCreditsLoading: (state, action) => {
            state.isCreditsLoading = action.payload
        },
        setloadActorsPercentage: (state, action) => {
            state.loadActorsPercentage = action.payload
        },
    },
})

export const {
    setIsDataLoadedFromFile,
    setIsDataLoadedFromTMDB,
    setLoadPercentage,
    setIsDataLoading,
    setIsCreditsLoadedFromTMDB,
    setIsCreditsLoading,
    setloadActorsPercentage,
} = isDataLoaded.actions
export default isDataLoaded.reducer
