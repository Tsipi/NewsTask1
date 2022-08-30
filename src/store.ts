import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { itemsListSlice } from "./components/ItemsList/itemsListSlice";
import { addNewsFormSlice } from "./features/AddNewsForm/addNewsFormSlice";
import { editNewsFormSlice } from "./features/EditNewsForm/editNewsFormSlice";

type PopupType = "new" | "edit";

type PopupState = { type: PopupType | null };

const initialState: PopupState = { type: null };

const popupSlice = createSlice({
  name: "popupSlice",
  initialState,
  reducers: {
    openPopup(state: PopupState, action: PayloadAction<{ popup: PopupType }>) {
      state.type = action.payload.popup;
    },
    closePopup(state: PopupState) {
      state.type = null;
    }
  }
});

export const { openPopup, closePopup } = popupSlice.actions;

//Connect/configure by connecting the slices reduces to the root reducer
export const store = configureStore({
  reducer: {
    itemsList: itemsListSlice.reducer,
    addNewsForm: addNewsFormSlice.reducer,
    editNewsForm: editNewsFormSlice.reducer,
    popup: popupSlice.reducer
  }
});

export type State = ReturnType<typeof store.getState>;
