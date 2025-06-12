import React from "react";
import { Form, redirect, Link, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyDonorsUsername } from "./donorApi";
import { Home } from "@mui/icons-material";

export async function action({request}) {
    try {
        const formData = await request.formData()
        const rUsername = formData.get("username")
        const data = {
            username: rUsername,
        }
        const username = await verifyDonorsUsername(data)
        const urlUsername = data.username
        return redirect(`/verify-donor-answer?username=${urlUsername}`)
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export default function VerifyDonorUsername() {
    const navigation = useNavigation()
    return (
        <>    
        <div className="login-container">
        <div className="verify-container">
          <Link to={"/"} className="link-to-home" title="Go Home"><Home /></Link>
            <h1>Verify User</h1>
            <Form method="post" className="verify-form">
                <div className="label-container">
                    <label htmlFor="username" style={{fontWeight: 700}}>Enter Username: </label>
                    <input type="text" name="username" id="username" required/>
                </div>
                <button className={navigation.state === "submitting" ? "submitting-btn" : "submit-btn"} disabled={navigation.state ==="submitting"}>{ navigation.state === "submitting" ? "Verifying...": "Verify"}</button>
            </Form>
            </div>
            </div>
        </>
    )
}