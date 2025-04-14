import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface OTPFormProps {
  toggleOTPForm: () => void;
  setIsEmailVerified: (value: boolean) => void;
  mail: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  toggleOTPForm,
  mail,
  setIsEmailVerified,
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [isVerifying, setIsVrifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const prefixLength = Math.min(2, mail.indexOf("@"));
  const secretMail =
    mail.length > 2
      ? `${mail.substring(0, prefixLength)}${"*".repeat(
          mail.indexOf("@") - prefixLength
        )}${mail.substring(mail.indexOf("@"))}`
      : mail;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value) && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((char, idx) => {
      if (inputsRef.current[idx]) {
        inputsRef.current[idx]!.value = char;
      }
    });
    if (paste.length === 6 && inputsRef.current[5]) {
      inputsRef.current[5].focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVrifying(true);
    const otp = inputsRef.current.map((input) => input?.value).join("");
    try {
      const res = await fetch(import.meta.env.VITE_VERIFY_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, email: mail }),
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Something went wrong");
      }
      const data = await res.json();
      console.log("OTP verification response:", data);
      if (data.status === "success") {
        toast.success("Email verified successfully!");
        setIsEmailVerified(true);
        toggleOTPForm();
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
    setIsVrifying(false);
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isOTPComplete = inputsRef.current.every((input) => input?.value);

  return (
    <div className="h-screen w-screen flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm fixed inset-0 z-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md relative"
      >
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleOTPForm}
            className="text-black text-2xl font-bold hover:text-gray-500 transition duration-200"
          >
            &times;
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">OTP</h1>
        <p className="text-sm text-gray-600">Verification Code</p>
        <p className="text-center text-gray-700 text-sm">
          We’ve sent a verification code to your email address. <br />
          <span className="font-bold">{secretMail}</span>
        </p>

        <div className="flex gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              ref={(el) => (inputsRef.current[i] = el!)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-xl border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              required
            />
          ))}
        </div>

        <p className="text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <button
            disabled={timer !== 0}
            className={`font-semibold ${
              timer === 0
                ? "text-indigo-600 hover:underline"
                : "text-gray-400 cursor-not-allowed"
            }`}
            type="button"
            onClick={() => setTimer(60)}
          >
            {timer ? `Resend after ${timer}s` : "Resend"}
          </button>
        </p>

        <button
          type="submit"
          disabled={!isOTPComplete || isVerifying}
          className={`mt-2 px-6 py-3 rounded-md text-white font-medium transition-colors ${
            (isOTPComplete || isVerifying)
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isVerifying ? "Verifying.." : "Verify Me"}
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
