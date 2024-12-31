"use client";

import "../globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: { [key: string]: boolean } }>({});

  useEffect(() => {
    const savedOptions = localStorage.getItem("admin-selected-options");
    if (savedOptions) {
      setSelectedOptions(JSON.parse(savedOptions));
    } else {
      setSelectedOptions({
        2: { aboutMe: false, address: true, birthdate: false },
        3: { aboutMe: false, address: false, birthdate: true },
      });
    }
  }, []);

  const handleCheckboxChange = (option: string, page: number) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = { ...prevSelectedOptions };
      const isCurrentlyChecked = updatedOptions[page][option];

      if (isCurrentlyChecked) {
        updatedOptions[page][option] = false;
      } else {
        updatedOptions[page][option] = true;
        const otherPage = page === 2 ? 3 : 2;

        if (updatedOptions[otherPage][option]) {
          updatedOptions[otherPage][option] = false;
        }
      }
      return updatedOptions;
    });
  };

  const handleSave = () => {
    localStorage.setItem("admin-selected-options", JSON.stringify(selectedOptions));
    router.push("/");
  };

  const isSaveButtonDisabled = () => {
    const page2FieldsSelected = Object.values(selectedOptions[2] || {}).filter(Boolean).length;
    const page3FieldsSelected = Object.values(selectedOptions[3] || {}).filter(Boolean).length;

    return !(page2FieldsSelected >= 1 && page2FieldsSelected <= 2) ||
      !(page3FieldsSelected >= 1 && page3FieldsSelected <= 2);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Select page elements for the onboarding flow:</p>
  
      <div>
        <h3>About Me Section</h3>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions[2]?.aboutMe || false}
            onChange={() => handleCheckboxChange("aboutMe", 2)}
          />
          Present on Page 2
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions[3]?.aboutMe || false}
            onChange={() => handleCheckboxChange("aboutMe", 3)}
          />
          Present on Page 3
        </label>
      </div>
  
      <div>
        <h3>Address Collection</h3>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions[2]?.address || false}
            onChange={() => handleCheckboxChange("address", 2)}
          />
          Present on Page 2
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions[3]?.address || false}
            onChange={() => handleCheckboxChange("address", 3)}
          />
          Present on Page 3
        </label>
      </div>
  
      <div>
        <h3>Birthdate Selection</h3>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions[2]?.birthdate || false}
            onChange={() => handleCheckboxChange("birthdate", 2)}
          />
          Present on Page 2
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions[3]?.birthdate || false}
            onChange={() => handleCheckboxChange("birthdate", 3)}
          />
          Present on Page 3
        </label>
      </div>
  
      <button
        className="button"
        onClick={handleSave}
        disabled={isSaveButtonDisabled()}
      >
        Save Options
      </button>
    </div>
  );  
}
