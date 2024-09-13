import { BaseFormData, DoctorFormData } from "../components/Sign-Up/SignUpForm";
const submitForm = async (formData: BaseFormData | DoctorFormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/register', {
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