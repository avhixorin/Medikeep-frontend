import { ErrorMessage, Field, FormikErrors } from "formik";
import { Input } from "@/components/ui/input";
import { User } from "@/types/types";
import React from "react";
import { Switch } from "@/components/ui/switch";
import useCheckAvailability from "@/hooks/useCheckAvailability";

type Step1Props = {
  isDoctor: string;
  setSecretMail: (value: string) => void;
  setFieldValues: (
    field: string,
    value: string | boolean | number | Date,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<User>>;
  handleRoleChange: (role: string) => void;
  formValues: User;
};

const Step1: React.FC<Step1Props> = ({
  setFieldValues,
  setSecretMail,
  isDoctor,
  handleRoleChange,
  formValues,
}) => {
  const { usernameExists, emailExists } = useCheckAvailability(
    formValues.username,
    formValues.email
  );
  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <label className="text-base font-medium text-gray-800">
          Are you registering as a doctor?
        </label>
        <Switch
          checked={isDoctor === "Yes"}
          name="role"
          onCheckedChange={(checked) => {
            const role = checked ? "Yes" : "No";
            handleRoleChange(role);
            setFieldValues("role", role === "Yes" ? "doctor" : "patient");
          }}
        />
      </div>
      {isDoctor === "Yes" ? (
        <p className="text-sm text-green-600">
          Awesome! Let's set up your account as a doctor.
        </p>
      ) : isDoctor === "No" ? (
        <p className="text-sm text-blue-600">
          Great! Let's proceed with setting up your account.
        </p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            First Name<span className="text-red-500">*</span>
          </label>
          <Field
            name="firstName"
            as={Input}
            placeholder="John"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValues("firstName", e.target.value)
            }
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Last Name<span className="text-red-500">*</span>
          </label>
          <Field
            name="lastName"
            as={Input}
            placeholder="Doe"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValues("lastName", e.target.value)
            }
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Email<span className="text-red-500">*</span>
        </label>
        <Field
          name="email"
          as={Input}
          placeholder="johndoe@example.com"
          className={emailExists ? "border-red-500" : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValues("email", e.target.value);
            setSecretMail(e.target.value);
          }}
        />
        {emailExists && (
          <p className="text-red-500 text-sm">Email already in use 😔</p>
        )}
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Username<span className="text-red-500">*</span>
        </label>
        <Field
          name="username"
          as={Input}
          placeholder="@johndoe"
          className={usernameExists ? "border-red-500" : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValues("username", e.target.value)
          }
        />
        {usernameExists && (
          <p className="text-red-500 text-sm">Username is taken 😬</p>
        )}
        <ErrorMessage
          name="username"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
};

export default Step1;
