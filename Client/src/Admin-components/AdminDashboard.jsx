import { Person } from "@mui/icons-material";
import { getAllDonations, getAllDonors, getAllRecipients, getAllRequests, getBloodTypes, getPendingRequests, getPendingDonations } from "./admin-api";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader() {
    try {
        const allBloodTypes = await getBloodTypes()
        const allDonors = await getAllDonors()
        const allRecipients = await getAllRecipients()
        const allRequests = await getAllRequests()
        const allDonations = await getAllDonations()
        const pendingRequests = await getPendingRequests()
        const pendingDonations = await getPendingDonations()
        const data = [            
            allBloodTypes,
            allDonors,
            allRecipients,
            allRequests,
            allDonations, 
            pendingRequests,
            pendingDonations
        ]        
        return data
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export default function AdminDashboard() {
    const data = useLoaderData()
    const totalUsers = data[1].length + data[2].length
    const allBloodTypes = data[0]
    const totalBloodUnits = allBloodTypes.reduce((total, type) => total + type.units, 0);
    const displayBloodType = allBloodTypes.map((item) => (
        <div className="bloodtype-box" key={item.type}>
            <h3>{item.type}<img className="box-blood" src="./images/blood-drop.png"/></h3>
            <h5>{item.units}</h5>
        </div>
    ))
    return (
        <>
            <div className="dashboard">
                <h5>Welcome, administrator</h5>
                <h3>Available Blood per Group in ml</h3>
                <div className="bloodtype-container">
                    {displayBloodType}
                </div>
                <div className="totals">
                    <div>
                        
                        <h4>Total donors: </h4>
                        <h4>{data[1].length}</h4>
                    </div>
                    <div>
                        <h4>Total recipients: </h4>
                        <h4>{data[2].length}</h4>
                    </div>
                    <div>
                        <h4>Total requests: </h4>
                        <h4>{data[3].length}</h4>
                    </div>
                    <div className={data[5] < 1 ? "pending-requests" : "active-pending-requests"}>
                        <h4>Pending requests: </h4>
                        <h4>{data[5]}</h4>
                    </div>
                    <div>
                        <h4>Total donations: </h4>
                        <h4>{data[4].length}</h4>
                    </div>
                    <div className={data[6] < 1 ? "pending-donations" : "active-pending-donations"}>
                        <h4>Pending donations: </h4>
                        <h4>{data[6]}</h4>
                    </div>
                    <div>
                        <h4>Total Blood: </h4>
                        <h4>{totalBloodUnits}</h4>
                    </div>
                    <div>
                        <h4>Total Users: </h4>
                        <h4>{totalUsers}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}