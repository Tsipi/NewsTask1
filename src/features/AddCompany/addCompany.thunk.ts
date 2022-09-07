import { createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../client'

// This needs to go to Company feature
// you can't have feature containing just one thunk
// features needs to contain everything that they depend on (unless shared with multiple features,
// then they need to gp to shared folders)
// if this is not used then remove it
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
