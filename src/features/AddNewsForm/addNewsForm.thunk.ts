import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../client";
import { format } from "date-fns";
interface Payload {
  title: string;
  date: string;
  url: string;
  companyId: string;
}

export const postNews = createAsyncThunk(
  "addNewsForm/postNews",
  async ({ companyId, date, title, url }: Payload, thunk) => {
    const formatedDate = format(new Date(date), "dd/MM/yyyy");
    try {
      const response = await client.post(`/startups/${companyId}/news`, {
        news_summary: title,
        news_date: formatedDate,
        news_url: url,
      });
      return thunk.fulfillWithValue(response);
    } catch (e) {
      return thunk.rejectWithValue(e);
    }
  }
);
