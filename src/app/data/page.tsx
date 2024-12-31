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
  createdAt: string; // added the createdAt field
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-form/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFormData(formData.filter(entry => entry.formData.email !== id)); // Assuming email is unique as an identifier
      } else {
        setError("Failed to delete the record.");
      }
    } catch (error) {
      console.error("Error deleting the record:", error);
      setError("An error occurred while deleting the record.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <header>
        <button onClick={() => router.push("/")}>Back</button>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.formData.email || "N/A"}</td>
                <td>{entry.formData.password || "N/A"}</td>
                <td>{`${entry.formData.street || "N/A"}, ${entry.formData.city || "N/A"}, ${entry.formData.state || "N/A"}, ${entry.formData.zip || "N/A"}`}</td>
                <td>{entry.formData.bio || "N/A"}</td>
                <td>{entry.formData.birthdate || "N/A"}</td>
                <td>{entry.formData.createdAt}</td>
                <td>
                  <button onClick={() => handleDelete(entry.formData.email)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
