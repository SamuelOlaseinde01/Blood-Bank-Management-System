import React from "react";
import { removeBloodStock } from "./admin-api";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export async function action({request}) {
    try {
        const formData = await request.formData()
        const rBloodType = formData.get("bloodType")
        const rUnit = formData.get("unit")
        const data = {
            type: rBloodType,
            units: rUnit
        }
        const msg = await removeBloodStock(data)
        toast(msg)
        return redirect("/admin/inventory")
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export default function RemoveBlood() {
    const navigation = useNavigation()
    return (
        <>
            <div className="login-container">
                <div className="add-blood">
            <h1>Remove Blood</h1>
            <Form method="post" className="add-blood-form">
                <div className="add-blood-label-container">
                    <label htmlFor="bloodType">Blood type: </label>
                        <select name="bloodType" id="bloodType" required>
                            <option value="Unknown">Unknown</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                <div className="add-blood-label-container">
                    <label htmlFor="">Unit:</label>
                    <input type="text" name="unit"/>
                </div>
                <button className={navigation.state === "submitting" ? "submitting-btn" : "submit-btn"} disabled={navigation.state ==="submitting"}>{ navigation.state === "submitting" ? "Removing blood...": "Remove Blood"}</button>
            </Form>
            </div>
            </div>
        </>
    )
}