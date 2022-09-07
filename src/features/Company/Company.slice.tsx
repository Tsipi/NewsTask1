import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCompanyNews } from './Company.thunks'

interface NewsItem {
  url: string;
  title: string;
  date: string;
  id: number;
}

interface ItemsListState {
  items: NewsItem[],
  isLoading: boolean
}

const intialState: ItemsListState = {
  items: [], isLoading: false
};

export const companyNewsSlice = createSlice({
  name: "companyNews",
  initialState: intialState,
  reducers: {
    deleteNewsItem(state, action: PayloadAction<{ id: number }>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCompanyNews.fulfilled, (state, action: PayloadAction<NewsItem[]>) => {
      state.isLoading = false
      state.items = action.payload     
    })    
    .addCase(getCompanyNews.pending, (state) => {
      state.isLoading = true
    })
  }
});
