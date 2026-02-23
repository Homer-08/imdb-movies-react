import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: "",
    styles: {},
}

const toolTipSlice = createSlice({
    name: "toolTip",
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setStyles: (state, action) => {
            state.styles = action.payload
        },
    },
})

export const { setTitle, setStyles } = toolTipSlice.actions
export default toolTipSlice.reducer
