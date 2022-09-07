import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../../client'
interface Payload {
    title: string,
    date: string,
    url: string,
    companyId: string,
}

export const postNews = createAsyncThunk(
  "addNewsForm/postNews",
  async ({ companyId, date, title, url }: Payload, thunk) => {
    try {
        const response = await client.post(
            `/startups/${companyId}/news`,
            {
                "news_summary": title,
                "news_date": "06/09/2022",
                "news_url": url
            },
        )
        return thunk.fulfillWithValue(response)
    } catch(e) {
      return thunk.rejectWithValue(e)
    }
  }
);


