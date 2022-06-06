// External Import
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Page Import
import {

  Home,

} from '../pages';

import DashboardHeader from '../layouts/dashboard/header';





// Internal Import


// Helper Route Import


const adminRoute = () => {


  return (
    <>
    <DashboardHeader>
      <main>
        <Routes>
          {/* Normal Routes Starts */}
          <Route exact path='/' element={<Home />} />

         
          {/* Normal Routes Ends */}

          {/* Private Routes Starts */}
         
          {/* Private Routes End */}

          {/* Remaining Route Ends */}
         
          
          {/* Remaining Route Ends */}
        </Routes>
      </main>
      </DashboardHeader>

    </>
  );
};

export default adminRoute;
