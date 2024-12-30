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