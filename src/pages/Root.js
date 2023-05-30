import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/authToken';

function RootLayout() {
  
  const token = useLoaderData();

  const submit = useSubmit();

  //logout if token is expired, current time of expiration 6h
  useEffect(() => {
    if (!token) {
      return;
    }

    if(token === 'EXPIRED'){
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();


    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);


  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
