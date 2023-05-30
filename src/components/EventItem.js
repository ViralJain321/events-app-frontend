import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';
import { useContext } from 'react';
import FavouritesContext from '../store/favourite-context';

function EventItem({ event }) {
  const token = useRouteLoaderData('root');


  const favouritesCtx = useContext(FavouritesContext);
  const ItemsIsFavourite = favouritesCtx.itemIsFavourite(event.id);

  const submit = useSubmit();
  

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure you want to delete this event?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  function toggleFavouriteStatusHandler() {
    if (ItemsIsFavourite) {
      favouritesCtx.removeFavourite(event.id);
    } else {
      favouritesCtx.addFavourite(
        {
          id: event.id,
          title: event.title,
          date: event.date,
          address: event.address,
          description: event.description,
          image: event.image
        });
    }
  }


  return (
      <article className={classes.event}>
      {event.title !== undefined ? 
      <>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.address}</p>
      <p>{event.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )} </> 
      : <p> Failed to fetch the requested event. The event you are trying to access does not exist. </p> }
      <button onClick={toggleFavouriteStatusHandler}>
        {ItemsIsFavourite ? 'Remove From Favourite' : 'To Favourites'}
      </button>


    </article>
  );
}

export default EventItem;
