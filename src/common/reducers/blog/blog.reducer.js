import { createSlice } from '@reduxjs/toolkit';
import { getBlogList } from './blog.action';
import { DEFAULT_PAGINATION, LOADING_STATUS } from 'common/consts/constants.const';
import { mappingValueReducer } from 'common/utils/redux-reducer.util';

const initialState = {
  totalItems: 0,
  itemPerPage: DEFAULT_PAGINATION.itemPerPage,
  list: [],
  page: DEFAULT_PAGINATION.page,
  loading: '',
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogList.pending, (state) => {
        state.loading = LOADING_STATUS.PENDING;
      })
      .addCase(getBlogList.fulfilled, (state, { payload }) => {
        payload.loading = LOADING_STATUS.IDLE;
        state = mappingValueReducer({ state, payload, initialState });
      })
      .addCase(getBlogList.rejected, (state) => {
        state.loading = LOADING_STATUS.IDLE;
      });
  },
});

export const { setBlog } = blogSlice.actions;

export default blogSlice.reducer;
