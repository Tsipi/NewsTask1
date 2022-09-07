import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsItem {
  url: string;
  title: string;
  date: string;
  id: number;
}

interface ItemsListState {
  items: NewsItem[];
}

const intialState: ItemsListState = {
  items: []
};

export const itemsListSlice = createSlice({
  name: "itemsList",
  initialState: intialState,
  reducers: {
    addNewsItem(state, action: PayloadAction<Omit<NewsItem, "id">>) {
      // INFO: id will be created in backend
      // this is buggy
      const id = state.items.length + 1;
      const item = { ...action.payload, id };
      state.items.push(item);
    },
    deleteNewsItem(state, action: PayloadAction<{ id: number }>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    editNewsItem(
      state,
      action: PayloadAction<{
        id: number;
        url: string;
        title: string;
        date: string;
      }>
    ) {
      const { id, url, title, date } = action.payload;
      //1. Find index of item by its id
      const index = state.items.findIndex((item) => item.id === id);
      //2. Update found news item with new values
      state.items[index] = { id, url, title, date };
    }
  }
});

export const {
  addNewsItem,
  deleteNewsItem,
  editNewsItem
} = itemsListSlice.actions;
