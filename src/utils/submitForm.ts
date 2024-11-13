import { BaseFormData, DoctorFormData } from "../components/Sign-Up/SignUpForm";
const submitForm = async (formData: BaseFormData | DoctorFormData) => {
    try {
      const registerUrl = import.meta.env.VITE_SIGN_UP_URL;
      const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Something went wrong');
      }
      console.log("Response",response)
    return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export default submitForm;