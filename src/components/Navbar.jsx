import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-4 container mx-auto px-10 flex justify-between">
      <h1 className="font-bold text-4xl">MyMoviPedia</h1>
      <ul className="flex space-x-5"> 
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "bg-amber-600" : "") + ' p-2 rounded-md hover:underline underline-offset-4' }
        >
          <li>Movies</li>
        </NavLink>
        <NavLink
          to="/actors"
          className={({ isActive }) => (isActive ? "bg-amber-600" : "") + ' p-2 rounded-md hover:underline underline-offset-4' }
        >
          <li>Actors</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
