import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    AxiosInstance.post(`api/password_reset/confirm/`, {
      password: data.password,
      token: token,
    })
      .then((response) => {
        setShowMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 6000);
      })
      .catch((error) => {
        console.error("Error during password reset", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl text-center font-bold text-indigo-600 mb-6">Reset Password</h2>

        {showMessage && (
          <div className="mb-4 p-4 text-white bg-green-600 rounded-md">
            Your password reset was successful, you will be directed to the login page in a second.
          </div>
        )}

        <form onSubmit={handleSubmit(submission)}>
          <div className="mb-4">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="password2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
