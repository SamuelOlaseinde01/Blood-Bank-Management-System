import React from "react";
import { Form , redirect, useNavigation} from "react-router-dom";
import { donorGetCreds } from "../Form-components/Donor-forms/donorApi";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { recipientGetCreds, updateRecipientProfile } from "../Form-components/Recipient-forms/recipientApi";

export async function loader() {
    try {   
        const username = sessionStorage.getItem("username")
        const userData = await recipientGetCreds(username)
        return userData
    } catch (err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export async function action({request}) {
    try {
    const formData = await request.formData()
    const rId = formData.get("id")
    const rFirstName = formData.get("firstname")
    const rLastName = formData.get("lastname")
    const rAge = formData.get("age")
    const rPhoneNo = formData.get("phoneNumber")
    const rAddress = formData.get("address")
    const rDisease = formData.get("disease")
    const data = {
        id: rId,
        firstName: rFirstName,
        lastName: rLastName,
        age: rAge,
        phoneNo: rPhoneNo,
        address: rAddress,
        disease: rDisease
    }
    const message = await updateRecipientProfile(data)
    toast(message)
    return redirect("/recipient/profile")
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export default function RecipientProfile() {
    const navigation = useNavigation()
    const user = useLoaderData()
    const [editProfile, setEditProfile] = React.useState(false)
    React.useEffect(() => {
        if (navigation.state === "idle") {
            setEditProfile(false)
        }
    }, [navigation.state])
    return (
        !editProfile ?
        <> 
            <div className="profile-container">
                <button onClick={() => setEditProfile(true)}>Edit Profile</button>
                <div>
                    <h3>Profile</h3>
                </div>
                <div className="profile-details">
                    <img style={{width: "100px", height: "100px"}} src="./images/user.png" alt="" />
                    <div>
                        <h4>Full name: </h4>
                        <span>{`${user.firstName} ${user.lastName}`}</span>
                    </div>
                    <div>
                        <h4>Username: </h4>
                        <span>{user.username}</span>
                    </div>
                    <div>
                        <h4>Phone number: </h4>
                        <span>{user.phoneNo}</span>
                    </div>
                    <div>
                        <h4>Age: </h4>
                        <span>{user.age}</span>
                    </div>
                    <div>
                        <h4>Gender: </h4>
                        <span>{user.gender}</span>
                    </div>
                    <div>
                        <h4>Blood type: </h4>
                        <span>{user.bloodType}</span>
                    </div>
                    <div>
                        <h4>Genotype: </h4>
                        <span>{user.genotype}</span>
                    </div>
                    <div>
                        <h4>Address: </h4>
                        <span>{user.address}</span>
                    </div>
                    <div>
                        <h4>Disease: </h4>
                        <span>{user.disease}</span>
                    </div>
                </div>
            </div>
        </> : 
        <>

        <div className="register-container">
            <div className="register">
        <h3>Edit Profile</h3>
        <Form method="post" className="register-form" style={{textAlign: "left"}}>
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
            <label htmlFor="">Disease(if any): </label>
            <input
                type="text"
                name="disease"
                placeholder="Disease"
                required
            />
        </div>
        <input type="hidden" value={user._id} name="id"/>
        <button type="submit" className={navigation.state === "submitting" ? "signup-submitting-btn" : "signup-submit-btn"} disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? "Editting profile..." : "Edit profile"}</button>
        </Form>
        </div>
        </div>
        </>
    )
}