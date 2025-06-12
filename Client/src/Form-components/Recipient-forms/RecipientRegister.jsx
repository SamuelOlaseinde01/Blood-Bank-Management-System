import React from "react";
import { Link, Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { toast } from "react-toastify";
import { recipientPostRegister } from "./recipientApi";

export async function action({request}) {
    const formData = await request.formData()
    const rFirstName = formData.get("firstname")
    const rLastName = formData.get("lastname")
    const rUsername = formData.get("username")
    const rPassword = formData.get("password")
    const rPasswordChecked = formData.get("passwordChecked")
    const rAge = formData.get("age")
    const rDisease = formData.get("disease")
    const rSugarLevel = formData.get("sugarLevel")
    const rPcv = formData.get("pcv")
    const rGenotype = formData.get("genotype")
    const rGender = formData.get("gender")
    const rAddress = formData.get("address")
    const rPhoneNumber = formData.get("phoneNumber")
    const rBloodType = formData.get("bloodType")
    const rSecurityAnswer = formData.get("securityAnswer")
    const data = {
        rUsername: rUsername,
        rPassword: rPassword,
        rPasswordChecked: rPasswordChecked,
        rFirstName: rFirstName,
        rLastName: rLastName,
        rAge: rAge,
        rDisease: rDisease,
        rAddress: rAddress,
        rGender: rGender,
        rGenotype: rGenotype,
        rSugarLevel: rSugarLevel,
        rPcv: rPcv,
        rPhoneNo: rPhoneNumber,
        rBloodType: rBloodType,
        rSecurityAnswer: rSecurityAnswer
    }
    try{
        await recipientPostRegister(data)
        return redirect("/recipient-login?message=Successfully signed up, You can now proceed to log in")
    } catch(err) {
        const errorMessage = err?.message || "Registration failed try again"
        if(Array.isArray(errorMessage)) {
            errorMessage.forEach(error => toast.error(error))
        } else {
            toast(errorMessage)
        }
        return null
    }
}

export default function RecipientRegister() {
    const navigation = useNavigation()
    return (
        <div className="register-container">
            <div className="register">
                <Link to={"/"} className="link-to-home" title="Go Home"><Home /></Link>
                <h1>RECIPIENT REGISTER</h1>
            <Form method="post" className="register-form">
                <div className="label-container">
                    <div className="first-lastname-container">
                        <div className="first-lastname">
                                <label htmlFor="">First name: </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First name"
                                    required
                                />
                        </div>
                        <div className="first-lastname">
                            <label htmlFor="">Last name: </label>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="label-container">
                    <label htmlFor="">Username: </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="label-container">
                    <label htmlFor="">Password: </label>
                    <input
                        type="password"
                        name="password"
                        placeholder={"Password"}
                        pattern=".{8,}"
                        title="Password must be at least 8 characters long"
                        required
                    />
                </div>
                <div className="label-container">
                    <label htmlFor="">Confirm Password: </label>
                    <input
                        type="password"
                        name="passwordChecked"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div className="label-container">
                    <label htmlFor="">Age:</label>
                    <input
                        type="number"
                        name="age"
                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        min={17}
                        max={65}
                        placeholder="Enter your Age"
                        required
                    />
                </div>
                <div className="label-container">
                    <label htmlFor="">Phone number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone number"
                        required
                    />
                </div>
                <div className="label-container">
                    <label htmlFor="">Address:</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        required
                    />
                </div>
                <div className="label-container">
                    <label htmlFor="">Sugar level(mg/dl):</label>
                    <input
                        type="number"
                        name="sugarLevel"
                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        placeholder="Sugar Level"
                        required
                    />
                </div>
                <div className="label-container">
                    <label htmlFor="">PCV(in %): </label>
                    <input
                        type="number"
                        name="pcv"
                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        placeholder="PCV"
                        required
                    />
                </div>
                <div className="label-container">
                    <label htmlFor="">Disease(if any): </label>
                    <input
                        type="text"
                        name="disease"
                        placeholder="Disease"
                        required
                    />
                </div>
                <div className="register-bt">
                    <label htmlFor="gender">Gender: </label>
                    <select name="gender" id="gender">
                    <option value="Unknown">Unknown</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="register-bt">
                    <label htmlFor="">Genotype: </label>
                    <select name="genotype" id="">
                    <option value="Unknown">Unknown</option>
                        <option value="AA">AA</option>
                        <option value="AS">AS</option>
                        <option value="SS">SS</option>
                    </select>
                </div>
                <div className="register-bt">
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
                <div className="label-container">
                    <label htmlFor="" style={{fontWeight: 700}}>Security Question:</label>
                    <label htmlFor="">What is your mother's maiden Name: </label>
                    <input
                        type="text"
                        name="securityAnswer"
                        placeholder="Answer"
                        required
                    />
                </div>

                <button className={navigation.state === "submitting" ? "signup-submitting-btn" : "signup-submit-btn"} disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? "Signing up..." : "Sign up"}</button>

                <div className="no-account">
                    <p>Already have an account? <Link style={{textDecoration: "none", color: "red"}} to={"/recipient-login"}>Log in</Link></p>
                </div>
            </Form>
            </div>
        </div>
    );
}