import ReactDOM from "react-dom/client"
import App from './App.jsx'
import './index.css'
import { StyledEngineProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("app")).render(
    <StyledEngineProvider injectFirst>
        <App />
    </StyledEngineProvider>
);
