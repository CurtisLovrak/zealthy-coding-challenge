"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number | string }>({
        // Store selections as {element: page}, where "none", 2, and 3 are valid values
        aboutMe: "none",
        address: "none",
        birthdate: "none",
    });

    // Load selected options from localStorage on mount
    useEffect(() => {
        const savedOptions = localStorage.getItem("admin-selected-options");
        if (savedOptions) {
            setSelectedOptions(JSON.parse(savedOptions));
        } else {
            setSelectedOptions({
                aboutMe: 2, // Default page for aboutMe (page 2)
                address: 2, // Default page for address (page 2)
                birthdate: 3, // Default page for birthdate (page 3)
            });
        }
    }, []);

    const handleCheckboxChange = (option: string, page: number) => {
        setSelectedOptions((prev) => {
            const updatedOptions = { ...prev };

            // Toggle between pages or deselect
            if (updatedOptions[option] === page) {
                updatedOptions[option] = "none"; // Deselect
            } else {
                updatedOptions[option] = page; // Select the page
            }

            // Ensure at least one element is selected for both page 2 and page 3
            if (page === 2) {
                const page2Selected = Object.values(updatedOptions).filter(val => val === 2).length;
                if (page2Selected === 0) {
                    updatedOptions[option] = 2; // Revert to page 2 if no element is selected for page 2
                }
            } else if (page === 3) {
                const page3Selected = Object.values(updatedOptions).filter(val => val === 3).length;
                if (page3Selected === 0) {
                    updatedOptions[option] = 3; // Revert to page 3 if no element is selected for page 3
                }
            }

            return updatedOptions;
        });
    };

    const handleSave = () => {
        localStorage.setItem("admin-selected-options", JSON.stringify(selectedOptions));
        router.push("/");
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
                        checked={selectedOptions.aboutMe === 2}
                        onChange={() => handleCheckboxChange("aboutMe", 2)}
                    />
                    Present on Page 2
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOptions.aboutMe === 3}
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
                        checked={selectedOptions.address === 2}
                        onChange={() => handleCheckboxChange("address", 2)}
                    />
                    Present on Page 2
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOptions.address === 3}
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
                        checked={selectedOptions.birthdate === 2}
                        onChange={() => handleCheckboxChange("birthdate", 2)}
                    />
                    Present on Page 2
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOptions.birthdate === 3}
                        onChange={() => handleCheckboxChange("birthdate", 3)}
                    />
                    Present on Page 3
                </label>
            </div>

            <button
                onClick={handleSave}
                disabled={
                    Object.values(selectedOptions).filter(val => val !== "none").length < 2
                }
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: Object.values(selectedOptions).filter(val => val !== "none").length >= 2 ? "blue" : "gray",
                    color: "white",
                    border: "none",
                    cursor: Object.values(selectedOptions).filter(val => val !== "none").length >= 2 ? "pointer" : "not-allowed",
                }}
            >
                Save Options
            </button>
            {/* <button
                onClick={handleSave}
                disabled={
                    Object.values(selectedOptions).filter(val => val !== "none").length < 2
                }
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor:
                        Object.values(selectedOptions).filter(val => val !== "none").length >= 2
                        ? "blue"
                        : "gray",
                    color: "white",
                    border: "none",
                    cursor:
                        Object.values(selectedOptions).filter(val => val !== "none").length >= 2
                        ? "pointer"
                        : "not-allowed",
                }}
            >
                Save Options
            </button> */}
            <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
        </div>
    );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminPage() {
//     const router = useRouter();
//     const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Default to empty

//     // Load selected options from localStorage on mount
//     useEffect(() => {
//         const savedOptions = localStorage.getItem("admin-selected-options");
//         if (savedOptions) {
//             setSelectedOptions(JSON.parse(savedOptions));
//         } else {
//             // Set default selections if nothing is saved
//             setSelectedOptions(["aboutMe", "address"]);
//         }
//     }, []);

//     const handleCheckboxChange = (option: string) => {
//         setSelectedOptions((prev) => {
//             if (prev.includes(option)) {
//                 return prev.filter((item) => item !== option);
//             } else {
//                 return [...prev, option];
//             }
//         });
//     };

//     const handleSave = () => {
//         localStorage.setItem("admin-selected-options", JSON.stringify(selectedOptions));
//         router.push("/");
//     };

//     return (
//         <div>
//             <h1>Admin Page</h1>
//             <p>Select exactly 2 options for the onboarding flow:</p>

//             <div>
//                 <label>
//                     <input
//                         type="checkbox"
//                         value="aboutMe"
//                         checked={selectedOptions.includes("aboutMe")}
//                         onChange={() => handleCheckboxChange("aboutMe")}
//                     />
//                     About Me Section
//                 </label>
//             </div>

//             <div>
//                 <label>
//                     <input
//                         type="checkbox"
//                         value="address"
//                         checked={selectedOptions.includes("address")}
//                         onChange={() => handleCheckboxChange("address")}
//                     />
//                     Address Collection
//                 </label>
//             </div>

//             <div>
//                 <label>
//                     <input
//                         type="checkbox"
//                         value="birthdate"
//                         checked={selectedOptions.includes("birthdate")}
//                         onChange={() => handleCheckboxChange("birthdate")}
//                     />
//                     Birthdate Selection
//                 </label>
//             </div>

//             <button
//                 onClick={handleSave}
//                 disabled={selectedOptions.length !== 2}
//                 style={{
//                     marginTop: "20px",
//                     padding: "10px 20px",
//                     backgroundColor: selectedOptions.length === 2 ? "blue" : "gray",
//                     color: "white",
//                     border: "none",
//                     cursor: selectedOptions.length === 2 ? "pointer" : "not-allowed",
//                 }}
//             >
//                 Save Options
//             </button>
//         </div>
//     );
// }