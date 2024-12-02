import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const Forget = () => {
  const initialFormValues = {
    email: "",
    dateOfBirth: null,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: Yup.date()
      .nullable()
      .required("Date of Birth is required")
      .max(new Date(), "Date cannot be in the future"),
  });

  const handleFormSubmit = (values: typeof initialFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen px-6 py-8 bg-gradient-to-l from-blue-200 via-green-200 to-yellow-200 justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
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

              {/* Date of Birth Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
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
                      onSelect={(date) => setFieldValue("dateOfBirth", date)}
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

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Forget;
