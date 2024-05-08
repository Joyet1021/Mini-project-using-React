import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MovieIcon from "@mui/icons-material/Movie";

function sidebar() {
  return (
    <div>
      <div className="w-[15rem] h-full pt-8 ml-5 border-r-2 border-solid border-slate-400">
        <div className="w-52 h-12 mt-2 pl-4 flex items-center bg-blue-600">
          <Link to="/admin/addproduct">
            <AddIcon />
            <span className="pl-2 ">Add Movie</span>
          </Link>
        </div>
        <div className="w-52 h-12 mt-2 pl-4 flex items-center bg-blue-600">
          <Link to="/admin/products">
            <MovieIcon />
            <span className="pl-2 ">Movies</span>
          </Link>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default sidebar;
