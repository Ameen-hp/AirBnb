import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => { // pass a callback from Header/App
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post("/api/auth/login", values, {
        withCredentials: true,
      });

      // Notify parent (Header) to refetch user
      if (onLogin) onLogin(res.data.user);

      if (res.data.user.userType === "host") navigate("/hostHomes");
      else navigate("/home");
    } catch (error) {
      console.error(error);
      setErrors({ email: error.response?.data?.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border rounded"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border rounded"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm"
          />

          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
