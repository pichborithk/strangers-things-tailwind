import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import store from './app/store';
import {
  EditPost,
  ErrorPage,
  NewPost,
  PostMessages,
  Profile,
  Root,
  SignIn,
  SignUp,
  ViewPost,
} from './router';
import Home from './router/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: 'register', element: <SignUp /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'profile', element: <Profile /> },
      { path: 'new', element: <NewPost /> },
      {
        path: ':id',
        element: <ViewPost />,
        children: [
          { index: true, element: <PostMessages /> },
          { path: 'edit', element: <EditPost /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
