
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import toast from "react-hot-toast";
import { FormFieldWrapper } from "../../components/ui/FormFieldWrapper";
import { Input } from "../../components/ui/Input";
import { useSignup } from "../../features/auth/hooks";
import AuthLayout from "./AuthLayout";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync: signup } = useSignup();

  const [form, setForm] = React.useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await toast.promise(signup(form), {
      loading: "Creating account...",
      success: "Account created 🎉",
      error: "Signup failed",
    });
    navigate({ to: "/home" });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join us and unlock all features instantly."
      quote="Switching was the best decision I made for my workflow."
      author="James Lee"
      role="Product Designer"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormFieldWrapper label="Name" htmlFor="name">
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </FormFieldWrapper>

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
          Sign up
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            className="text-emerald-600 hover:underline"
            onClick={() => navigate({ to: "/auth" })}
          >
            Log in
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
