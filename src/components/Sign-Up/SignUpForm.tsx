import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Switch from "./Radio/Radio";
import { useDispatch } from "react-redux";
import { updateUserFields } from "@/redux/features/authSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Checkbox } from "../ui/checkbox";
import { testimonials } from "../Landing-page/Benefits/Testemonials/testimonials";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TnC } from "../TnC/TnC";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";

const SignUpA: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSteps, setTotalSteps] = useState(2);
  const [role, setRole] = React.useState("");
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: new Date(),
    gender: "",
    phone: "",
  });
  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
    setTotalSteps(selectedRole === "Yes" ? 4 : 2);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);
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
  });

  const handleFormSubmit = (values: typeof formValues) => {
    console.log("Submitting form", values);
    if (currentStep === totalSteps) {
      dispatch(updateUserFields(values));
    }
  };

  const handleNext = (values: typeof formValues) => {
    setFormValues(values);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handleBack = (values: typeof formValues) => {
    setFormValues(values);
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderStepForm = (
    step: number,
    values: typeof formValues,
    setFieldValue: (
      field: string,
      value: Date | string,
      shouldValidate?: boolean
    ) => void
  ) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <label className="text-base font-medium text-gray-800">
                Are you registering as a doctor?
              </label>
              <Switch handleChange={handleRoleChange} />
            </div>

            {/* Dynamic confirmation message */}
            {role === "Yes" ? (
              <p className="text-sm text-green-600">
                Awesome! Let's set up your account as a doctor.
              </p>
            ) : role === "No" ? (
              <p className="text-sm text-blue-600">
                Great! Let's proceed with setting up your account.
              </p>
            ) : null}

            <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <Field name="firstName" as={Input} placeholder="John" initialFocus/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <Field name="lastName" as={Input} placeholder="Doe" />
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Email</label>
                <Field
                  name="email"
                  as={Input}
                  placeholder="johndoe@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Username</label>
                <Field name="username" as={Input} placeholder="@johndoe" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-6">
              {/* Date of Birth Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Date of Birth
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !values.dateOfBirth && "text-muted-foreground"
                      )}
                    >
                      {values.dateOfBirth ? (
                        format(values.dateOfBirth, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        values.dateOfBirth
                          ? new Date(values.dateOfBirth)
                          : undefined
                      }
                      onSelect={(date) =>
                        date && setFieldValue("dateOfBirth", date)
                      }
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Gender Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <Select
                  value={values.gender}
                  onValueChange={(value) => setFieldValue("gender", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Phone
              </label>
              <Field name="phone" as={Input} placeholder="123-456-7890" />
            </div>
            <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Password</label>
                <Field
                  name="password"
                  type="password"
                  as={Input}
                  placeholder="********"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  as={Input}
                  placeholder="********"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <TnC />
              </label>
            </div>
          </div>
        );

      case 3:
        return <Step3 />;

      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen p-6 bg-gradient-to-l from-blue-200 via-green-200 to-yellow-200 justify-center items-center">
      <div className="w-full max-w-6xl min-h-[450px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-t from-pink-400 via-light-blue-300 to-purple-600 text-white">
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-full h-full mx-auto bg-[#4339F2] rounded-lg shadow-lg p-8 text-white">
              <header className="mb-8">
                <h2 className="text-2xl font-semibold tracking-wide">
                  MediKeep
                </h2>
              </header>

              <div className="space-y-6 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Your Health, Simplified
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  MediKeep is your companion for secure, organized, and
                  accessible medical records. Join a growing community dedicated
                  to health and wellness management.
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
                      <div className="font-medium text-lg text-white-100">
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
                      index === currentSlide
                        ? "w-6 bg-white"
                        : "w-2 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Progress Indicator */}
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

          {/* Formik Form */}
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col justify-around items-center h-full">
                {/* Render Form Content */}
                {renderStepForm(currentStep, values, setFieldValue)}

                {/* Navigation Buttons */}
                <div className="flex w-full justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleBack(values)}
                    disabled={currentStep === 1}
                    className="min-w-[100px]"
                  >
                    Back
                  </Button>
                  <Button
                    type={currentStep === totalSteps ? "submit" : "button"}
                    onClick={() =>
                      currentStep < totalSteps && handleNext(values)
                    }
                    className="min-w-[100px]"
                  >
                    {currentStep === totalSteps ? "Submit" : "Next"}
                  </Button>
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
