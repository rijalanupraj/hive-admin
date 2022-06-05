// External Import
import { BrowserRouter } from "react-router-dom";

import "./App.css";

// theme
import ThemeProvider from './theme';

import ThemeColorPresets from './components/ThemeColorPresets';

// colors


// Route Import
import AdminRoute from "./routes/adminRoute";


const App = () => {

  return (
    <ThemeProvider>
      <ThemeColorPresets>
          <BrowserRouter>          
            <AdminRoute />
          </BrowserRouter>
      </ThemeColorPresets>
    </ThemeProvider>
  );
};

export default App;
