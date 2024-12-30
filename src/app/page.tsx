
// // import styles from "./page.module.css";

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function WizardPage() {
//     const router = useRouter();
//     const [step, setStep] = useState(1); // Default to Step 1
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//         street: "",
//         city: "",
//         state: "",
//         zip: "",
//         birthdate: "",
//     });
//     const [selectedSteps, setSelectedSteps] = useState<{ [key: string]: string }>({
//         aboutMe: "none",
//         address: "none",
//         birthdate: "none",
//     });

//     useEffect(() => {
//         const savedStep = localStorage.getItem("wizard-step");
//         if (savedStep) {
//             setStep(Number(savedStep));
//         }

//         const savedFormData = localStorage.getItem("wizard-form-data");
//         if (savedFormData) {
//             setFormData(JSON.parse(savedFormData));
//         }

//         const savedSelectedSteps = localStorage.getItem("admin-selected-options");
//         if (savedSelectedSteps) {
//             setSelectedSteps(JSON.parse(savedSelectedSteps));
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem("wizard-step", String(step));
//     }, [step]);

//     useEffect(() => {
//         localStorage.setItem("wizard-form-data", JSON.stringify(formData));
//     }, [formData]);

//     const handleNext = () => {
//         setStep((prev) => Math.min(prev + 1, 3)); // Cap at step 3
//     };

//     const handlePrev = () => {
//         setStep((prev) => Math.max(prev - 1, 1)); // Cap at step 1
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const isNextButtonDisabled = () => {
//         if (step === 1) {
//             return !formData.email || !formData.password;
//         }
//         if (step === 2) {
//             if (selectedSteps.address === "none") {
//                 return !formData.street || !formData.city || !formData.state || !formData.zip;
//             }
//             if (selectedSteps.birthdate === "none") {
//                 return !formData.birthdate;
//             }
//         }
//         return false;
//     };

//     return (
//         <div>
//             {/* Header */}
//             <header style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f0f0f0" }}>
//                 <h1>Wizard App</h1>
//                 <button
//                     onClick={() => router.push("/admin")}
//                     style={{ padding: "8px 12px", cursor: "pointer" }}
//                 >
//                     Admin Controls
//                 </button>
//             </header>

//             {/* Wizard Content */}
//             <h2>Step {step} of 3</h2>

//             {step === 1 && (
//                 <div>
//                     <form>
//                         <div>
//                             <label htmlFor="email">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password">Password:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </form>
//                 </div>
//             )}

//             {step === 2 && (
//                 <div>
//                     {selectedSteps.aboutMe === "page2" && (
//                         <textarea
//                             placeholder="Tell us about yourself..."
//                             style={{ width: "100%", height: "100px" }}
//                         />
//                     )}
//                     {selectedSteps.address === "page2" && (
//                         <form>
//                             <div>
//                                 <label htmlFor="street">Street Address:</label>
//                                 <input type="text" id="street" name="street" onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label htmlFor="city">City:</label>
//                                 <input type="text" id="city" name="city" onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label htmlFor="state">State:</label>
//                                 <input type="text" id="state" name="state" onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label htmlFor="zip">ZIP Code:</label>
//                                 <input type="text" id="zip" name="zip" onChange={handleInputChange} />
//                             </div>
//                         </form>
//                     )}
//                     {selectedSteps.birthdate === "page2" && (
//                         <div>
//                             <label htmlFor="birthdate">Birthdate:</label>
//                             <input type="date" id="birthdate" name="birthdate" onChange={handleInputChange} />
//                         </div>
//                     )}
//                 </div>
//             )}

//             {step === 3 && (
//                 <div>
//                     {selectedSteps.aboutMe === "page3" && (
//                         <textarea
//                             placeholder="Tell us about yourself..."
//                             style={{ width: "100%", height: "100px" }}
//                         />
//                     )}
//                     {selectedSteps.address === "page3" && (
//                         <form>
//                             <div>
//                                 <label htmlFor="street">Street Address:</label>
//                                 <input type="text" id="street" name="street" onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label htmlFor="city">City:</label>
//                                 <input type="text" id="city" name="city" onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label htmlFor="state">State:</label>
//                                 <input type="text" id="state" name="state" onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label htmlFor="zip">ZIP Code:</label>
//                                 <input type="text" id="zip" name="zip" onChange={handleInputChange} />
//                             </div>
//                         </form>
//                     )}
//                     {selectedSteps.birthdate === "page3" && (
//                         <div>
//                             <label htmlFor="birthdate">Birthdate:</label>
//                             <input type="date" id="birthdate" name="birthdate" onChange={handleInputChange} />
//                         </div>
//                     )}
//                 </div>
//             )}

//             <div>
//                 <button onClick={handlePrev} disabled={step === 1}>
//                     Previous
//                 </button>
//                 <button onClick={handleNext} disabled={step === 3 || isNextButtonDisabled()}>
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WizardPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // Default to Step 1
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        birthdate: "",
    });
    const [selectedSteps, setSelectedSteps] = useState<{ [key: string]: number | string }>({
        aboutMe: "none", // Can be "none", 2, or 3
        address: "none", // Can be "none", 2, or 3
        birthdate: "none", // Can be "none", 2, or 3
    });

    useEffect(() => {
        const savedStep = localStorage.getItem("wizard-step");
        if (savedStep) {
            setStep(Number(savedStep));
        }

        const savedFormData = localStorage.getItem("wizard-form-data");
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }

        const savedSelectedSteps = localStorage.getItem("admin-selected-options");
        if (savedSelectedSteps) {
            setSelectedSteps(JSON.parse(savedSelectedSteps));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("wizard-step", String(step));
    }, [step]);

    useEffect(() => {
        localStorage.setItem("wizard-form-data", JSON.stringify(formData));
    }, [formData]);

    const handleNext = () => {
        setStep((prev) => Math.min(prev + 1, 3)); // Cap at step 3
    };

    const handlePrev = () => {
        setStep((prev) => Math.max(prev - 1, 1)); // Cap at step 1
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isNextButtonDisabled = () => {
        // Step 1: Check if the email and password are filled
        if (step === 1) {
            return !formData.email || !formData.password;
        }
        
        // Step 2: Check if address fields are filled or if birthdate is selected but not filled
        if (step === 2) {
            if (selectedSteps.address === 2) {
                // Check if address fields are filled
                if (!formData.street || !formData.city || !formData.state || !formData.zip) {
                    return true;
                }
            }
            if (selectedSteps.birthdate === 2 && !formData.birthdate) {
                // Birthdate field is required but not filled
                return true;
            }
        }
        
        // Step 3: Same checks as Step 2, but for page 3
        if (step === 3) {
            if (selectedSteps.address === 3) {
                // Check if address fields are filled
                if (!formData.street || !formData.city || !formData.state || !formData.zip) {
                    return true;
                }
            }
            if (selectedSteps.birthdate === 3 && !formData.birthdate) {
                // Birthdate field is required but not filled
                return true;
            }
        }
        
        return false; // If no conditions are met, the button remains enabled
    };

    return (
        <div>
            {/* Header */}
            <header style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f0f0f0" }}>
                <h1>Wizard App</h1>
                <button
                    onClick={() => router.push("/admin")}
                    style={{ padding: "8px 12px", cursor: "pointer" }}
                >
                    Admin Controls
                </button>
            </header>

            {/* Wizard Content */}
            <h2>Step {step} of 3</h2>

            {step === 1 && (
                <div>
                    <form>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div>
                    {selectedSteps.aboutMe === 2 && (
                        <textarea
                            placeholder="Tell us about yourself..."
                            style={{ width: "100%", height: "100px" }}
                        />
                    )}
                    {selectedSteps.address === 2 && (
                        <form>
                            <div>
                                <label htmlFor="street">Street Address:</label>
                                <input type="text" id="street" name="street" onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="state">State:</label>
                                <input type="text" id="state" name="state" onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="zip">ZIP Code:</label>
                                <input type="text" id="zip" name="zip" onChange={handleInputChange} />
                            </div>
                        </form>
                    )}
                    {selectedSteps.birthdate === 2 && (
                        <div>
                            <label htmlFor="birthdate">Birthdate:</label>
                            <input type="date" id="birthdate" name="birthdate" onChange={handleInputChange} />
                        </div>
                    )}
                </div>
            )}

            {step === 3 && (
                <div>
                    {selectedSteps.aboutMe === 3 && (
                        <textarea
                            placeholder="Tell us about yourself..."
                            style={{ width: "100%", height: "100px" }}
                        />
                    )}
                    {selectedSteps.address === 3 && (
                        <form>
                            <div>
                                <label htmlFor="street">Street Address:</label>
                                <input type="text" id="street" name="street" onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="state">State:</label>
                                <input type="text" id="state" name="state" onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="zip">ZIP Code:</label>
                                <input type="text" id="zip" name="zip" onChange={handleInputChange} />
                            </div>
                        </form>
                    )}
                    {selectedSteps.birthdate === 3 && (
                        <div>
                            <label htmlFor="birthdate">Birthdate:</label>
                            <input type="date" id="birthdate" name="birthdate" onChange={handleInputChange} />
                        </div>
                    )}
                </div>
            )}

            <div>
                <button onClick={handlePrev} disabled={step === 1}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={step === 3 || isNextButtonDisabled()}>
                    Next
                </button>
            </div>
        </div>
    );
}
