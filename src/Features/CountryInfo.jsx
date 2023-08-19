import { createSlice } from "@reduxjs/toolkit"

export const AppSlice = createSlice({
    name: "theme",
    initialState: { value :{
        lightTheme: true,
        endpoint: "",
        isCountry: true
    }},

    reducers: {
        toggleTheme: (state) => {
            state.value.lightTheme = !state.value.lightTheme;
        },

        getEndPoint: (state, action) => {
            state.value.endpoint = action.payload;
        },

        isCountryLinkClick: (state, action) => {
            state.value.isCountry = action.payload
        }
    }
})

export const { toggleTheme, getEndPoint, isCountryLinkClick } = AppSlice.actions
export default AppSlice.reducer