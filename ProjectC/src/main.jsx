import ReactDOM from "react-dom/client"
import App from './App.jsx'
import './index.css'
import { StyledEngineProvider } from "@mui/material";
import { UserProvider } from "./contexts/UserContext/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
    <StyledEngineProvider injectFirst>
        <UserProvider>
            <App />
        </UserProvider>
    </StyledEngineProvider>
);
