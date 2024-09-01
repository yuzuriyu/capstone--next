"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Initialize useRouter

  const defaultVoltages = [
    { day: "Mon", voltages: [] },
    { day: "Tue", voltages: [] },
    { day: "Wed", voltages: [] },
    { day: "Thu", voltages: [] },
    { day: "Fri", voltages: [] },
    { day: "Sat", voltages: [] },
    { day: "Sun", voltages: [] },
  ];

  const handleSubmit = async (e: FormEvent) => {
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
          voltages: defaultVoltages,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setError("");

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Adjust the delay as needed (2 seconds in this example)
    } catch (err) {
      setError("User registration failed");
      console.error("Registration error:", err);
    }
  };
  return (
    <div className="w-[366px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div>
        <svg
          height="50"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 512 309"
          width="50"
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto mb-4"
          fill="black"
        >
          <path d="m120.81043 80.5613102h96.567895v7.6753487h-87.715838v57.7670991h82.485077v7.675348h-82.485077v63.422619h88.721754v7.675348h-97.573811zm105.21877 0h10.260338l45.467384 63.4226188 46.4733-63.4226188 63.211264-80.5613102-103.850254 150.649363 53.514709 74.12771h-10.662704l-48.686315-67.462275-48.887497 67.462275h-10.461521l53.917074-74.12771zm118.899221 7.6753486v-7.6753486h110.047164v7.6753487h-50.698145v136.5404141h-8.852058v-136.5404141zm-344.928421-7.6753486h11.0650714l152.5808586 228.3226968-63.054372-84.106934-91.33713469-133.3086883-.40236623 133.3086883h-8.85205708zm454.083705 134.2241588c-1.808538 0-3.164943-1.401289-3.164943-3.212184 0-1.810897 1.356405-3.212186 3.164943-3.212186 1.830069 0 3.164943 1.401289 3.164943 3.212186 0 1.810895-1.334874 3.212184-3.164943 3.212184zm8.69821-8.450851h4.736648c.06459 2.565437 1.937721 4.290101 4.693588 4.290101 3.078821 0 4.822769-1.854014 4.822769-5.324899v-21.989457h4.82277v22.011016c0 6.251906-3.617077 9.852139-9.602478 9.852139-5.619388 0-9.473297-3.492442-9.473297-8.8389zm25.38413-.280256h4.779709c.409074 2.953486 3.294124 4.829057 7.449457 4.829057 3.875441 0 6.717429-2.004921 6.717429-4.764383 0-2.371411-1.808538-3.794259-5.920812-4.764383l-4.004619-.970122c-5.619389-1.315057-8.181486-4.031402-8.181486-8.601759 0-5.540482 4.521348-9.226949 11.303367-9.226949 6.308355 0 10.915822 3.686467 11.195715 8.925132h-4.693588c-.452134-2.867252-2.949641-4.65659-6.566718-4.65659-3.810849 0-6.351414 1.832454-6.351414 4.635033 0 2.220503 1.636295 3.492442 5.683978 4.441008l3.423305.840772c6.372946 1.487524 8.999632 4.074517 8.999632 8.752668 0 5.950089-4.607467 9.679672-11.970803 9.679672-6.889671 0-11.518667-3.557118-11.863152-9.119156z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div
          className={`flex items-center mb-4 py-2 bg-white px-4 rounded-lg ${
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
          className={`flex items-center mb-4 py-2 bg-white px-4 rounded-lg ${
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
          className={`flex items-center mb-4 py-2 relative bg-white px-4 rounded-lg ${
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
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="text-xs flex-1 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={`flex items-center mb-4 py-2 relative bg-white px-4 rounded-lg ${
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
          </svg>
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
          className="bg-customgreen text-white flex-1 py-2 mt-4 rounded-full mb-4"
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
