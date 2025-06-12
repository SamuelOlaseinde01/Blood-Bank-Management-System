import React, { useRef, useState } from "react";
import { getAllDonors } from "./admin-api";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader() {
    try {
        const allDonors = await getAllDonors();
        return allDonors;
    } catch (err) {
        toast.error(err.message, {
            toastId: "donation-load-fail",
        });
        return [];
    }
}

export default function Donors() {
    const donors = useLoaderData();

    const [selectedDonor, setSelectedDonor] = useState(null);
    const dialogRef = useRef();

    const openDialog = (donor) => {
        setSelectedDonor(donor);
        dialogRef.current.showModal();
    };

    const closeDialog = () => {
        dialogRef.current.close();
        setSelectedDonor(null);
    };

    const donorRows = donors.map((item, index) => (
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
        <div className="donors-history">
            <div className="donors-table">
                <h2 style={{ color: "red" }}>Donors</h2>
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
                    <tbody>{donorRows}</tbody>
                </table>
            </div>

            {/* View Details Dialog */}
            <dialog ref={dialogRef} className="dialog">
                {selectedDonor && (
                    <div className="donor-details">
                        <h3>Donor Details</h3>
                        <p><strong>Name:</strong> {`${selectedDonor.firstName} ${selectedDonor.lastName}`}</p>
                        <p><strong>Username:</strong> {selectedDonor.username}</p>
                        <p><strong>Gender:</strong> {selectedDonor.gender}</p>
                        <p><strong>Phone:</strong> {selectedDonor.phoneNo}</p>
                        <p><strong>Address:</strong> {selectedDonor.address}</p>
                        <p><strong>Genotype:</strong> {selectedDonor.genotype}</p>
                        <p><strong>Blood Type:</strong> {selectedDonor.bloodType}</p>
                        <p><strong>PCV:</strong> {selectedDonor.pcv}%</p>
                        <p><strong>Sugar Level:</strong> {selectedDonor.sugarLevel}mg/dl</p>
                        <p><strong>Disease:</strong> {selectedDonor.disease}</p>
                        <button onClick={closeDialog}>Close</button>
                    </div>
                )}
            </dialog>
        </div>
    );
}
