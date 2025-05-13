"use client";
import { AxiosError } from 'axios';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      // Sending signup request to the backend
      await axios.post("/api/users/signup", user);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Narrowing the error type to AxiosError and handling the error
        toast.error(error.response?.data?.error || error.message || "Signup failed");
      } else if (error instanceof Error) {
        // Handling general error
        toast.error(error.message || "Signup failed");
      } else {
        toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{loading ? "Processing..." : "Create an account"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Input
            id="username"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button disabled={buttonDisabled} onClick={onSignup} className="w-full">
            {buttonDisabled ? "Complete all fields" : "Signup"}
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline text-blue-600 hover:text-blue-800">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
