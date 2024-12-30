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
    password: string;
}

interface FormDataEntry {
    formData: FormData;
  }

export default function DataPage() {
    const [formData, setFormData] = useState<FormDataEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/submit-form");
                const json = await response.json();

                if (response.ok) {
                    if (json.data) {
                        setFormData(json.data);
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
  <h1>Previous Submissions</h1>
  {formData.length === 0 ? (
    <p>No submissions found.</p>
  ) : (
    <div className="grid-container">
      {formData.map((entry, index) => {
        return (
          <div key={index} className="grid-item">
            {/* Accessing formData correctly */}
            <div><strong>Email:</strong> {entry.formData.email || "N/A"}</div>
            <div><strong>Address:</strong> {entry.formData.street || "N/A"}, {entry.formData.city || "N/A"}, {entry.formData.state || "N/A"}, {entry.formData.zip || "N/A"}</div>
            <div><strong>Bio:</strong> {entry.formData.bio || "N/A"}</div>
            <div><strong>Birthdate:</strong> {entry.formData.birthdate || "N/A"}</div>
            <hr />
          </div>
        );
      })}
    </div>
  )}
</div>

    );
}
