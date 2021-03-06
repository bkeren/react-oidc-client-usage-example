import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from "react-router-dom";
import { ComposedAuthProvider, WebStorageStateStore } from './openid';
// import { ComposedAuthProvider, WebStorageStateStore } from '@nevzatcirak/react-oidc-client';

import 'bootstrap/dist/css/bootstrap.min.css';

export const webStorageStateStore = new WebStorageStateStore({ store: window.localStorage });

export const configuration = {
  client_id: "react",
  redirect_uri: "http://localhost:3000/auth-callback",
  response_type: "code",
  post_logout_redirect_uri: "http://localhost:3000/",
  scope: "openid profile email",
  authority: "http://keycloak.localhost/auth/realms/master",
  silent_redirect_uri: "http://localhost:3000/auth-silent-callback",
  revokeAccessTokenOnSignout: true,
  userStore: webStorageStateStore
};

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <ComposedAuthProvider
        configuration={configuration}
        isActive={true}
      >
        <App />
      </ComposedAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
