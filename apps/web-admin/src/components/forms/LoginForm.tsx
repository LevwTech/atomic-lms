import * as React from "react";
import { useFormik } from "formik";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { loginSchema } from "./Schemas";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 200) {
        setLoading(false);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        toast.success("Logged in successfully");
        navigate("/users");
      } else {
        setLoading(false);
        toast.error("Invalid credentials");
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-20 w-[50%] items-center bg-white rounded-r-lg"
    >
      <img src={"/BUE_Logo.svg"} className="w-64 self-center" />

      <div className="flex flex-col gap-8 w-[60%]">
        <div className="flex flex-col gap-4">
          <FormInput
            required
            placeHolder="Username"
            name="username"
            type="text"
            onChange={handleChange}
            value={values.username}
            error={errors.username}
            touched={touched.username}
          />
          <FormInput
            required
            placeHolder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />
        </div>

        {loading ? (
          <button
            disabled
            className="rounded cursor-not-allowed flex items-center justify-center bg-[#11664F] px-8 py-2 text-white transition h-10"
          >
            <ReactLoading
              type="bubbles"
              color="#ffffff"
              height={25}
              width={25}
            />
          </button>
        ) : (
          <button
            type="submit"
            className="rounded bg-[#11664F] px-8 py-2 text-white transition lg:hover:bg-[#11664F]/80 h-10"
          >
            Login
          </button>
        )}
      </div>
    </form>
  );
}

LoginForm;
