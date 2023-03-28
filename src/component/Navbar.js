import React from "react";
import { MdHome, MdList } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";

export const Navbar = () => {
    const { handleNavHome, handleNavList } = useContext(AppContext);
    return (
        <div className="navbar-container">
            <div onClick={handleNavHome} className="nav-home">
                Home
                <MdHome className="nav-home-icon" />
            </div>
            <div onClick={handleNavList} className="nav-list">
                List
                <MdList className="nav-list-icon" />
            </div>
        </div>
    );
};
