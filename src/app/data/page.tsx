"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { port, endpoint } from "../../../server"

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
  const router = useRouter();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/submit-form");
        // const response = await fetch(`http://localhost:${port}/${endpoint.submitForm}`);

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
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Back
        </button>
      </header>
      <h1>Previous Submissions</h1>
      {formData.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Password</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Address</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Bio</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Birthdate</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((entry, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {entry.formData.email || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {entry.formData.password || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {`${entry.formData.street || "N/A"}, ${entry.formData.city || "N/A"}, ${entry.formData.state || "N/A"}, ${entry.formData.zip || "N/A"}`}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {entry.formData.bio || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {entry.formData.birthdate || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );  
}
