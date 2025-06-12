import React from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { useLoaderData, useActionData } from "react-router-dom";
import { Home, Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { adminLogin } from "../../Admin-components/admin-api";

export async function loginLoader({ request}) {
  const url = new URL(request.url).searchParams.get("message")
  return url
}

export async function adminAction( {request} ) {
  const formData = await request.formData()
  const username = formData.get("username")
  const password = formData.get("password")
  const cred = {
    username: username,
    password: password
  }
  try {
    await adminLogin(cred)
    return redirect("/admin")
  } catch(err) {
    toast.error(err.message, {
      toastId: "donation-load-fail",
    });
    return []
  }
}

export default function AdminLogin() {
  const message = useLoaderData()
  const errorMessage = useActionData()
  const navigation = useNavigation()
  const [type, setType] = React.useState("password");
  const [visibilityState, setVisibilityState] = React.useState(false)    
    
  function handleClick(e) {
    setVisibilityState(prevstate => !prevstate)
    if(visibilityState === true) {
      setType("password")
      } else {
      setType("text")
    }
  }
  
  return (
    <div className="login-container">
      <div className="login">
        <Link to={"/"} className="link-to-home" title="Go Home"><Home /></Link>
        <h1>ADMIN LOGIN</h1>
          {errorMessage ? null : message && <h5 style={{color: "red"}}>{message}</h5>}
        <Form method="post" className="admin-login-form" replace>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <div className="password-container">
            <input
              type={type}
              name="password"
              placeholder="Password"
              required
            />
            <div className="visibility" onClick={handleClick}>
              {visibilityState ? <Visibility /> : <VisibilityOff />}
            </div>
          </div>
          <button className={navigation.state === "submitting" ? "admin-login-submitting-btn" : "admin-login-btn"} disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? "Logging in...": "Login"}</button>
        </Form>
      </div>
    </div>
  );
}