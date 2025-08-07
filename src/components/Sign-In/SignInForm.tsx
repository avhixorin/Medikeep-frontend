import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthUser } from "../../redux/features/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import "./SignInForm.css";
import { resetAllUsers } from "@/redux/features/allUsersSlice";
import { clearAllMessages } from "@/redux/features/messageSlice";
import { clearNotifications } from "@/redux/features/notificationsSlice";
import { clearSelectedUser } from "@/redux/features/selectedUserSlice";
import { resetAdmin } from "@/redux/features/adminSlice";
import useAuth from "@/hooks/useAuth";
const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { loginUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    await loginUser(values);
    setLoading(false);
  };
  useEffect(() => {
    dispatch(resetAllUsers());
    dispatch(clearAuthUser());
    dispatch(clearAllMessages());
    dispatch(clearNotifications());
    dispatch(clearSelectedUser());
    dispatch(resetAdmin());
  }, [dispatch]);

  return (
    <div
      className="grid-cols-1 grid lg:grid-cols-2 min-h-[100dvh] bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200
    dark:from-[#000000] dark:to-[#4D4855] dark:text-white
    "
    >
      <div className="flex items-center justify-center col-span-1 lg:p-8">
        <div className="lform-container w-[75%] flex justify-center items-center dark:bg-[#010332]">
          <div className="w-full">
            <div className="w-full mb-9 flex items-center justify-center">
              <p className="sititle text-center w-full dark:text-gray-400">
                Welcome back
              </p>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="form flex flex-col gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <Field
                      name="email"
                      as={Input}
                      placeholder="johndoe@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full relative space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Password
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      as={Input}
                      placeholder="********"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <div
                      className="absolute right-4 top-9 cursor"
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
                    <span
                      className="page-link-label dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => navigate("/forgot")}
                    >
                      Forgot Password?
                    </span>
                  </p>

                  <Button
                    className={`${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </Button>
                </Form>
              )}
            </Formik>

            <p className="sign-up-label dark:text-gray-400">
              Don't have an account?
              <Link
                to={"/register"}
                className="sign-up-link dark:text-blue-400 dark:hover:text-blue-300"
              >
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
          src="https://res.cloudinary.com/avhixorin/image/upload/f_auto/v1724779943/Account3DAnimatedIcon-ezgif.com-crop_1_xivavn.gif"
          alt="gif"
        />
      </div>
    </div>
  );
};

export default SignInForm;
