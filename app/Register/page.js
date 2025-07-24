"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
// import './globals.css'; // or whatever your CSS file is named

export default function App({ closeModal }) {
  const { data: session } = useSession();
  const [userCreated, setUserCreated] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setUserExists(false);
    setUserCreated(false);

    console.log("Form Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (result.ok) {
      setUserExists(true);
    } else {
      setUserCreated(true);
    }
  };

  const redirectToLogin = () => {
    router.push("/login");
    closeModal();
  };

  return (
    <div className="flex items-center justify-center bg-black w-full h-full">
      <div className="w-full  max-w-md px-4 py-6">
        {/* Loading */}
        {isSubmitting && (
          <div className="bg-gray-500   text-white p-2 text-center mb-4 rounded text-sm md:text-base">
            Loading...
          </div>
        )}

        {/* Success/Error Messages */}
        {userCreated && (
          <div className="text-center bg-green-600 text-white font-semibold text-sm md:text-lg mb-4 rounded p-2">
            User has been created successfully!
          </div>
        )}
        {userExists && (
          <div className="text-center bg-red-600 text-white font-semibold text-sm md:text-lg mb-4 rounded p-2">
            User already exists with the email.
          </div>
        )}

        {/* Title */}
        <h1 className="text-center text-white font-semibold text-2xl  md:text-3xl mb-6">
          Create your account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              {...register("email", { required: "Email is required!" })}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-black rounded-lg border border-gray-700 text-white placeholder-gray-500 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            {errors.email && (
              <span className="block text-red-500 text-xs md:text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Username Input */}
          <div>
            <input
              {...register("name", { required: "Username is required!" })}
              id="name"
              name="name"
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-black rounded-lg border border-gray-700 text-white placeholder-gray-500 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            {errors.name && (
              <span className="block text-red-500 text-xs md:text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded-full text-sm md:text-base hover:bg-blue-500 transition duration-200"
              disabled={isSubmitting}
            >
              Register
            </button>
          </div>

          {/* Go to Login Page */}
          {userCreated && (
            <div>
              <button
                onClick={redirectToLogin}
                className="w-full bg-blue-500 text-black font-bold py-3 rounded-full text-sm md:text-base hover:bg-blue-700 transition duration-200"
              >
                Go to Login Page
              </button>
            </div>
          )}
        </form>

        {/* Google Login Button */}
        <button
          className="w-full mt-4 bg-white text-black font-bold py-3 rounded-full text-sm md:text-base hover:bg-blue-500 transition duration-200 border border-black flex justify-center items-center gap-2"
          onClick={() => signIn("google", { callbackUrl: "/Profile" })}
        >
          <img src="/google.png" alt="Google Icon" className="w-6 h-6 md:w-7 md:h-7" />
          Login with Google
        </button>
      </div>
    </div>
  );
}
