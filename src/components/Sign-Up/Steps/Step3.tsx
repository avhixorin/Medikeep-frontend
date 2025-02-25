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
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
};

const Step3: React.FC<Step3Props> = ({ formValues, setFieldValues, acceptedTerms, setAcceptedTerms }) => {
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-6">
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

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Specialization
          </label>
          <Select
            value={formValues.specialization || ""}
            onValueChange={(value) => {
              setFieldValues("specialization", value);
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
          }}
        />
      </div>

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
        <Checkbox
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
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
