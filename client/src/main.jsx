import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Auth0Provider} from '@auth0/auth0-react'
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-cobtp5a61vez204z.us.auth0.com"
    clientId="UQNVklMoamc6OTe6LxQYst85mE1PpqEH"
    authorizationParams={{
      redirect_uri: 'https://full-stack-website-client.onrender.com'
    }}
    audience='http://localhost:8000'
    scope= "openid profile email"
    >
      <MantineProvider>
    <App />
    </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
