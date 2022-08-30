import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditNewsFormState {
  selectedItemId: number | null;
  title: string | null;
  url: string | null;
  date: string | null;
}

const intialState: EditNewsFormState = {
  selectedItemId: null,
  title: null,
  url: null,
  date: null
};

export const editNewsFormSlice = createSlice({
  name: "editNewsForm",
  initialState: intialState,
  reducers: {
    editNewsForm(state, action: PayloadAction<{ selectedItemId: number }>) {
      state.selectedItemId = action.payload.selectedItemId;
    },
    updateUrl(state, action: PayloadAction<{ url: string }>) {
      state.url = action.payload.url;
    },
    updateTitle(state, action: PayloadAction<{ title: string }>) {
      state.title = action.payload.title;
    },
    updateDate(state, action: PayloadAction<{ date: string }>) {
      state.date = action.payload.date;
    }
  }
});

//extract the actions which are the outputs of create slice the functions = reducers
//Action Creators
export const {
  editNewsForm,
  updateDate,
  updateTitle,
  updateUrl
} = editNewsFormSlice.actions;
