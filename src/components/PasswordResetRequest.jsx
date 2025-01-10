import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

const PasswordResetRequest = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    AxiosInstance.post(`api/password_reset/`, {
      email: data.email,
    })
      .then((response) => {
        setShowMessage(true);
      })
      .catch((error) => {
        console.error("Error during password reset request", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-teal-300">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl text-center font-bold text-teal-600 mb-6">Request password reset</h2>

        {showMessage && (
          <div className="mb-4 p-4 text-white bg-green-600 rounded-md">
            If your email exists, you have received an email with instructions for resetting the password.
          </div>
        )}

        <form onSubmit={handleSubmit(submission)}>
          <div className="mb-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Request password reset
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-teal-600 hover:underline">
            Remembered your password? Login here.
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
