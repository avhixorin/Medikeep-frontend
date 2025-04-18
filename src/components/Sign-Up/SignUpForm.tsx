import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserFields } from "@/redux/features/authSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { testimonials } from "../Landing-page/Benefits/Testemonials/testimonials";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import { Button } from "../ui/button";
import { User } from "@/types/types";
import useSubmitForm from "@/utils/submitForm";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import OTPForm from "./Steps/OtpForm";
import { setEmailStatus, storeFormData } from "@/utils/indexedDb";

const initialFormValues: User = {
  role: "patient",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  medicalLicenseNumber: "",
  specialization: "",
  yearsOfExperience: 0,
};

const Sidebar: React.FC<{
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
}> = ({ currentSlide, setCurrentSlide }) => (
  <aside className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-t from-pink-400 via-light-blue-300 to-purple-600 text-white rounded-l-lg">
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full h-full mx-auto bg-[#4339F2] rounded-l-lg shadow-lg p-8 text-white">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold tracking-wide">MediKeep</h2>
        </header>
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Health, Simplified
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            MediKeep is your companion for secure, organized, and accessible
            medical records. Join a growing community dedicated to health and
            wellness management.
          </p>
        </div>
        <Card className="bg-white/10 border-none shadow-md rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <blockquote className="text-sm italic text-white/90 mb-4">
              {testimonials[currentSlide].testimonial}
            </blockquote>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={testimonials[currentSlide].image}
                  alt={testimonials[currentSlide].name}
                />
                <AvatarFallback>
                  {testimonials[currentSlide].name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg text-white">
                  {testimonials[currentSlide].name}
                </div>
                <div className="text-sm text-white/70">
                  {testimonials[currentSlide].designation}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center items-center gap-3 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all rounded-full ${
                index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </aside>
);

const ProgressIndicator: React.FC<{
  currentStep: number;
  totalSteps: number;
}> = ({ currentStep, totalSteps }) => (
  <div className="flex w-full justify-between items-center mb-4">
    {[...Array(totalSteps)].map((_, index) => (
      <React.Fragment key={index}>
        <div
          className={`w-3 h-3 rounded-full ${
            index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-300"
          }`}
        />
        {index < totalSteps - 1 && (
          <div
            className={`flex-1 h-[2px] mx-2 ${
              index + 1 < currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

const SignUpA: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDoctor, setIsDoctor] = useState("No");
  const dispatch = useDispatch();
  const { submitForm } = useSubmitForm();
  const [secretMail, setSecretMail] = useState("");
  const totalSteps = isDoctor === "Yes" ? 3 : 2;

  const validationSchema = Yup.object().shape({
    role: Yup.string().required("Role is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date cannot be in the future"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    ...(isDoctor === "Yes" && {
      medicalLicenseNumber: Yup.string().required("License is required"),
      specialization: Yup.string().required("Specialization is required"),
      yearsOfExperience: Yup.number()
        .min(0, "Experience cannot be negative")
        .required("Experience is required"),
    }),
  });

  const handleRoleChange = (selectedRole: string) => {
    setIsDoctor(selectedRole);
  };

  const handleFormSubmit = async (values: User) => {
    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    if(!isEmailVerified) {
      toast.error("Please verify your email before submitting");
      return;
    }
    setSubmitting(true);
    dispatch(updateUserFields(values));
    await submitForm(values);
    setSubmitting(false);
  };
  const setOtp = async (email: string) => {
    try {
      const response = await fetch(import.meta.env.VITE_SEND_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Failed to send OTP. Please try again.");
      }
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };
  const initializeEmailStatus = async () => {
    await setEmailStatus(false);
  };
  useEffect(() => {
    initializeEmailStatus();
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen px-6 py-8 bg-gradient-to-l from-blue-200 via-green-200 to-yellow-200 justify-center items-center overflow-hidden relative">
      {isVerifyingOtp && (
        <OTPForm
          toggleOTPForm={() => setIsVerifyingOtp(false)}
          mail={secretMail}
          setIsEmailVerified={setIsEmailVerified}
        />
      )}
      <div className="w-full max-w-6xl min-h-[480px] bg-white rounded-xl shadow-lg flex flex-col md:flex-row">
        <Sidebar
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
        <main className="flex-1 p-8">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />

          <div className="text-center mb-6 w-full flex justify-end">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-semibold hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </div>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col items-center h-full w-full space-y-6">
                {currentStep === 1 && (
                  <Step1
                    isDoctor={isDoctor}
                    setSecretMail={setSecretMail}
                    setFieldValues={setFieldValue}
                    handleRoleChange={handleRoleChange}
                    formValues={values}
                  />
                )}
                {currentStep === 2 && (
                  <Step2
                    formValues={values}
                    isDoctor={isDoctor}
                    setFieldValues={setFieldValue}
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    acceptedTerms={acceptedTerms}
                    setAcceptedTerms={setAcceptedTerms}
                  />
                )}
                {currentStep === 3 && (
                  <Step3
                    formValues={values}
                    setFieldValues={setFieldValue}
                    acceptedTerms={acceptedTerms}
                    setAcceptedTerms={setAcceptedTerms}
                  />
                )}

                <div className="flex w-full justify-between mt-4">
                  <Button
                    type="button"
                    onClick={() =>
                      setCurrentStep((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentStep === 1 || submitting}
                    className="disabled:opacity-50"
                  >
                    Back
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      disabled={submitting}
                      onClick={() =>
                        setCurrentStep((prev) => Math.max(prev + 1, 1))
                      }
                      className="disabled:opacity-50"
                    >
                      Next
                    </Button>
                  ) : isEmailVerified ? (
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={async () => {
                        setIsVerifyingOtp(true);
                        await storeFormData(values);
                        await setOtp(values.email);
                      }}
                    >
                      Verify Email
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </main>
      </div>
    </div>
  );
};

export default SignUpA;
