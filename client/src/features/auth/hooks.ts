// useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGuest, initUser, login, loginAsGuest, logout, setCurrentUser, signup } from "./api";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: initUser,
    });
};

export const useSignup = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (vars: { email: string; password: string; name: string }) => {
            const user = await signup(vars.email, vars.password, vars.name);
            setCurrentUser(user.id);
            return user;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
    });
};

export const useLogin = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (vars: { email: string; password: string }) => {
            const user = await login(vars.email, vars.password);
            setCurrentUser(user.id);
            return user;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
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
            setCurrentUser(user.id);
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
