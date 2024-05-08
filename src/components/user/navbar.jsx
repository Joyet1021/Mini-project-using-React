import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({ setUsers }) => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      const timerId = setTimeout(() => {
        setDebouncedSearch(search);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [search, isMounted]);

  useEffect(() => {
    if (debouncedSearch) {
      history.push(`/searchproduct/${debouncedSearch}`);
      console.log("Search value:", debouncedSearch);
    }
  }, [debouncedSearch, history]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const logOut = (e) => {
    e.preventDefault();
    setUsers = [];
    history.push("/");
  };

  return (
    <div className="w-full h-20 flex flex-row items-center bg-[#173f59]">
      <div className="w-80 h-full flex items-center justify-center ">
        <img src={logo} className="sm:w-44 sm:h-10 w-28 h-7" alt="Logo" />
      </div>
      <div className="w-3/5 h-10 ">
        <input
          className="w-4/5 h-full border rounded flex items-center p-5"
          placeholder="Search..."
          onChange={handleChange}
        />
      </div>
      <div className="h-full w-2/6 flex items-center justify-end gap-[10%] pr-10">
        <div className="text-xl text-white">
          <Link to="/home">Home</Link>
        </div>
        <div className="text-xl text-white">Account</div>
        <div className="text-white" onClick={logOut}>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
