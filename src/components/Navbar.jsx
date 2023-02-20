import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-4 container mx-auto px-10 flex items-center justify-between">
      <h1 className="font-bold md:text-4xl">MyMoviPedia</h1>
      <ul className="flex space-x-1"> 
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "bg-amber-600" : "") + ' p-2 rounded-md hover:underline underline-offset-4' }
        >
          <li className="text-xs md:text-base">Movies</li>
        </NavLink>
        <NavLink
          to="/actors"
          className={({ isActive }) => (isActive ? "bg-amber-600" : "") + ' p-2 rounded-md hover:underline underline-offset-4' }
        >
          <li className="text-xs md:text-base">Actors</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
