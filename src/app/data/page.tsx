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
    password: string; // Including password if needed
}

export default function DataPage() {
    const [formData, setFormData] = useState<FormData | null>(null); // Store single form submission object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/submit-form");
                const json = await response.json(); // Parse the response JSON

                if (response.ok) {
                    // Assuming json.formData is the object
                    if (json.formData) {
                        setFormData(json.formData.formData); // Set the single form submission object
                    } else {
                        setError("No form data found.");
                    }
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
            <h1>Previous Submission</h1>
            {!formData ? (
                <p>No submission found.</p>
            ) : (
                <div>
                    <div>
                        <strong>Email:</strong> {formData.email}
                    </div>
                    <div>
                        <strong>Address:</strong> {formData.street}, {formData.city}, {formData.state}, {formData.zip}
                    </div>
                    <div>
                        <strong>Bio:</strong> {formData.bio}
                    </div>
                    <div>
                        <strong>Birthdate:</strong> {formData.birthdate}
                    </div>
                    <hr />
                </div>
            )}
            {/* For debugging, show the raw JSON data */}
        </div>
    );
}
// "use client";

// import { useEffect, useState } from "react";

// interface FormData {
//     email: string;
//     street: string;
//     city: string;
//     state: string;
//     zip: string;
//     bio: string;
//     birthdate: string;
//     password: string; // Including password if needed
// }
// interface SelectedSteps {
//     2: {
//         aboutMe: boolean, 
//         address: boolean, 
//         birthdate: boolean
//     },
//     3: {
//         aboutMe: boolean, 
//         address: boolean, 
//         birthdate: boolean
//     }
// }

// interface FormDataResponse {
//     formData: FormData;
//     selectedSteps: SelectedSteps; // Adjust type of selectedSteps based on your actual structure
// }

// export default function DataPage() {
//     const [formDataList, setFormDataList] = useState<FormDataResponse[]>([]); // Store an array of form data and selected steps
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string>("");

//     useEffect(() => {
//         const fetchFormData = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/api/submit-form");
//                 const json = await response.json();

//                 if (response.ok) {
//                     // Now json.data is an array of form submissions
//                     if (Array.isArray(json.data)) {
//                         setFormDataList(json.data); // Store the data directly
//                     } else {
//                         setError("No form data found.");
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

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h1>Previous Submissions</h1>
//             {formDataList.length === 0 ? (
//                 <p>No submissions found.</p>
//             ) : (
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Email</th>
//                                 <th>Address</th>
//                                 <th>Bio</th>
//                                 <th>Birthdate</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* Iterating over all form submissions */}
//                             {formDataList.map((data, index) => (
//                                 <tr key={index}>
//                                     <td>{data.formData.email}</td>
//                                     <td>{`${data.formData.street}, ${data.formData.city}, ${data.formData.state}, ${data.formData.zip}`}</td>
//                                     <td>{data.formData.bio}</td>
//                                     <td>{data.formData.birthdate}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }
