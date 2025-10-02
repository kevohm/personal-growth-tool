import type { DeepReadonlyObject } from "rxdb";
import { useCurrentUser } from "../features/auth/hooks";

type User = {
  id: string;
  email?: string;
  name: string;
  isGuest: boolean;
};

// A wrapper hook to simplify usage
export const useAuth = () => {
  const { data, isLoading, error } = useCurrentUser();

  const user = data as User | null;

  return {
    user,        // logged in user or null
    isLoading,   // still fetching
    isGuest: user?.isGuest ?? false,
    isLoggedIn: !!user && !user.isGuest,
    error,
  };
};
