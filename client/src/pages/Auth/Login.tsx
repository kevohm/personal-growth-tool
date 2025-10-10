import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import toast from "react-hot-toast";
import { FormFieldWrapper } from "../../components/ui/FormFieldWrapper";
import { Input } from "../../components/ui/Input";
import { useLogin } from "../../features/auth/hooks";
import AuthLayout from "./AuthLayout";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync: login } = useLogin();

  const [form, setForm] = React.useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toast.promise(login(form), {
      loading: "Logging in...",
      success: "Welcome back 👋",
      error: "Invalid credentials",
    });
    navigate({ to: "/home" });
  };

  const handleGuestLogin = async () => {
    await toast.promise(
      login({
        email: "guest@example.com",
        password: "password",
      }),
      {
        loading: "Logging in...",
        success: "Welcome back 👋",
        error: "Invalid credentials",
      }
    );
    navigate({ to: "/home" });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Build your design system effortlessly with our powerful tools."
      quote="Simply all the tools that my team and I need."
      author="Karen Yue"
      role="Director of Digital Marketing Technology"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormFieldWrapper label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Password" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </FormFieldWrapper>

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 py-2 text-white font-semibold hover:bg-emerald-700"
        >
          Log in
        </button>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full rounded-lg border border-emerald-600 py-2 text-emerald-600 font-semibold hover:bg-emerald-50"
        >
          Login as Guest
        </button>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="text-sm text-emerald-600 hover:underline"
            onClick={() => navigate({ to: "/auth/signup" })}
          >
            Don’t have an account? Sign up
          </button>
          <button
            type="button"
            className="text-sm text-gray-500 hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
