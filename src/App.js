import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const EditEventPage = lazy(() => import('./pages/EditEvent'));
const ErrorPage = lazy(() => import('./pages/Error'));
const EventDetailPage = lazy(() => import('./pages/EventDetail'));
const EventsRootLayout = lazy(() => import('./pages/EventsRoot'));
const HomePage = lazy(() => import('./pages/Home'));
const NewEventPage = lazy(() => import('./pages/NewEvent'));
const RootLayout = lazy(() => import('./pages/Root'));
const AuthenticationPage = lazy(() => import('./pages/Authentication'));
const Favourite = lazy(() => import('./pages/Favourite'));
const EventsPage = lazy(() => import('./pages/Events'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    id: 'root',
    loader: () => import('./util/authToken').then((module) => module.tokenLoader()),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: () => import('./pages/Events').then((module) => module.loader()),
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: (meta) => import('./pages/EventDetail').then((module) => module.loader(meta)),
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: (meta) => import('./pages/EventDetail').then((module) => module.action(meta)),
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: (meta) => import('./components/EventForm').then((module) => module.action(meta)),
                loader: () => import('./util/authToken').then((module) => module.checkAuthToken())
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: (meta) => import('./components/EventForm').then((module) => module.action(meta)),
            loader: () => import('./util/authToken').then((module) => module.checkAuthToken())
          }
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: (meta) => import('./pages/Authentication').then((module) => module.action(meta)),
      },
      {
        path: 'favourite',
        element: <Favourite />,
      },
      {
        path: 'logout',
        action: () => import('./pages/Logout').then((module) => module.action()),
      }
    ],
  },
]);

function App() {
  return <Suspense fallback={<p>Loading...</p>}>
    <RouterProvider router={router} />
  </Suspense>;
}

export default App;
