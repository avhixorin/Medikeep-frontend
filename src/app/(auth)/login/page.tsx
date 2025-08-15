/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleAuthAction = async (action: Promise<any>) => {
    setIsLoading(true);
    setError(null);
    try {
      await action;
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    handleAuthAction(createUserWithEmailAndPassword(auth, email, password));
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    handleAuthAction(signInWithEmailAndPassword(auth, email, password));
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    handleAuthAction(signInWithPopup(auth, provider));
  };

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-teal-50 to-purple-100 dark:from-blue-900/20 dark:via-teal-900/20 dark:to-purple-900/20 animate-gradient-xy" />
      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto grid w-[380px] gap-6"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="relative grid w-full grid-cols-2 bg-muted/80 p-1 rounded-lg">
              <motion.div
                layoutId="active-tab-pill"
                className="absolute inset-0 bg-background rounded-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <TabsTrigger value="login" className="relative z-10">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="relative z-10">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4">
              <Card className="bg-background/80 backdrop-blur-sm border-border/20">
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <InputGroup
                      label="Email"
                      id="email-login"
                      placeholder="jane@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                    <InputGroup
                      label="Password"
                      id="password-login"
                      type="password"
                      value={password}
                      placeholder="••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 pt-4">
                    <AuthButton isLoading={isLoading} type="submit">
                      Login
                    </AuthButton>
                    <AuthButton
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      isLoading={isLoading}
                    >
                      <Image
                        src="/google.svg"
                        alt="Medikeep Logo"
                        className="dark:invert"
                        height={18}
                        width={18}
                      />
                      Sign in with Google
                    </AuthButton>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="signup" className="mt-4">
              <Card className="bg-background/80 backdrop-blur-sm border-border/20">
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Enter your information to create an account.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignUp}>
                  <CardContent className="space-y-4">
                    <InputGroup
                      label="Email"
                      id="email-signup"
                      placeholder="jane@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                    <InputGroup
                      label="Password"
                      id="password-signup"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      disabled={isLoading}
                    />
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 pt-4">
                    <AuthButton isLoading={isLoading} type="submit">
                      Sign Up
                    </AuthButton>
                    <AuthButton
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      isLoading={isLoading}
                    >
                      <Image
                        src="/google.svg"
                        alt="Medikeep Logo"
                        className="dark:invert"
                        height={18}
                        width={18}
                      />
                      Sign up with Google
                    </AuthButton>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center p-10 text-center relative">
        <div className="absolute top-10 left-10 size-48 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 size-48 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <Image
            src={
              "https://res.cloudinary.com/avhixorin/image/upload/v1724779943/Account3DAnimatedIcon-ezgif.com-crop_1_xivavn.gif"
            }
            alt="Medikeep Logo"
            height={450}
            width={450}
          />
        </motion.div>
      </div>
    </div>
  );
}

const InputGroup = ({
  label,
  id,
  ...props
}: { label: string; id: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} required {...props} />
  </div>
);

const AuthButton = ({
  isLoading,
  children,
  ...props
}: { isLoading: boolean } & React.ComponentProps<typeof Button>) => (
  <Button className="w-full" disabled={isLoading} {...props}>
    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    {children}
  </Button>
);
