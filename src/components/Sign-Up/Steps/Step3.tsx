import { TnC } from "@/components/TnC/TnC";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { specializations } from "@/constants/specializations";
import { User } from "@/types/types";
import { Field, FormikErrors } from "formik";
import React from "react";

type Step3Props = {
  formValues: User;
  setFieldValues: (
    field: string,
    value: string | boolean | number | Date,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<User>>;
};

const Step3: React.FC<Step3Props> = ({ formValues, setFieldValues }) => {
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-6">
        {/* Medical Licence Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Medical License Number
          </label>
          <Field
            name="medicalLicenseNumber"
            as={Input}
            placeholder="A123456"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValues("medicalLicenseNumber", e.target.value)
            }
          />
        </div>

        {/* Specialization Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Specialization
          </label>
          <Select
            value={formValues.specialization || ""}
            onValueChange={(value) => {
              setFieldValues("specialization", value);
              console.log("Selected Specialization: ", value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((specialization) => (
                <SelectItem
                  className="cursor-pointer"
                  key={specialization}
                  value={specialization}
                >
                  {specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Experience Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Years of Experience
        </label>
        <Field
          name="yearsOfExperience"
          as={Input}
          placeholder="5"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValues("yearsOfExperience", e.target.value);
            console.log("Selected Years of Experience: ", e.target.value);
            console.log(
              "Years of Experience set in the form ",
              formValues.yearsOfExperience
            );
            console.log("Form Values in years of experience: ", formValues);
          }}
        />
      </div>

      {/* Password Field */}
      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Password</label>
          <Field
            name="password"
            type="password"
            as={Input}
            placeholder="********"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValues("password", e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Confirm Password</label>
          <Field
            name="confirmPassword"
            type="password"
            as={Input}
            placeholder="********"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValues("confirmPassword", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex w-full items-center space-x-2">
        <Field
          name="acceptedTerms"
          as={Checkbox}
          checked={formValues.acceptedTerms}
          onChange={() => {
            setFieldValues("acceptedTerms", !formValues.acceptedTerms);
            console.log("Accepted Terms: ", formValues.acceptedTerms);
          }}
        />

        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <TnC />
        </label>
      </div>
    </div>
  );
};

export default Step3;
