import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", formData, { withCredentials: true });

    alert(res.data.message); // "Signup successful. Please login to continue."
    navigate("/login"); // redirect to login page
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};


  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    userType: Yup.string().oneOf(["user", "host"], "Invalid user type").required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        values,
        { withCredentials: true } // important for sessions/cookies
      );

      console.log("User signed up:", response.data.user);

      // After signup, redirect to login page
      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      setErrors({ email: error.response?.data?.message || "Signup failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <Field name="name" placeholder="Name" className="p-2 border rounded" />
        <ErrorMessage name="name" component="div" className="text-red-500" />

        <Field name="email" type="email" placeholder="Email" className="p-2 border rounded" />
        <ErrorMessage name="email" component="div" className="text-red-500" />

        <Field name="password" type="password" placeholder="Password" className="p-2 border rounded" />
        <ErrorMessage name="password" component="div" className="text-red-500" />

        <Field name="confirmPassword" type="password" placeholder="Confirm Password" className="p-2 border rounded" />
        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />

        <Field as="select" name="userType" className="p-2 border rounded">
          <option value="user">User</option>
          <option value="host">Host</option>
        </Field>
        <ErrorMessage name="userType" component="div" className="text-red-500" />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};

export default SignupForm;
