import { redirect } from "react-router-dom"

export async function authRecipient() {
    const isloggedin = sessionStorage.getItem("username")
    if(!isloggedin) {
        return redirect("/recipient-login?message=You must log in first")
    }
}