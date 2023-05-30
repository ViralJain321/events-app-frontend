import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import FavouritesContext from '../store/favourite-context';
import { useContext } from 'react';

function MainNavigation() {
  const token = useRouteLoaderData('root')
  const favoritesCtx = useContext(FavouritesContext);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favourite"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              My Favourite
              <span className={classes.badge}>
                {favoritesCtx.totalFavourites}
              </span>
            </NavLink>
          </li>
          {!token && (<li>
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Authentication
            </NavLink>
          </li>
          )}
          {token && (<li>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </li>)}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
