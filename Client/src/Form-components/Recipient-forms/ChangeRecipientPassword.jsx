import React from "react";
import { Form, redirect, useActionData, useLoaderData, Link, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { changeRecipientsPassword } from "./recipientApi";
import { Home } from "@mui/icons-material";

export async function loader({request}) {
    const url = new URL(request.url).searchParams.get("username")
    return url
}

export async function action({request}) {
    try {
        const formData = await request.formData()
        const rUsername = formData.get("username")
        const rPassword = formData.get("password")
        const data = {
            username: rUsername,
            newPassword: rPassword
        }
        await changeRecipientsPassword(data)
        return redirect("/recipient-login")
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export default function ChangeRecipientPassword() {
    const username = useLoaderData()
    const navigation = useNavigation()
    return (
        <>
        <div className="login-container">
        <div className="verify-container">
          <Link to={"/"} className="link-to-home" title="Go Home"><Home /></Link>
            <Form method="post" className="verify-form">
                <h1>Change Password</h1>
                <input type="hidden" value={username} name="username" required/>
                <div className="label-container">
                    <label htmlFor="password">Enter new password:</label>
                    <input id="password" type="password" name="password" pattern=".{8,}" title="Password must be at least 8 characters long" required/>
                </div>
                <button className={navigation.state === "submitting" ? "submitting-btn" : "submit-btn"} disabled={navigation.state ==="submitting"}>{ navigation.state === "submitting" ? "Changing Password..": "Change Password"}</button>
            </Form>
            </div>
            </div>
        </>
    )
}