import React from "react";
import { Form, redirect, Link, useNavigation, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyDonorsAnswer } from "./donorApi";
import { Home } from "@mui/icons-material";

export async function loader({request}) {
    const username = new URL(request.url).searchParams.get("username")
    return username
}

export async function action({request}) {
    try {
        const formData = await request.formData()
        const rUsername = formData.get("username")
        const rSecurityAnswer = formData.get("securityAnswer")
        const data = {
            username: rUsername,
            securityAnswer: rSecurityAnswer
        }
        const username = await verifyDonorsAnswer(data)
        const urlUsername = data.username
        return redirect(`/change-donor-password?username=${urlUsername}`)
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export default function VerifyDonorAnswer() {
    const username = useLoaderData()
    const navigation = useNavigation()
    return (
        <>    
        <div className="login-container">
        <div className="verify-container">
          <Link to={"/"} className="link-to-home" title="Go Home"><Home /></Link>
            <h1>Verify Security Answer</h1>
            <Form method="post" className="verify-form">
                <input type="hidden" name="username" value={username} />
                <div className="label-container">
                    <label style={{fontWeight: 700}}>Security Question:</label>
                    <label htmlFor="">What is your mother's maiden name?</label>
                    <input type="text" name="securityAnswer" required/>
                </div>
                <button className={navigation.state === "submitting" ? "submitting-btn" : "submit-btn"} disabled={navigation.state ==="submitting"}>{ navigation.state === "submitting" ? "Verifying...": "Verify"}</button>
            </Form>
            </div>
            </div>
        </>
    )
}