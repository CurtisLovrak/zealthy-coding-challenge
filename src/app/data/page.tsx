"use client";

import "../globals.css";
import { useRouter } from "next/navigation";
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
  createdAt: string;
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
        // const response = await fetch("http://localhost:5000/api/submit-form");
        const response = await fetch("api/submit-form");
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
      <header>
        <button className="form-button" onClick={() => router.push("/")}>Back</button>
      </header>

      <h1>Previous Submissions</h1>

      {formData.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Address</th>
              <th>Bio</th>
              <th>Birthdate</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.formData.email}</td>
                <td>{entry.formData.password}</td>
                <td>{`${entry.formData.street} ${entry.formData.city} ${entry.formData.state} ${entry.formData.zip}`}</td>
                <td>{entry.formData.bio}</td>
                <td>{entry.formData.birthdate}</td>
                <td>{entry.formData.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

