import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { FavouritesContextProvider } from './store/favourite-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FavouritesContextProvider>
      <App />
    </FavouritesContextProvider>
);
