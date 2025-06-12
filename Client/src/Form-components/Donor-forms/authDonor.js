import { redirect } from "react-router-dom"

export async function authDonor() {
    const isloggedin = sessionStorage.getItem("username")
    if(!isloggedin) {
        return redirect("/donor-login?message=You must log in first")
    }
}