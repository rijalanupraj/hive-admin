// External Import
import { BrowserRouter } from "react-router-dom";

import "./App.css";

// theme
import ThemeProvider from "./theme";

import ThemeColorPresets from "./components/ThemeColorPresets";

import ThemeLocalization from "./components/ThemeLocalization";


import NotistackProvider from "./components/NotistackProvider";
// colors

// Route Import
import AdminRoute from "./routes/adminRoute";

const App = () => {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
            <NotistackProvider>
              <BrowserRouter>
                <AdminRoute />
              </BrowserRouter>
            </NotistackProvider>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider>
  );
};

export default App;
