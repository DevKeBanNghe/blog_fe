import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBlogListForUser } from 'pages/User/Blog/service';

export const getBlogList = createAsyncThunk('blogs/fetchList', async (params = {}) => {
  const { data, errors } = await getBlogListForUser(params);
  if (errors) throw new Error(errors.toString());
  return data;
});
