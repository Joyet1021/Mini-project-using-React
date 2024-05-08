import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../../assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";

function navbar({ setAdmin }) {
  const history = useHistory();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const id = setTimeout(() => {
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const logOut = (e) => {
    e.preventDefault();
    setAdmin = [];
    history.push("/");
  };

  return (
    <div className="w-full h-20 flex flex-row  items-center bg-[#173f59]">
      <div className="w-80 h-full flex items-center  justify-center ">
        <img src={logo} className=" sm:w-44 sm:h-10 w-28 h-7" />
      </div>
      <div className="h-full w-5/6 flex items-center justify-end gap-[5%] pr-10">
        <div className="text-xl text-white">
          <Link to="/admin/products">Home</Link>
        </div>
        <div className="text-xl text-white">Account</div>
        <div className="text-white" onClick={logOut}>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
}

export default navbar;
