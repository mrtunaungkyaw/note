import React from "react";
import { MdClear, MdHome, MdList, MdTableRows } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";

export const Navbar = () => {
    const { state, handleNavHome, handleNavList, navbar, handleNavToggler, handleNavCollapseClose } =
        useContext(AppContext);
    return (
        <nav className="nav">
            <div className={`navbar-container ${navbar.collapse ? "" : "navbar-container-show"}`}>
                <div onClick={handleNavHome} className="nav-home">
                    Home
                    <MdHome className="nav-home-icon" />
                </div>
                <div onClick={handleNavList} className="nav-list">
                    List
                    <MdList className="nav-list-icon" />
                </div>
                <div onClick={handleNavToggler} className="nav-toggler">
                    Menu
                    <MdTableRows className="nav-toggler-icon" />
                </div>
            </div>
            <div className={`nav-collapse ${navbar.collapse ? "nav-collapse-show" : ""}`}>
                <div onClick={handleNavCollapseClose} className="nav-collapse-close">
                    <MdClear className="nav-collapse-icon" />
                </div>
                <div onClick={handleNavHome} className="nav-collapse-home">
                    Home
                    <MdHome className="nav-home-icon" />
                </div>
                <div onClick={handleNavList} className="nav-collapse-list">
                    List
                    <MdList className="nav-list-icon" />
                </div>
            </div>
        </nav>
    );
};
