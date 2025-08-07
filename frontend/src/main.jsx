
import React, { StrictMode } from 'react';

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { StateContext } from './context/StateContext.jsx'


const CLIENT_ID = "572132838212-b1t41njknocp11u03qvj63ld4n1skve1.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <StateContext>
       <App />
    </StateContext>  
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
