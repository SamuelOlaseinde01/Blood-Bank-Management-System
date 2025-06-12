import React from "react";
import { Home, HealthAndSafety, History, Person2Rounded, ExitToApp } from "@mui/icons-material";
import { Outlet, NavLink } from "react-router-dom";

export default function RecipientLayout() {
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
                    <h2>Recipient</h2>
                    <NavLink end style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={`/recipient?username=${username}`}><Home />Dashboard</NavLink>
                    <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/recipient/request"}><HealthAndSafety />Request</NavLink>                
                    <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/recipient/history"}><History />History</NavLink>               
                    <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/recipient/profile"}><Person2Rounded />Profile</NavLink>
                    <NavLink className={"logout"} to={"/"} onClick={() => {sessionStorage.clear()}}><ExitToApp />Log Out</NavLink>
                </nav> 
                <div className="app-outlet">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}