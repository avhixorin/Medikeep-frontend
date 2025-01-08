import { User } from "@/types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSubmitForm = () => {
  const navigate = useNavigate();

  const submitForm = async (formData: User) => {
    try {
      const registerUrl: string = import.meta.env.VITE_SIGN_UP_URL;

      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }

      toast.success("User registered successfully");
      navigate("/login");

      return response.json();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
      throw error;
    }
  };

  return { submitForm };
};

export default useSubmitForm;
