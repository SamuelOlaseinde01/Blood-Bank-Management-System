import React, { useRef, useState } from "react";
import { getAllRecipients } from "./admin-api";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader() {
    try {
        const allRecipients = await getAllRecipients();
        return allRecipients;
    } catch (err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return [];
    }
}

export default function Recipients() {
    const recipients = useLoaderData();

    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const dialogRef = useRef();

    const openDialog = (recipient) => {
        setSelectedRecipient(recipient);
        dialogRef.current.showModal();
    };

    const closeDialog = () => {
        dialogRef.current.close();
        setSelectedRecipient(null);
    };

    const recipientRows = recipients.map((item, index) => (
        <tr key={item._id || index}>
            <th>{index + 1}</th>
            <th>{item.username}</th>
            <th>{item.bloodType}</th>
            <th>{item.genotype}</th>
            <th>{item.disease}</th>
            <th>
                <button style={{cursor: "pointer"}} onClick={() => openDialog(item)}>View Details</button>
            </th>
        </tr>
    ));

    return (
        <div className="recipients-history">
            <div className="recipients-table">
                <h2 style={{ color: "red" }}>Recipients</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Blood type</th>
                            <th>Genotype</th>
                            <th>Disease</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{recipientRows}</tbody>
                </table>
            </div>

            {/* View Details Dialog */}
            <dialog ref={dialogRef} className="dialog">
                {selectedRecipient && (
                    <div className="recipient-details">
                        <h3>Recipient Details</h3>
                        <p><strong>Name:</strong> {`${selectedRecipient.firstName} ${selectedRecipient.lastName}`}</p>
                        <p><strong>Username:</strong> {selectedRecipient.username}</p>
                        <p><strong>Gender:</strong> {selectedRecipient.gender}</p>
                        <p><strong>Phone:</strong> {selectedRecipient.phoneNo}</p>
                        <p><strong>Address:</strong> {selectedRecipient.address}</p>
                        <p><strong>Genotype:</strong> {selectedRecipient.genotype}</p>
                        <p><strong>Blood Type:</strong> {selectedRecipient.bloodType}</p>
                        <p><strong>PCV:</strong> {selectedRecipient.pcv}%</p>
                        <p><strong>Sugar Level:</strong> {selectedRecipient.sugarLevel}mg/dl</p>
                        <p><strong>Disease:</strong> {selectedRecipient.disease}</p>
                        <button onClick={closeDialog}>Close</button>
                    </div>
                )}
            </dialog>
        </div>
    );
}
