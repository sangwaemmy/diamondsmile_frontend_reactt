import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name:"none",
        surname: "none",
        age: 0,
        date: "01/01/2000",
        fullData: []
    },
    reducers: {
        chooseName: (state,action) => { state.name = action.payload },
        chooseSurname: (state,action) => { state.surname = action.payload },
        chooseAge: (state,action) => { state.age = action.payload },
        chooseDate: (state,action) => { state.date = action.payload },
        SubmitAll: (state,action) => {state.fullData = [...state.fullData,action.payload]}
    }
})

export const reducer = rootSlice.reducer;

export const {chooseName,chooseSurname,chooseAge,chooseDate,SubmitAll} = rootSlice.actions;