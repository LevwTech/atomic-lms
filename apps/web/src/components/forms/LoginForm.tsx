import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useFormik } from "formik";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

interface LoginFormProps {
  logo: string;
}

export function LoginForm({ logo }: LoginFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        username: z.string().min(4).max(40),
        password: z.string().min(8).max(60),
      }),
    ),
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
        navigate("/courses");
      } else {
        setLoading(false);
        toast.error("Invalid credentials");
      }
    },
  });

  return (
    <div className="w-[50%]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[480px] mx-auto"
      >
        <img alt="Logo" className="w-72 self-center mb-20" src={logo} />
        <FormInput
          required
          name="username"
          type="text"
          onChange={handleChange}
          value={values.username}
          error={errors.username}
          touched={touched.username}
          placeHolder="Username"
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
      </form>
    </div>
  );
}
