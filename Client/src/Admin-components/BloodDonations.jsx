import React from "react";
import { getAllDonations } from "./admin-api";
import { Form, Link, useSearchParams } from "react-router-dom";
import { updateDonationStatus } from "./admin-api";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader() {
    try {
        const allDonations = await getAllDonations()
        return allDonations
    } catch (err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return []
    }
}

export async function action({request}) {
    const formData = await request.formData()
    const rId = formData.get("id")
    const rStatus = formData.get("status")
    try {
        const msg = await updateDonationStatus({ rId, rStatus })
        toast(msg)
        return null
    } catch (err) {
        toast.error(err.message)
    }
}

export default function BloodDonations() {
    const donation = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.get("status")

    const filterStatus = status ? donation.filter(char => char.status.toLowerCase() === status.toLowerCase()) : donation

    const datas = filterStatus.map((item, index) => (
        <tr key={item.id || index}>
                    <th>{index + 1}</th>
                    <th>{item.username}</th>
                    <th>{item.bloodUnit}</th>
                    <th>{item.bloodType}</th>
                    <th>{item.disease}</th>
            <th>
            {item.status === "Pending" ? (
                    <>
                    <div className="accept-reject">
                      <Form method="post">
                        <input type="hidden" name="id" value={item._id} />
                        <input type="hidden" name="status" value="Accepted" />
                        <button type="submit" className="accept-donations">Accept</button>
                      </Form>
                      <Form method="post">
                        <input type="hidden" name="id" value={item._id} />
                        <input type="hidden" name="status" value="Rejected" />
                        <button type="submit" className="reject-donations">Reject</button>
                      </Form>
                    </div>
                    </>
                  ) : (
                    item.status.charAt(0).toUpperCase() + item.status.slice(1)
            )}
            </th>
            <th>{item.dates}</th>
        </tr>
    ));

    return (
        <div className="blood-donations">
            <div className="blood-donations-table">
                <h2 style={{ color: "red" }}>Blood Donations</h2>
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
                            <th>Username</th>
                            <th>Unit(ml)</th>
                            <th>Blood type</th>
                            <th>Disease</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>{datas}</tbody>
                </table>
            </div>
        </div>
    );
}
