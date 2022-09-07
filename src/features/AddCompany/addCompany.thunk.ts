import { createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../client'

export const getCompany = createAsyncThunk(
    "addNewsForm/getCompany",
    async ({ companyId }: { companyId: string }, thunk) => {
      try {
        const response = await client.get(
          `http://localhost/_profile/${companyId}`,
        );
        return response.data;
      } catch (e) {
        return thunk.rejectWithValue(e);
      }
    }
  );
