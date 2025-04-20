import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Routes from './Routes';
import { store } from 'reduxApp/store';
import { getUserInfo } from 'common/reducers/user/user.action';

store.dispatch(getUserInfo());
const router = createBrowserRouter(createRoutesFromElements(Routes()));
function AppRouter() {
  return (
    <React.Suspense fallback={null}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default AppRouter;
