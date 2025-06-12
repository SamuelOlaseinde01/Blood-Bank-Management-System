import React from "react";
import { Home, HealthAndSafety, History, Person2Rounded, ExitToApp } from "@mui/icons-material";
import { Outlet, NavLink } from "react-router-dom";

export default function DonorLayout() {
    const username = sessionStorage.getItem("username")
    const activeLink = {
        backgroundColor: "rgb(255, 72, 72)",
        padding: "10px",
        transition: "300ms"
    }

    return (
        <>
           <div className="app-layout">
                <nav className="app-nav">
                    <h2>Donor</h2>
                    <NavLink end style={({isActive}) => isActive ? activeLink : null} to={`/donor?username=${username}`} className={"nav-with-icons"}><Home />Dashboard</NavLink>
                    <NavLink style={({isActive}) => isActive ? activeLink : null} to={"/donor/donate"} className={"nav-with-icons"}><HealthAndSafety />Donate</NavLink>                
                    <NavLink style={({isActive}) => isActive ? activeLink : null} to={"/donor/history"} className={"nav-with-icons"}><History />History</NavLink>               
                    <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/donor/profile"}><Person2Rounded />Profile</NavLink>
                    <NavLink className={"logout"} to={"/"} onClick={() => {sessionStorage.clear()}}><ExitToApp />Log Out</NavLink>
                </nav>
                
                <div className="app-outlet">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}