import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Layout from "./Layout";
import Movies from "./pages/movies";
import Actors from "./pages/actors";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/movies" replace />} />
          <Route path="movies" element={<Movies />} /> 
        </Route>
        <Route path="/" element={<Layout />}> 
          <Route path="actors" element={<Actors />} /> 
        </Route>
        {/* <div className=" bg-slate-300">
          <div>
            <Navbar />
          </div>
        </div> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
