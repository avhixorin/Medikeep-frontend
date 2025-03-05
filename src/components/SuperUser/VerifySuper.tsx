import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAdmin } from "@/redux/features/adminSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function VerifySuper() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = import.meta.env.VITE_VERIFY_ADMIN;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data;
      try {
        data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Invalid server response");
        return;
      }

      console.log("The response is", data);

      if (res.status !== 200) {
        toast.error(data.message || "Unauthorized");
        throw new Error(data.message || "Unauthorized");
      }

      toast.success("Verified Successfully");
      dispatch(setAdmin());
      navigate("/super");
    } catch (error) {
      console.error("The error is", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-white">Login as admin</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-[#111111] border-gray-800 text-white placeholder:text-gray-500 h-12"
          />

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-100 h-12 font-medium"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
