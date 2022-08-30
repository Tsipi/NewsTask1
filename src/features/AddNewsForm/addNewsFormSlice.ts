import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//define the state type for our state
interface AddNewsFormState {
    title: string | null;
    date: string | null;
    url: string | null;
    isValidUrl: boolean;
} 

//assign State type to initial State 
const intialState:AddNewsFormState = { url: null, title: null, date: new Date().toISOString(), isValidUrl: false }

let urlPatternValidation = (URL: string) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
};

export const addNewsFormSlice = createSlice({
    name: "addNewsForm",
    initialState: intialState,    
    reducers: { 
        updateUrl(state, action:PayloadAction<{url:string}>) { 
            state.isValidUrl = urlPatternValidation(action.payload.url)
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