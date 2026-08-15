import { Shield, RefreshCw, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import type { RegistrationFormData } from "#/types";
import { useAuth } from "#/hooks/useAuth";
import { otpSchema } from "#/schemas/registration.schema";

const RESEND_COOLDOWN_SECONDS = 30;

const OtpStep = ({
    form,
    setStep
}: {
    form: RegistrationFormData;
    setStep: (step: 'type' | 'personal' | 'security' | 'otp' | 'profile') => void
}) => {
    const [otp, setOtp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [sentMessage, setSentMessage] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);
    const { register, sendOtp, verifyOtp, isSendOtpPending, isVerifyOtpPending } = useAuth();

    const sendCode = async () => {
        setOtpError(null);
        setSentMessage(null);
        try {
            await sendOtp(form.email);
            setSentMessage("A verification code has been sent to your email.");
            setCountdown(RESEND_COOLDOWN_SECONDS);
        } catch (error: any) {
            setOtpError(
                error.response?.data?.message ||
                "Failed to send the verification code. Please try again."
            );
        }
    };

    useEffect(() => {
        sendCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleCreateAccount = async () => {
        try {
            await register(form);
            setStep("profile");
        } catch {
            // useAuth already handles the error toast
        }
    };

    const handleVerifyOtp = async () => {
        setOtpError(null);

        const result = otpSchema.safeParse({ otp });

        if (!result.success) {
            setOtpError(result.error.flatten().fieldErrors.otp?.[0] ?? null);
            return;
        }

        try {
            await verifyOtp({ email: form.email, otp });
            setIsOtpVerified(true);
            setOtpError(null);
        } catch (error: any) {
            setOtpError(
                error.response?.data?.message ||
                "Invalid OTP. Please check the code and try again."
            );
        }
    };

    return (
        <div className="space-y-6 text-center py-6">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verify Email</h2>
            <p className="text-slate-500">We've sent a 6-digit code to 
                <span className="font-semibold text-slate-800">
                    {" "}{form.email || "your email"}
                </span>
            </p>
            <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                disabled={isOtpVerified}
                className={`text-center text-3xl tracking-[1em] h-16 bg-slate-50 mt-6 ${otpError
                    ? "border-red-400 focus-visible:ring-red-500"
                    : "border-slate-200"
                    }`}
                maxLength={6}
            />
            {otpError && (
                <p className="text-sm text-red-500">
                    {otpError}
                </p>
            )}
            {sentMessage && !otpError && (
                <p className="text-sm text-green-600">
                    {sentMessage}
                </p>
            )}
            {!isOtpVerified ? (
                <div className="flex flex-col items-center gap-3">
                    <Button
                        onClick={handleVerifyOtp}
                        disabled={isVerifyOtpPending || isSendOtpPending || otp.length !== 6}
                    >
                        {isVerifyOtpPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Verify OTP
                    </Button>
                    <button
                        type="button"
                        onClick={sendCode}
                        disabled={countdown > 0 || isSendOtpPending}
                        className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4 transition-all flex items-center gap-1 cursor-pointer disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${isSendOtpPending ? "animate-spin" : ""}`} />
                        {countdown > 0
                            ? `Resend code in ${countdown}s`
                            : "Resend code"}
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3">
                    <p className="text-sm text-green-600 font-medium">
                        Email verified successfully!
                    </p>
                    <Button
                        onClick={handleCreateAccount}
                    >
                        Create Account
                    </Button>
                </div>
            )}
        </div>
    )
}

export default OtpStep
