import { useContext } from "react";
import FavouriteList from "../components/FavouriteList";
import FavouritesContext from "../store/favourite-context";
import { Suspense } from "react";


function Favourite(){

    const favouritesCtx = useContext(FavouritesContext);

    let content;
    if(favouritesCtx.totalFavourites === 0){
        content = <p style={{"textAlign": "center"}}>You does not got any Favourite. Please add some? </p>
    }else{
        content = <FavouriteList events = {favouritesCtx.favourites}/>
    }

    return <div>
        <Suspense fallback={<p>Loading...</p>}>{content}</Suspense>
    </div>

}

export default Favourite;