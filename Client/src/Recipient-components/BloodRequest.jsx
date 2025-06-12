import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { recipientGetCreds, bloodRequest } from "../Form-components/Recipient-forms/recipientApi";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

function date() {
    const date = new Date()
    const dateOfDonation = date.getDate()
    const monthOfDonation = date.getMonth()
    let months
    const yearofDonation = date.getFullYear()
    if(monthOfDonation === 0) {
        months = "January"
    }  else if(monthOfDonation === 1) {
        months = "February"
    } else if(monthOfDonation === 2) {
        months = "March"
    } else if(monthOfDonation === 3) {
        months = "April"
    } else if(monthOfDonation === 4) {
        months = "May"
    } else if(monthOfDonation === 5) {
        months = "June"
    } else if(monthOfDonation === 6) {
        months = "July"
    } else if(monthOfDonation === 7) {
        months = "August"
    } else if(monthOfDonation === 8) {
        months = "September"
    } else if(monthOfDonation === 9) {
        months = "October"
    } else if(monthOfDonation === 10) {
        months = "November"
    } else if(monthOfDonation === 11) {
        months = "December"
    }

    const time = `${dateOfDonation} ${months}, ${yearofDonation}`
    return time
}

export async function loader() {
    try {
        const username = sessionStorage.getItem("username")
        const userData = await recipientGetCreds(username)
        return userData
    } catch (err) {
        toast.error(err.message)
    }
}

export async function action({request}) {
    const rDate = date()
    const rStatus = "Pending"
    const formData = await request.formData()
    const rBloodUnit = formData.get("unit")
    const rUsername = formData.get("username")
    const rBloodType = formData.get("bloodType")
    const rDisease = formData.get("disease")
    const rPhoneNo = formData.get("phoneNo")
    const rGenotype = formData.get("genotype")
    const rGender = formData.get("gender")
    const rSugarLevel = formData.get("sugarLevel")
    const rPcv = formData.get("pcv")

    const data = {
        rUsername: rUsername,
        rDate: rDate,
        rStatus: rStatus,
        rBloodUnit: rBloodUnit,
        rBloodType: rBloodType,
        rDisease: rDisease,
        rPhoneNo: rPhoneNo,
        rGenotype: rGenotype,
        rGender: rGender,
        rPcv: rPcv,
        rSugarLevel: rSugarLevel
    }
    try {
        await bloodRequest(data)
        toast("Blood request successful")
        return redirect("/recipient/history")
    } catch (err) {
        const errorMessage = err?.message || "Request failed"
        if(Array.isArray(errorMessage)) {
            errorMessage.forEach((error) => toast.error(error))
        } else {
            toast(errorMessage)
        }
        return null
    }
}

export default function BloodRequest() {
    const navigation = useNavigation()
    const user = useLoaderData()
    return (
        <>  
            <div className="blood-donate-container">
                <div className="blood-donate">
                    <h2>Blood Request</h2>
                    <Form method="post" className="blood-donate-form">
                        <div className="blood-donate-label-form">
                            <label htmlFor="unit">Unit(in ml): </label>
                            <input name="unit" type="number" min={450} max={500} required onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}/>
                        </div>
                        <div className="blood-donate-label-form">
                            <label htmlFor="blood-group">Disease(if any):</label>
                            <input name="disease" type="text" required/>
                        </div>
                        <div className="blood-donate-label-form">
                            <label htmlFor="blood-group">Sugar level:</label>
                            <input name="sugarLevel" type="number" required onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}/>
                        </div>
                        <div className="blood-donate-label-form">
                            <label htmlFor="blood-group">PCV: </label>
                            <input name="pcv" type="number" required onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}/>
                        </div>
                            <input name="phoneNo" type="hidden" value={user.phoneNo} required/>
                            <input name="username" type="hidden" value={user.username} required/>
                            <input name="genotype" type="hidden" value={user.genotype} required/>
                            <input name="bloodType" type="hidden" value={user.bloodType} required/>
                            <input name="gender" type="hidden" value={user.gender} required/>
                            <button className={navigation.state === "submitting" ? "signup-submitting-btn" : "signup-submit-btn"} disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? "Requesting.." : "Request"}</button>
                    </Form>
                </div>
            </div>
        </>
    )
}