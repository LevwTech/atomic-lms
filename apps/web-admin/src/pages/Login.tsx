import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="flex h-screen justify-center p-20 bg-[#EFF4FF]">
      <div className="w-[50%] flex flex-col items-center gap-8 bg-[#11664F] justify-center rounded-l-lg">
        <img src={"Atomic Logo.svg"} className="w-64" />
        <div className="flex flex-col items-center">
          <p className="text-white text-4xl font-semibold">Admin Portal</p>
          <p className="text-white text-lg">Atomic LMS</p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
