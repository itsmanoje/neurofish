import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'; 

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
      domain="dev-6jy4munnjh6un8ka.us.auth0.com"
      clientId="G8R0kCMXs3qTzYW4ikldXdgIkYNRL0NE"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
      
    </Auth0Provider>
);

reportWebVitals();
