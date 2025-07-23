"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LoginCredentials, SignupCredentials } from "@/lib/types";

async function loginUser(credentials: LoginCredentials) {
  const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}

async function signupUser(credentials: SignupCredentials) {
  const response = await fetch("http://localhost:5000/api/v1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data;
}

export function useAuth() {
  const router = useRouter();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      toast("Login Successful", {
        description: `Welcome back!`,
      });
      router.push("/articles");
    },
    onError: (error) => {
      toast("Login Failed", {
        description: error.message,
      });
    },
  });

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast("Signup Successful", {
        description: "You can now log in with your new account.",
      });
      router.push("/login");
    },
    onError: (error) => {
      toast("Signup Failed", {
        description: error.message,
      });
    },
  });

  return {
    login,
    isLoggingIn,
    signup,
    isSigningUp,
  };
}
