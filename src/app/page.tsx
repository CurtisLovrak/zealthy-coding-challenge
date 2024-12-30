"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WizardPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        birthdate: "",
        bio: "",
    });
    const [selectedSteps, setSelectedSteps] = useState<{ [key: number]: { [key: string]: boolean } }>({});

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
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const handlePrev = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isNextButtonDisabled = () => {
        if (step === 1) {
            return !formData.email || !formData.password;
        }

        if (step === 2) {
            if (selectedSteps[2]?.address) {
                return !formData.street || !formData.city || !formData.state || !formData.zip;
            }
            if (selectedSteps[2]?.birthdate) {
                return !formData.birthdate;
            }
            if (selectedSteps[2]?.aboutMe) {
                return !formData.bio;
            }
        }
				if (step === 3) {
						if (selectedSteps[3]?.address) {
								return !formData.street || !formData.city || !formData.state || !formData.zip;
						}
						if (selectedSteps[3]?.birthdate) {
								return !formData.birthdate;
						}
						if (selectedSteps[3]?.aboutMe) {
								return !formData.bio;
						}
				}

        return false;
    };

		const handleSubmit = async () => {
			try {
                const currentTimestamp = new Date().toISOString();
					const response = await fetch("http://localhost:5000/api/submit-form", {
							method: "POST",
							headers: {
									"Content-Type": "application/json",
							},
							body: JSON.stringify({
									formData,
                  createdAt: currentTimestamp,
							}),
					});
	
					const result = await response.json();
	
					if (!response.ok) {
							console.error("Error submitting form:", result.message);
					} else {
							console.log("Form submitted successfully:", result.message);
							setFormData({
									email: "",
									password: "",
									street: "",
									city: "",
									state: "",
									zip: "",
									birthdate: "",
									bio: "",
							});
							setSelectedSteps({});
							setStep(1);
							localStorage.setItem("wizard-step", "1");
					}
			} catch (error) {
					console.error("Error with form submission:", error);
			}
	};
	

    return (
        <div>
            <header style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f0f0f0" }}>
                <h1>Wizard App</h1>
                <button
                    onClick={() => router.push("/admin")}
                    style={{ padding: "8px 12px", cursor: "pointer" }}
                >
                    Admin Controls
                </button>
            </header>

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
                    {selectedSteps[2]?.aboutMe && (
                        <textarea
                            name="bio"
                            placeholder="Tell us about yourself..."
                            style={{ width: "100%", height: "100px" }}
                            value={formData.bio}
                            onChange={handleInputChange}
                        />
                    )}
                    {selectedSteps[2]?.address && (
                        <form>
                            <div>
                                <label htmlFor="street">Street Address:</label>
                                <input type="text" id="street" name="street" value={formData.street} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="state">State:</label>
                                <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="zip">ZIP Code:</label>
                                <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} />
                            </div>
                        </form>
                    )}
                    {selectedSteps[2]?.birthdate && (
                        <div>
                            <label htmlFor="birthdate">Birthdate:</label>
                            <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleInputChange} />
                        </div>
                    )}
                </div>
            )}

            {step === 3 && (
                <div>
                    <h3>Final Step: Review and Submit</h3>
                    <form>
                        {selectedSteps[3]?.aboutMe && (
                            <div>
                                <label htmlFor="bio">Bio:</label>
                                <textarea
                                    name="bio"
                                    placeholder="Tell us about yourself..."
                                    style={{ width: "100%", height: "100px" }}
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        {selectedSteps[3]?.address && (
                            <>
                                <div>
                                    <label htmlFor="street">Street:</label>
                                    <input type="text" id="street" name="street" value={formData.street} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="city">City:</label>
                                    <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="state">State:</label>
                                    <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="zip">ZIP:</label>
                                    <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} />
                                </div>
                            </>
                        )}
                        {selectedSteps[3]?.birthdate && (
                            <div>
                                <label htmlFor="birthdate">Birthdate:</label>
                                <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleInputChange} />
                            </div>
                        )}
                    </form>
                    <button
												disabled={isNextButtonDisabled()}
                        onClick={handleSubmit}
                        style={{
                            padding: "10px 20px",
                            marginTop: "20px",
                            backgroundColor: isNextButtonDisabled() ? "gray" : "green",
                            color: "white",
                            border: "none",
														cursor: isNextButtonDisabled() ? "not-allowed" : "pointer"
                        }}
                    >
                        Submit
                    </button>
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <button
                    onClick={handlePrev}
                    disabled={step === 1}
                    style={{ padding: "10px 20px" }}
                >
                    Previous
                </button>
                {step !== 3 && (
                    <button
                        onClick={handleNext}
                        disabled={isNextButtonDisabled()}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: isNextButtonDisabled() ? "gray" : "blue",
                            color: "white",
                            border: "none",
                            cursor: isNextButtonDisabled() ? "not-allowed" : "pointer",
                        }}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}
