import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from './user.action';
import { LOADING_STATUS } from 'common/consts/constants.const';
import { mappingValueReducer } from 'common/utils/redux-reducer.util';

const KEY_SYSTEM = 'SYS_ALL';

const initialState = {
  user_name: '',
  permissions: [],
  loading: '',
  isAdmin: true, // Tạm thời để true, khi đã phân quyền set thành false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = LOADING_STATUS.PENDING;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        payload.loading = LOADING_STATUS.IDLE;
        state = mappingValueReducer({ state, payload, initialState });
        state.isAdmin = payload.permissions.includes(KEY_SYSTEM);
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = LOADING_STATUS.IDLE;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
