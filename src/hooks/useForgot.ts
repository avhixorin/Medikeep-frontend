import toast from "react-hot-toast";

const useForgot = () => {
    const forgot = async (email: string, dateOfBirth: Date, password?: string) => {
        try {
            const forgetUrl1 = import.meta.env.VITE_FORGOT_URL;
            const forgetUrl2 = import.meta.env.VITE_FORGOT_URL2;

            const verificationResponse = await fetch(forgetUrl1, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, dateOfBirth }),
            });

            if (!verificationResponse.ok) {
                throw new Error(`Verification failed: ${verificationResponse.statusText}`);
            }

            const verificationData = await verificationResponse.json();

            if (verificationData.statusCode !== 200) {
                throw new Error("Verification failed. Please check your details.");
            }

            toast.success("Verification successful.");

            if (password) {
                const passwordUpdateResponse = await fetch(forgetUrl2, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (!passwordUpdateResponse.ok) {
                    throw new Error(`Password update failed: ${passwordUpdateResponse.statusText}`);
                }

                const passwordUpdateData = await passwordUpdateResponse.json();

                if (passwordUpdateData.statusCode === 200) {
                    toast.success("Password updated successfully.");
                    return { verificationData, passwordUpdateData };
                } else {
                    throw new Error("Password update failed. Please try again.");
                }
            }

            return { verificationData };
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
                throw error; 
            } else {
                toast.error("An unexpected error occurred");
                throw new Error("Unexpected error occurred");
            }
        }
    };

    return { forgot };
};

export default useForgot;
