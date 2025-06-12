import React, { useRef } from "react";
import { Link, Form, useNavigation, useLoaderData, redirect } from "react-router-dom";
import { Home, Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { recipientPostLogin } from "./recipientApi";

export function loader({request}) {
  const url = new URL(request.url).searchParams.get("message")
  return url
}


export async function action({request}) {
  const formData = await request.formData()
  const rUsername = formData.get("username")
  const rPassword = formData.get("password")
  const data = {
    rUsername: rUsername,
    rPassword: rPassword
  }
  try{
    const username = await recipientPostLogin(data)
    return redirect(`/recipient?username=${username}&ts=${Date.now()}`)
  } catch (err) {
    toast.error(err.message, {
      toastId: "donation-load-fail",
  });
  return []
  }
}

export default function RecipientLogin() {
  const message = useLoaderData()
  const hasShownToast = useRef(false)
  const navigation = useNavigation()
  const [type, setType] = React.useState('password');
  const [visibilityState, setVisibilityState] = React.useState(false)

  React.useEffect(() => {
    if (message && !hasShownToast.current) {
      toast(message);
      hasShownToast.current = true;
    }
  }, [message]);

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
      <h1>RECIPIENT LOGIN</h1>
      <Form method="post" className="login-form">
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
        <Link style={{textDecoration : "none", color: "red"}} to={"/verify-recipient-username"}>Forgot password?</Link>
        <button className={navigation.state === "submitting" ? "submitting-btn" : "submit-btn"} disabled={navigation.state ==="submitting"}>{ navigation.state === "submitting" ? "Logging in...": "Login"}</button>

        <div className="no-account">
            <p>Don't have an account? <Link style={{textDecoration: "none", color: "red"}} to={"/recipient-register"}>Sign up</Link></p>
        </div>
      </Form>
      </div>
    </div>
  );
    
}