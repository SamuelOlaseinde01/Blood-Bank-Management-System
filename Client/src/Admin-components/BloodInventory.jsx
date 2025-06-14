import { Person } from "@mui/icons-material";
import { getAllDonations, getAllDonors, getAllRecipients, getAllRequests, getBloodTypes } from "./admin-api";
import React from "react";
import { useLoaderData, Link } from "react-router-dom";

export async function loader() {
    try {
        const allBloodTypes = await getBloodTypes()
        const allDonors = await getAllDonors()
        const allRecipients = await getAllRecipients()
        const allRequests = await getAllRequests()
        const allDonations = await getAllDonations()
        const data = [            
            allBloodTypes,
            allDonors,
            allRecipients,
            allRequests,
            allDonations]        
        return data
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export default function BloodInventory() {
    const data = useLoaderData()
    const allBloodTypes = data[0]
    const displayBloodType = allBloodTypes.map((item) => (
        <div className="bloodtype-box" key={item.type}>
            <h3>{item.type}<img className="box-blood" src="/images/blood-drop.png"/></h3>
            <h5>{item.units}</h5>
        </div>
    ))
    return (
        <>
            <div className="dashboard">
                <h4>Blood Inventory</h4>
                <h3>Available Blood per Group in ml</h3>
                <div className="bloodtype-container">
                    {displayBloodType}
                </div>
                <div className="blood-inventory-btns">
                    <Link to={"/admin/add-blood"}>Add Blood</Link>
                    <Link to={"/admin/remove-blood"}>Remove Blood</Link>
                </div>
            </div>
        </>
    )
}