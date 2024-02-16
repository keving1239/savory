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
        domain="dev-t6vspuc8qrssaarc.us.auth0.com"
        clientId="QOhn47I8VQpCd3QS8r98u6qUZAjVCJKt"
        authorizationParams={{
          redirect_uri: `${window.location.origin}/login`
        }}
      >
        <App/>
      </Auth0Provider>
    </Provider>
);

// reportWebVitals();
