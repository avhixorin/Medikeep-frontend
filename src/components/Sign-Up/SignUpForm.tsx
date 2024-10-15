import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "rsuite";
import submitForm from "../../utils/submitForm";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./SignUpFrom.css";
import BackButton from "../Back-Button/BackButton";
import Swal from "sweetalert2";

interface BaseFormData {
  fullName: string;
  username: string;
  role: string;
  password: string;
  email: string;
  dateOfBirth: Date | null;
  phone: string;
  gender: string;
}

interface ConsultationTime {
  start: Date | null;
  end: Date | null;
}

interface DoctorFormData extends BaseFormData {
  medicalLicenseNumber: string;
  specialization: string;
  yearsOfExperience: string;
  clinicAffiliation: string;
  consultationHours: ConsultationTime[];
}

const TnC: React.FC = () => {
  return (
    <div className="tnc-container flex justify-start items-center">
      <p className="text-zinc-500 dark:text-zinc-400">
        By signing up, you accept our
        <Link className="text-blue-500 hover:text-blue-800 ml-2" to={"/tnc"}>
          terms and conditions
        </Link>
      </p>
    </div>
  );
};

const SignUpForm: React.FC = () => {
  const [formValues, setFormValues] = useState<BaseFormData>({
    email: "",
    fullName: "",
    username: "",
    role: "",
    password: "",
    gender: "",
    dateOfBirth: null,
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormValues((prev) => ({ ...prev, dateOfBirth: date }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate the role selection
    if (!formValues.role) {
      await Swal.fire({
        text: "Please select a role",
        icon: "error",
      });
      return;
    }
  
    // If the role is doctor, navigate to the doctor form
    if (formValues.role.toLowerCase() === "doctor") {
      navigate("/doctoraddform", { state: formValues });
    } else {
      try {
        // Submit form data for other roles
        const data = await submitForm(formValues);
        console.log("Data", data);
  
        if (data?.statusCode === 201) {
          // Success alert
          await Swal.fire({
            text: data.message,
            icon: "success",
          });
          navigate("/sign-in");
        }
      } catch (error) {


        let errorMessage = "Form submission failed. Please try again.";

        if (error instanceof Response) {
          const errorData = await error.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
  
        const errorMsg = JSON.parse(errorMessage);
        const actualMsg = errorMsg.message;
        await Swal.fire({
          text: actualMsg,
          icon: "error",
        });
      }
    }
  };
  

  const disableDates = (date: Date) => {
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    return year < 1951 || year > currentYear - 3;
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen p-4 bg-gradient-to-l from-blue-200 via-green-200 to-yellow-200">
      <div className="form-container bg-white">
        <div className="flex flex-col items-center justify-center bg-white">
          <div className="w-full mb-9 relative flex items-center justify-center">
            <div className="absolute left-0">
              <BackButton text={""} thickness={20} />
            </div>
            <p className="sititle text-center w-full">
              Sign Up and Get Started
            </p>
          </div>

          <form
            className="form grid gap-4 md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="input-group md:col-span-2">
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="sinput"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group md:col-span-2">
              <input
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                className="sinput"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="username"
                maxLength={7}
                value={formValues.username}
                onChange={handleChange}
                className="sinput"
                placeholder="Username"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="sinput"
                placeholder="Password"
                required
              />
            </div>
            <div className="input-group md:col-span-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Role
              </label>
              <div className="radio-inputs">
                <label className="radio">
                  <input
                    type="radio"
                    name="role"
                    value="Doctor"
                    checked={formValues.role === "Doctor"}
                    onChange={handleChange}
                  />
                  <span className="name">Doctor</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="role"
                    value="Patient"
                    checked={formValues.role === "Patient"}
                    onChange={handleChange}
                  />
                  <span className="name">Patient</span>
                </label>
              </div>
            </div>
            <div className="input-group md:col-span-2">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Gender
              </label>
              <div className="radio-inputs">
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formValues.gender === "Male"}
                    onChange={handleChange}
                  />
                  <span className="name">Male</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formValues.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span className="name">Female</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
                    value="Others"
                    checked={formValues.gender === "Others"}
                    onChange={handleChange}
                  />
                  <span className="name">Others</span>
                </label>
              </div>
            </div>
            <DatePicker
              value={formValues.dateOfBirth}
              onChange={handleDateChange}
              placement="topEnd"
              placeholder="Date of Birth"
              format="yyyy-MM-dd"
              shouldDisableDate={disableDates}
              className="no-border-input"
            />
            <PhoneInput
              defaultCountry="in"
              value={formValues.phone}
              onChange={(phone) =>
                setFormValues((prev) => ({ ...prev, phone }))
              }
              className="no-border-input"
            />
            <div className="input-group md:col-span-2">
              <TnC />
            </div>
            <div className="input-group md:col-span-2">
              <button className="form-btn">Create account</button>
            </div>
          </form>
          <div className="w-full">
            <p className="sign-up-label mt-4">
              Already have an account?{" "}
              <Link to="/sign-in" className="sign-up-link">
                Log in
              </Link>
            </p>
          </div>
          <div className="buttons-container mt-4">
            <div className="google-login-button">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                x="0px"
                y="0px"
                className="google-icon"
                viewBox="0 0 48 48"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.139,7.947,3l5.657-5.657C33.439,8.183,28.953,6,24,6C12.954,6,4,14.954,4,26
                s8.954,20,20,20s20-8.954,20-20C44,23.939,43.717,22.006,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.82C14.49,16.917,18.924,14,24,14c3.059,0,5.842,1.139,7.947,3l5.657-5.657
                C33.439,8.183,28.953,6,24,6C16.669,6,10.163,10.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.065,0,9.701-1.942,13.208-5.103l-6.074-5.201C28.856,35.945,26.502,36.922,24,37
                c-5.166,0-9.544-3.315-11.167-7.922l-6.521,5.021C10.249,39.963,16.694,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.791,2.236-2.205,4.148-4.048,5.512c0.002-0.001,0.004-0.003,0.006-0.004
                l6.074,5.201C35.173,38.573,40,32.486,40,26C40,23.939,39.717,22.006,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </div>
            {/* <div className="facebook-login-button">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22,12c0-5.521-4.479-10-10-10S2,6.479,2,12c0,5.001,3.658,9.127,8.438,9.876v-6.985H7.896v-2.891h2.541v-2.203
                c0-2.509,1.492-3.889,3.774-3.889c1.094,0,2.238,0.195,2.238,0.195v2.462h-1.26c-1.242,0-1.629,0.771-1.629,1.563v1.872h2.773
                l-0.443,2.891h-2.33v6.985C18.342,21.127,22,17.001,22,12z"></path>
              </svg>
              Sign in with Facebook
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export type { DoctorFormData, BaseFormData };

export default SignUpForm;
