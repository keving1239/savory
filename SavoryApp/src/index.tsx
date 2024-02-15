import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <Auth0Provider
        domain="dev-ccviiilbztbrkbgs.us.auth0.com"
        clientId="skApss4fd5jqdUyfMqW9T0W394QkTxH0"
        authorizationParams = {{redirect_uri: `${window.location.origin}/feed`}}
      >
        <App/>
      </Auth0Provider>
    </Provider>
);

// reportWebVitals();
