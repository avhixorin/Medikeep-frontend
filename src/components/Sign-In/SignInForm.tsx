import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./SignInForm.css";
import Swal from "sweetalert2";
import BackButton from "../Back-Button/BackButton";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/features/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const TnC: React.FC = () => {
  return (
    <div className="tnc-container flex justify-start items-center">
      <p className="text-zinc-500 dark:text-zinc-400">
        By logging in, you accept our
        <Link className="text-blue-500 hover:text-blue-800 ml-2" to={"/tnc"}>
          terms and conditions
        </Link>
      </p>
    </div>
  );
};

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Form submit handler
  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const loginUrl = import.meta.env.VITE_SIGN_IN_URL;
      console.log("loginUrl", loginUrl);
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();
      if (data?.statusCode === 200) {
        await Swal.fire({
          text: data.message,
          icon: "success",
        });

        dispatch(setAuthUser(data.data));
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      Swal.fire({
        text: (error as Error).message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-cols-1 grid lg:grid-cols-2 min-h-[100dvh] bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200">
      <div className="flex items-center justify-center col-span-1 lg:p-8">
        <div className="lform-container w-[75%] flex justify-center items-center">
          <div className="w-full">
            <div className="w-full mb-9 relative flex items-center justify-center">
              <div className="absolute left-0">
                <BackButton text={""} thickness={20} />
              </div>
              <p className="sititle text-center w-full">Welcome back</p>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="form flex flex-col gap-4">
                  {/* Email Field */}
                  <div>
                    <Field
                      type="email"
                      name="email"
                      className="sinput"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="w-full relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="sinput"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <div
                      className="absolute right-4 top-4 cursor"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Eye
                            className="cursor-pointer"
                            stroke="rgb(148 163 184)"
                            size={20}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        >
                          <EyeOff
                            className="cursor-pointer"
                            stroke="rgb(148 163 184)"
                            size={20}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <p className="page-link">
                    <span className="page-link-label">Forgot Password?</span>
                  </p>
                  <TnC />
                  <button className={`form-btn ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} type="submit" disabled={loading}
                  
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="sign-up-label">
              Don't have an account?
              <Link to={"/sign-up"} className="sign-up-link">
                Sign up
              </Link>
            </p>
            {/* <div className="buttons-container mt-3">
              <div className="google-login-button"> */}
                {/* Google Login Button */}
              {/* </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-full h-full">
        <img
          className="h-[70%] w-[70%] object-contain my-20 mx-auto"
          draggable={false}
          src="https://res.cloudinary.com/avhixorin/image/upload/v1724779943/Account3DAnimatedIcon-ezgif.com-crop_1_xivavn.gif"
          alt="gif"
        />
      </div>
    </div>
  );
};

export default SignInForm;
