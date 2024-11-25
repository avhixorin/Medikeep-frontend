import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "rsuite";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./SignUpForm.css";
import BackButton from "../Back-Button/BackButton";
import { registerUser } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store/store";
import { User } from "@/types/types";


const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<User>({
    initialValues: {
      _id: null,
      email: "",
      fullName: "",
      username: "",
      password: "",
      role: "",
      theme: "light",
      gender: "",
      dateOfBirth: new Date(),
      phone: "",
      availability: {
        days: [],
        timeSlots: [],
      },
      clinicalAddress: {
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      fullName: Yup.string().required("Required"),
      username: Yup.string().max(7, "Must be 7 characters or less").required("Required"),
      password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
      role: Yup.string().required("Please select a role"),
      gender: Yup.string().required("Please select a gender"),
      dateOfBirth: Yup.date().nullable().required("Please select a date of birth"),
      phone: Yup.string().required("Please enter your phone number"),
    }),
    onSubmit: async (values) => {
      if (values.role.toLowerCase() === "doctor") {
        navigate("/doctoraddform", { state: values });
        return;
      }
      try {
        const response = await dispatch(registerUser(values)).unwrap();
        if (response) {
          await Swal.fire({
            text: "Account created successfully. Please sign in to continue.",
            icon: "success",
          });
          navigate("/sign-in");
        }
      } catch (error) {
        const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Form submission failed. Please try again.";
        await Swal.fire({
          text: errorMessage,
          icon: "error",
        });
      }
    },
  });

  return (
    <div className="relative flex justify-center items-center min-h-screen p-4 bg-gradient-to-l from-blue-200 via-green-200 to-yellow-200">
      <div className="form-container bg-white">
        <div className="flex flex-col items-center justify-center bg-white">
          <div className="w-full mb-9 relative flex items-center justify-center">
            <div className="absolute left-0">
              <BackButton text="" thickness={20} />
            </div>
            <p className="sititle font-bold text-2xl text-center w-full">Sign Up and Get Started</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="form grid gap-4 md:grid-cols-2">
            <div className="input-group md:col-span-2">
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="sinput"
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
            </div>

            <div className="input-group md:col-span-2">
              <input
                type="text"
                {...formik.getFieldProps("fullName")}
                className="sinput"
                placeholder="Full Name"
              />
              {formik.touched.fullName && formik.errors.fullName ? <div className="error">{formik.errors.fullName}</div> : null}
            </div>

            <div className="input-group">
              <input
                type="text"
                {...formik.getFieldProps("username")}
                className="sinput"
                placeholder="Username"
              />
              {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
            </div>

            <div className="input-group">
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="sinput"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
            </div>

            <div className="input-group md:col-span-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="radio-inputs">
                <label className="radio">
                  <input
                    type="radio"
                    name="role"
                    value="Doctor"
                    onChange={formik.handleChange}
                    checked={formik.values.role === "Doctor"}
                  />
                  <span className="name">Doctor</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="role"
                    value="Patient"
                    onChange={formik.handleChange}
                    checked={formik.values.role === "Patient"}
                  />
                  <span className="name">Patient</span>
                </label>
              </div>
              {formik.touched.role && formik.errors.role ? <div className="error">{formik.errors.role}</div> : null}
            </div>

            <div className="input-group md:col-span-2 flex justify-between items-center">
              <div>
              <DatePicker
                value={formik.values.dateOfBirth}
                onChange={(date) => formik.setFieldValue("dateOfBirth", date)}
                placeholder="Date of Birth"
                format="yyyy-MM-dd"
                className=""
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? <div className="error">{String(formik.errors.dateOfBirth)}</div> : null}
              </div>
              <div>
              <PhoneInput
              defaultCountry="in"
              value={formik.values.phone}
              onChange={(phone) => formik.setFieldValue("phone", phone)}
              className="no-border-input"
            />
            {formik.touched.phone && formik.errors.phone ? <div className="error">{formik.errors.phone}</div> : null}
              </div>
              
            

            
            </div>
            <div className="input-group md:col-span-2">
              <button type="submit" className="form-btn">Create account</button>
            </div>
          </form>

          <div className="w-full">
            <p className="sign-up-label mt-4">
              Already have an account?{" "}
              <Link to="/sign-in" className="sign-up-link">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
