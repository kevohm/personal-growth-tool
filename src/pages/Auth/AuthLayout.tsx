// AuthLayout.tsx
import * as React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  quote?: string;
  author?: string;
  role?: string;
};

const AuthLayout: React.FC<Props> = ({
  title,
  subtitle,
  children,
  imageUrl = "https://images.unsplash.com/photo-1551836022-d5d88e9218df", // placeholder
  quote,
  author,
  role,
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left side image/quote */}
      <div className="hidden w-1/2 lg:flex flex-col justify-center items-center bg-gray-900 text-white relative">
        <img
          src={imageUrl}
          alt="Auth visual"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="relative z-10 p-12">
          {quote && <p className="text-2xl font-semibold mb-4">“{quote}”</p>}
          {author && (
            <div>
              <p className="font-bold">{author}</p>
              <p className="text-sm opacity-80">{role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right side form */}
      <div className="flex w-full items-center justify-center lg:w-1/2 p-8">
        <div className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
