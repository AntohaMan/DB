import React from 'react';
import NavBar from "./components/NavBar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";





function App() {
  return (
    <BrowserRouter>
       <NavBar/>
       <AppRouter/>


    </BrowserRouter>

  );
}

export default App;
