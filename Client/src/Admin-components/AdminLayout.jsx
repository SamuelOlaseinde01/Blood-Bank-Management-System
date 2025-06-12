import React from "react";
import { Home, ExitToApp, Bloodtype, MedicalServices, Storage, PeopleAlt } from "@mui/icons-material";
import { Outlet, NavLink, useLoaderData } from "react-router-dom";
import { redirect } from "react-router-dom";

export async function loader() {
    const isLoggedin = sessionStorage.getItem("isLoggedIn")
    if(!isLoggedin) {
        return redirect("/admin-login?message=You must log in first")
    }
}

export default function AdminLayout() {
    const activeLink = {
        backgroundColor: "rgb(255, 72, 72)",
        padding: "10px",
        transition: "300ms",
        textAlign: "center"
    }

return (
    <>
        <div className="app-layout">
            <nav className="app-nav">
                <h2>Admin</h2>
                <NavLink end style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/admin"}><Home />Home</NavLink>
                <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/admin/donors"}><PeopleAlt />Donors</NavLink>
                <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/admin/recipients"}><PeopleAlt />Recipients</NavLink>
                <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/admin/donations"}><Bloodtype />Donations</NavLink>                            
                <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/admin/inventory"}><Storage />Inventory</NavLink>    
                <NavLink style={({isActive}) => isActive ? activeLink : null} className={"nav-with-icons"} to={"/admin/blood-requests"}><MedicalServices />Requests</NavLink>
                <NavLink className={"logout"} to={"/"} onClick={() => sessionStorage.clear()}><ExitToApp />Log Out</NavLink>
            </nav>
            <div className="app-outlet">
                <Outlet/>
            </div>
        </div>
    </>
    )
}