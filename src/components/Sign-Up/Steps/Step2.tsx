import { TnC } from "@/components/TnC/TnC";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/types";
import { format } from "date-fns";
import { ErrorMessage, Field, FormikErrors } from "formik";
import { CalendarIcon } from "lucide-react";

type Step2Props = {
  formValues: User;
  isDoctor: string;
  setFieldValues: (
    field: string,
    value: string | boolean | number | Date,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<User>>;
  currentStep: number;
  totalSteps: number;
};

const Step2: React.FC<Step2Props> = ({
  formValues,
  setFieldValues,
  isDoctor,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="space-y-4 w-full">
      {/* Date of Birth */}
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
              {formValues.dateOfBirth ? (
                format(formValues.dateOfBirth, "PPP")
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
                formValues.dateOfBirth
                  ? new Date(formValues.dateOfBirth)
                  : undefined
              }
              onSelect={(date) => {
                if (date) setFieldValues("dateOfBirth", date); // Update Formik field manually
              }}
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

      {/* Gender */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Gender<span className="text-red-500">*</span>
        </label>
        <div>
          <Select
            value={formValues.gender}
            onValueChange={(value) => setFieldValues("gender", value)}
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
        <ErrorMessage
          name="gender"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Phone<span className="text-red-500">*</span>
        </label>
        <Field
          name="phone"
          as={Input}
          placeholder="123-456-7890"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValues("phone", e.target.value)
          }
        />
        <ErrorMessage
          name="phone"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Password and Confirm Password */}
      {isDoctor === "No" && currentStep === totalSteps && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Password<span className="text-red-500">*</span>
              </label>
              <Field
                name="password"
                type="password"
                as={Input}
                placeholder="********"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValues("password", e.target.value)
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <Field
                name="confirmPassword"
                type="password"
                as={Input}
                placeholder="********"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValues("confirmPassword", e.target.value)
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <div className="flex w-full items-center space-x-2">
            <Field
              name="acceptedTerms"
              as={Checkbox}
              value={formValues.acceptedTerms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValues("acceptedTerms", e.target.checked)
              }
            />

            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <TnC />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default Step2;
