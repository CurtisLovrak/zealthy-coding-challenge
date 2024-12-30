"use client";

import { useEffect, useState } from "react";

interface FormData {
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    bio: string;
    birthdate: string;
}

export default function DataPage() {
    const [formData, setFormData] = useState<FormData[]>([]); // Array to store all submissions
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                // Update the URL to point to the Express server running on port 5000
                const response = await fetch("http://localhost:5000/api/submit-form");
                const json = await response.json(); // Parse the response JSON
                console.log(json, response.ok)

                if (response.ok) {
                    // Ensure formData is an array
                    setFormData(Array.isArray(json.formData) ? json.formData : []);
                } else {
                    setError(json.message || "Failed to fetch data.");
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
                setError("An error occurred while fetching the data.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Previous Submissions</h1>
            {formData.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                <ul>
                    {formData.map((submission, index) => (
                        <li key={index}>
                            <div>
                                <strong>Email:</strong> {submission.email}
                            </div>
                            <div>
                                <strong>Address:</strong> {submission.street}, {submission.city}, {submission.state}, {submission.zip}
                            </div>
                            <div>
                                <strong>Bio:</strong> {submission.bio}
                            </div>
                            <div>
                                <strong>Birthdate:</strong> {submission.birthdate}
                            </div>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
            {/* For debugging, show the raw JSON data */}
            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
    );
}
// "use client";

// import { useState, useEffect } from "react";

// export default function DataPage() {
//     const [formData, setFormData] = useState<FormData[]>([]); // Array to store all submissions
//     const [selectedSteps, setSelectedSteps] = useState<[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string>("");

//     useEffect(() => {
//         const fetchFormData = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/api/submit-form");
//                 const json = await response.json(); // Parse the response JSON

//                 if (response.ok) {
//                     console.log("Fetched data:", json); // Log the whole response for debugging
//                     if (json.data) {
//                         setFormData(json.data.formData); // Set formData
//                         setSelectedSteps(json.data.selectedSteps); // Set selectedSteps
//                     } else {
//                         setError("Invalid data format.");
//                     }
//                 } else {
//                     setError(json.message || "Failed to fetch data.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching form data:", error);
//                 setError("An error occurred while fetching the data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFormData();
//     }, []);

//     // Debugging: log the formData state after it's updated
//     useEffect(() => {
//         console.log("Form Data:", formData);
//     }, [formData]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h1>Previous Submissions</h1>
//             {formData.length === 0 ? (
//                 <p>No submissions found.</p>
//             ) : (
//                 <ul>
//                     {formData.map((submission, index) => (
//                         <li key={index}>
//                             <div>
//                                 <strong>Email:</strong> {submission.email}
//                             </div>
//                             <div>
//                                 <strong>Address:</strong> {submission.street}, {submission.city}, {submission.state}, {submission.zip}
//                             </div>
//                             <div>
//                                 <strong>Bio:</strong> {submission.bio}
//                             </div>
//                             <div>
//                                 <strong>Birthdate:</strong> {submission.birthdate}
//                             </div>
//                             <hr />
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             {/* For debugging, show the raw JSON data */}
//             <pre>{JSON.stringify(formData, null, 2)}</pre>
//         </div>
//     );
// }
