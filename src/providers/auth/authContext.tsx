import { IUser } from "@/@types";
import { createContext } from "react";
import useAuthContext from "./hook/useAuthContext";


interface IAuthContext {
    user: IUser | null,
    loading: boolean,
}

interface IProviderProps {
    children: React.ReactNode,
}

export const AuthContext = createContext<IAuthContext>({user: null, loading: true});

export const AuthProvider = ({ children }: IProviderProps) => {
    const {
        user,
        loading,
    } = useAuthContext();

    const value: IAuthContext = {
        user: user,
        loading: loading
    }

    return <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
}