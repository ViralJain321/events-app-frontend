import { createContext, useEffect, useState } from "react";

const FavouritesContext = createContext({
    favourites: [],
    totalFavourites: 0,
});

export function FavouritesContextProvider(props) {

    const [userFavourites, setUserFavourites] = useState([]);

    useEffect(() => {
        const myUserFavourites = JSON.parse(localStorage.getItem('myUserFavourites'));
        if (myUserFavourites) {
          setUserFavourites(myUserFavourites);
        }
      }, []);
      
      useEffect(() => {
    
        localStorage.setItem('myUserFavourites', JSON.stringify(userFavourites));
      }, [userFavourites]);
      
    function addFavouriteHandler(favouriteEvent) {
        setUserFavourites((prevUserFavourites) => {
            return prevUserFavourites.concat(favouriteEvent);
        });
    }

    function removeFavoutitehandler(eventId) {
        setUserFavourites(prevUserFavourites => {
            return prevUserFavourites.filter(event => event.id !== eventId);
        });
    }

    function itemIsFavouriteHandler(eventId) {
        return userFavourites.some(event => event.id === eventId);
    }

    const context = {
        favourites: userFavourites,
        totalFavourites: userFavourites.length,
        addFavourite: addFavouriteHandler,
        removeFavourite: removeFavoutitehandler,
        itemIsFavourite: itemIsFavouriteHandler
    }

    return <FavouritesContext.Provider value={context}>
        {props.children}
    </FavouritesContext.Provider>
}

export default FavouritesContext;