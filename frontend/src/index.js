import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleguide.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="917982704715-hjm4m03j8ougkqb16kopm2a54ipqvh22.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

