// External Import
import { BrowserRouter } from "react-router-dom";

import "./App.css";

// theme


// colors


// Route Import
import AdminRoute from "./routes/adminRoute";


const App = () => {

  return (   

          <BrowserRouter>          
            <AdminRoute />
          </BrowserRouter>

  );
};

export default App;
