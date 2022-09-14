import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../client";
import { format } from "date-fns";

export const getCompanyNews = createAsyncThunk(
  "company/getCompany",
  async ({ companyId }: { companyId: string }, thunk) => {
    try {
      const response = await client.get(
        `http://localhost/_profile/${companyId}`
      );
      return response.data.profile.news.map((item: any) => ({
        id: item.id,
        title: item.news_summary,
        url: item.link,
        date: item.date,
      }));
    } catch (e) {
      return thunk.rejectWithValue(e);
    }
  }
);

export const deleteNews = createAsyncThunk(
  "company/deleteNews",
  async (
    { companyId, newsId }: { companyId: string; newsId: string },
    thunk
  ) => {
    try {
      await client.delete(`/startups/${companyId}/news/${newsId}`);
    } catch (e) {
      return thunk.rejectWithValue(e);
    }
  }
);

interface EditNewsArgs {
  companyId: string;
  newsId: string;
  title: string;
  date: string;
  url: string;
}

export const editNews = createAsyncThunk(
  "company/editNews",
  async ({ companyId, newsId, title, date, url }: EditNewsArgs, thunk) => {
    const formatedDate = format(new Date(date), "dd/MM/yyyy");
    try {
      await client.post(`/startups/${companyId}/news/${newsId}`, {
        news_summary: title,
        news_url: url,
        news_date: formatedDate,
      });
    } catch (e) {
      return thunk.rejectWithValue(e);
    }
  }
);
