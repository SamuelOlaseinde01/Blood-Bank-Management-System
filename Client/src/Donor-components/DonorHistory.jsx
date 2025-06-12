import React from "react";
import { donorGetDonations } from "../Form-components/Donor-forms/donorApi";
import { data, useLoaderData, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader() {
    try{
        const username = sessionStorage.getItem("username")
        const data = await donorGetDonations(username)
        return Array.isArray(data) ? data : [data];
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export default function DonorHistory() {
    const donation = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.get("status")

    const filterStatus = status ? donation.filter(char => char.status.toLowerCase() === status.toLowerCase()) : donation
    const donations = filterStatus.map((item, index) => (
            <tr key={item.id || index}>
                <th>{index + 1}</th>
                <th>{item.bloodUnit}</th>
                <th>{item.bloodType}</th>
                <th>{item.disease}</th>
                <th>{item.status}</th>
                <th>{item.dates}</th>
            </tr>
        )
    )
    return (
        <>
            <div className="donor-history">
                <div className="donor-table">
                <h2 style={{color: "red"}}>History</h2>
                <div className="filter-btn">
                    <button onClick={() => setSearchParams("")} className={status === null ? "button-all-clicked" : "button-all"}>All</button>
                    <button onClick={() => setSearchParams("?status=pending")} className={status === "pending" ? "button-pending-clicked" : "button-pending"}>Pending</button>                
                    <button onClick={() => setSearchParams("?status=accepted")} className={status === "accepted" ? "button-accepted-clicked" : "button-accepted"}>Accepted</button>
                    <button onClick={() => setSearchParams("?status=rejected")} className={status === "rejected" ? "button-rejected-clicked" : "button-rejected"}>Rejected</button>
                </div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Unit(ml)</th>
                                <th>Blood Type</th>
                                <th>Disease</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}