// useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../../models/user";
import { setTokens } from "../axios";
import { createGuest, getCurrentUser, login, loginAsGuest, logout, setCurrentUserId, signup } from "./api";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });
};

export const useSignup = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (vars: { email: string; password: string; name: string }) => {
            const user = await signup(vars.email, vars.password, vars.name);
            setCurrentUserId(user.id);
            return user;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
    });
};

export const useLogin = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ email, password }: Pick<User, "email" | "password">) => login(email, password),
        onSuccess: (data) => {
            setTokens(data.tokens)
            qc.invalidateQueries({ queryKey: ["currentUser"] })
        },
    });
};




export const useLoginAsGuest = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (name: string | undefined = undefined) => loginAsGuest(name),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
    });
};

export const useGuest = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (name?: string) => {
            const user = await createGuest(name);
            setCurrentUserId(user.id);
            return user;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
    });
};

export const useLogout = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
    });
};
