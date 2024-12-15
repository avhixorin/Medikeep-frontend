import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import useForgot from "@/hooks/useForgot";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Forget = () => {
  const [credentialsTrue, setCredentialsTrue] = useState(false);

  const initialFormValues = {
    email: "",
    dateOfBirth: null,
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: Yup.date()
      .nullable()
      .required("Date of Birth is required")
      .max(new Date(), "Date cannot be in the future"),
    ...(credentialsTrue && {
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
  });
  const navigate = useNavigate();
  const { verifyUser, resetPassword } = useForgot();
  const handleFormSubmit = async (values: {
    email: string;
    dateOfBirth: Date | null;
    password: string;
  }) => {
    const { email, dateOfBirth, password } = values;
    if(!credentialsTrue){
    const verificationData = await verifyUser(email, dateOfBirth!);
    if (verificationData.statusCode !== 200) {
      toast.error("Verification failed. Please check your details.");
      return;
    }
  }
    setCredentialsTrue(true);
    if(credentialsTrue){
      const passwordUpdateData = await resetPassword(email, dateOfBirth!, password);
    if (passwordUpdateData.statusCode !== 200) {
      toast.error("Password update failed. Please try again.");
      return;
    }
      navigate("/sign-in");
    }

  };

  return (
    <div className="flex min-h-screen px-6 py-8 bg-gradient-to-tl from-blue-200 via-green-200 to-yellow-200 dark:from-[#3f3f3f] dark:via-[#191919] dark:to-[#020202] dark:text-white justify-center items-center">
      <div className="w-full max-w-md bg-white dark:bg-[#010332] rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-300">
          Forgot Password
        </h2>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col space-y-6">
              {!credentialsTrue ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      as={Input}
                      placeholder="email@something.com"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Date of Birth<span className="text-red-500">*</span>
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full pl-3 text-left font-normal"
                        >
                          {values.dateOfBirth ? (
                            format(new Date(values.dateOfBirth), "PPP")
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
                            setFieldValue("dateOfBirth", date)
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <ErrorMessage
                      name="dateOfBirth"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      New Password<span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="password"
                      type="password"
                      as={Input}
                      placeholder="********"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Confirm New Password<span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      as={Input}
                      placeholder="********"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Update Password
                  </Button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Forget;
