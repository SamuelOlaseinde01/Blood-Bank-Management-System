import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home">
            <div className="home-container">
                <h1>A BLOOD BANK MANAGEMENT SYSTEM</h1>
                <p>....save lives, one donation at a time</p>
                <div className="home-links">
                    <Link to={"/donor-login"}>Donor Login</Link>
                    <Link to={"/recipient-login"}>Recipient Login</Link>
                    <Link to={"/admin-login"}>Admin Login</Link>
                </div>
            </div>
        </div>
    )
}