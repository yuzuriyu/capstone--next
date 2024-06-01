"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !username) {
      setError("All fields are necessary");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Handle successful registration
      setError("");
      alert("Registration successful!");
      // Or use a routing library to navigate:
      // router.push('/login');
    } catch (err) {
      setError("User registration failed");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="w-[366px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div>
        <Image
          src={"/icons/nextjs.svg"}
          alt=""
          width={100}
          height={100}
          className="my-8 m-auto"
        />
      </div>
      <div className="flex flex-col">
        <div
          className={`flex items-center mb-4 border-b py-2 ${
            error ? "border-red-400" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-2"
            fill="#A6ABC8"
          >
            <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
          </svg>
          <input
            type="text"
            placeholder="Email"
            className="text-xs flex-1 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className={`flex items-center mb-4 border-b py-2 ${
            error ? "border-red-400" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-2"
            fill="#A6ABC8"
          >
            <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
          </svg>
          <input
            type="text"
            placeholder="Username"
            className="text-xs flex-1 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div
          className={`flex items-center mb-4 border-b py-2 relative ${
            error ? "border-red-400" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-2"
            fill="#A6ABC8"
          >
            <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"></path>
          </svg>{" "}
          <input
            type="password"
            placeholder="Password"
            className="text-xs flex-1 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={`flex items-center mb-4 border-b py-2 relative ${
            error ? "border-red-400" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-2"
            fill="#A6ABC8"
          >
            <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"></path>
          </svg>{" "}
          <input
            type="password"
            placeholder="Confirm Password"
            className="text-xs flex-1 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-red-400 text-xs text-right mb-4">{error}</p>
        )}
        <button
          className="bg-customblue text-white flex-1 py-2 mt-10 rounded-full mb-4"
          onClick={handleSubmit}
        >
          Register
        </button>

        <p className="text-xs text-center">
          Already have an account?
          <Link href={"/login"}>
            <span className="text-blue-400"> Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
