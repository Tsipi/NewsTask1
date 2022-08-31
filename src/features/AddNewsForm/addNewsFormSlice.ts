import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//define the state type for our state
interface AddNewsFormState {
    title: string | null;
    date: string | null;
    url: string | null;
} 

//assign State type to initial State 
const intialState:AddNewsFormState = { url: null, title: null, date: new Date().toISOString() }

export const addNewsFormSlice = createSlice({
    name: "addNewsForm",
    initialState: intialState,    
    reducers: { 
        updateUrl(state, action:PayloadAction<{url:string}>) { 
            state.url = action.payload.url
        },
        updateTitle(state, action:PayloadAction<{title:string}>) { 
            state.title = action.payload.title
        },
        updateDate(state, action:PayloadAction<{date:string}>) { 
            state.date = action.payload.date
        }
    }
});

//extract the actions which are the outputs of create slice the functions = reducers 
//Action Creators
export const {updateUrl, updateTitle, updateDate} = addNewsFormSlice.actions;