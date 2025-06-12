import React from "react";
import { recipientGetRequests } from "../Form-components/Recipient-forms/recipientApi";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader() {
    const username = sessionStorage.getItem("username")
    try{
        const data = await recipientGetRequests(username)
        return Array.isArray(data) ? data : [data];
    } catch(err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
          });
        return []
    }
}

export default function RecipientHistory() {
    const request = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.get("status")

    const filterStatus = status ? request.filter(char => char.status.toLowerCase() === status.toLowerCase()) : request

    const requests = filterStatus.map((item, index) => (
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
            <div className="recipient-history">
                <div className="recipient-table">
                <h2 style={{color: "red"}} className="">History</h2>
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
                            {requests}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}