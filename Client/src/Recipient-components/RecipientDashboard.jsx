import React from "react";
import { getPendingRequestCount, getAcceptedRequestCount, getRejectedRequestCount, recipientGetCreds, recipientGetRequests, getLastRequest} from "../Form-components/Recipient-forms/recipientApi.jsx";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader({request}) {
    const url = new URL(request.url).searchParams.get("username")
    try {
        const creds = await recipientGetCreds(url)
        const pendingRequestCount = await getPendingRequestCount(url)
        const acceptedRequestCount = await getAcceptedRequestCount(url)
        const rejectedRequestCount = await getRejectedRequestCount(url)
        const totalRequests = await recipientGetRequests(url)
        const lastRequest = await getLastRequest(url)
        const data = [
            creds, 
            pendingRequestCount,
            acceptedRequestCount,
            rejectedRequestCount,
            totalRequests,
            lastRequest
        ]
        return data
    } catch(err) {
        toast.error(err.message, {
            toastId: "Request-load-fail",
        });
        return []
    }
}

export default function RecipientDashboard() { 
    const data = useLoaderData()
    const userData = data[0]
    const pendingRequests = data[1]
    const acceptedRequests = data[2]
    const rejectedRequests = data[3]
    const totalRequests = data[4].length
    const lastRequest = data[5]
    
    return (
        <>
            <div className="recipient-dashboard">
                <h5>Welcome, {userData.firstName}</h5>
                <h2>Overview:</h2>
                <div className="recipient-dashboard-box-container">
                    <div>
                        <h4>Pending {pendingRequests > 1 ? "requests:" : "request:" }</h4>
                        <h3><b>{pendingRequests}</b></h3>
                    </div>
                    <div>
                        <h4>Accepted {acceptedRequests > 1 ? "requests: " : "request: " }</h4>
                        <h3><b>{acceptedRequests}</b></h3>                    
                    </div>
                    <div>
                        <h4>Rejected {rejectedRequests > 1 ? "requests:" : "request:" }</h4>
                        <h3><b>{rejectedRequests}</b></h3>                    
                    </div>
                    <div>
                        <h4>Total Requests made:</h4>
                        <h3><b>{totalRequests}</b></h3>
                    </div>
                    <div>
                        <h4>Last Request Status:{" "}</h4>
                        <h3><b>{lastRequest ? lastRequest.status : "N/A"}</b></h3>
                    </div>
                    <div>
                        <h4>Last Request date:{' '}</h4>
                        <h3><b>{lastRequest ? new Date(lastRequest.dates).toLocaleDateString("en-GB") : "N/A"}</b></h3>
                    </div>
                </div>
            </div>
        </>
    )
}