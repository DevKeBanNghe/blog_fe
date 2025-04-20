import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'common/utils';
export const getUserInfo = createAsyncThunk('users/fetchByIdStatus', async () => {
  const { data } = await api.get('/users/info');
  return data;
});
