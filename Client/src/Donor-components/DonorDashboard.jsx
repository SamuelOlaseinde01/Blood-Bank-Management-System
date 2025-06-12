import React from "react";
import { getPendingDonationCount, getAcceptedDonationCount, getRejectedDonationCount, donorGetCreds, donorGetDonations, getLastDonation} from "../Form-components/Donor-forms/donorApi";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader({request}) {
    try {
        const url = new URL(request.url).searchParams.get("username")
        const creds = await donorGetCreds(url)
        const pendingDonationCount = await getPendingDonationCount(url)
        const acceptedDonationCount = await getAcceptedDonationCount(url)
        const rejectedDonationCount = await getRejectedDonationCount(url)
        const totalDonations = await donorGetDonations(url)
        const lastDonation = await getLastDonation(url)
        const data = [
            creds, 
            pendingDonationCount,
            acceptedDonationCount,
            rejectedDonationCount,
            totalDonations,
            lastDonation
        ]
        return data
    } catch(err) {
        toast.error(err)
        return null
    }
}

export default function DonorDashboard() { 
    const data = useLoaderData()
    const userData = data[0]
    const pendingDonations = data[1]
    const acceptedDonations = data[2]
    const rejectedDonations = data[3]
    const totalDonations = data[4].length
    const lastDonation = data[5]
    
    return (
        <>
        <div className="donor-dashboard">
                <h5>Welcome, {userData.firstName}</h5>
                <h2>Overview:</h2>
                <div className="donor-dashboard-box-container">
                    <div>
                        <h4>Pending {pendingDonations > 1 ? "donations:" : "donation:" }</h4>
                        <h3><b>{pendingDonations}</b></h3>
                    </div>
                    <div>
                        <h4>Accepted {acceptedDonations > 1 ? "donations: " : "donation: " }</h4>
                        <h3><b>{acceptedDonations}</b></h3>                    
                    </div>
                    <div>
                        <h4>Rejected {rejectedDonations > 1 ? "donations:" : "donation:" }</h4>
                        <h3><b>{rejectedDonations}</b></h3>                    
                    </div>
                    <div>
                        <h4>Total Donations made:</h4>
                        <h3><b>{totalDonations}</b></h3>
                    </div>
                    <div>
                        <h4>Last Donation Status:{" "}</h4>
                        <h3><b>{lastDonation ? lastDonation.status : "N/A"}</b></h3>
                    </div>
                    <div>
                        <h4> Last Donation date:{' '}</h4>
                        <h3><b>{lastDonation ? new Date(lastDonation.lastAuth).toLocaleDateString("en-GB") : "N/A"}</b></h3>
                    </div>
                </div>
            </div>
        </>
    )
}