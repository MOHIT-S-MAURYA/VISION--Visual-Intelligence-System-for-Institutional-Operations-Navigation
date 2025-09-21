import React from "react";

function Login() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Sign In
        </h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Access your VISION account
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input-field mt-1"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input-field mt-1"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Sign In
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          VISION - AI-Powered Attendance Management
        </p>
      </div>
    </div>
  );
}

export default Login;
