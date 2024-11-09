import ReactDOM from "react-dom/client"
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'
import { StyledEngineProvider } from "@mui/material";
import Banner from "./components/Banner/Banner.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <Banner />
      <App />
    </StyledEngineProvider>
  </StrictMode>
);
