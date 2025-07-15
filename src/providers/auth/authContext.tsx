import { IUser } from "@/@types";
import { createContext } from "react";
import useAuthContext from "./hook/useAuthContext";


interface IAuthContext {
    user: IUser | null,
    loading: boolean,
    login: (data: IUser) => void,
    logout: () => void
}

interface IProviderProps {
    children: React.ReactNode,
}
const INITIAL_CONTEXT = {
    user: null,
    loading: false,
    login: () => { },
    logout:  () => { }
}
export const AuthContext = createContext<IAuthContext>(INITIAL_CONTEXT);

export const AuthProvider = ({ children }: IProviderProps) => {
    const {
        user,
        loading,
        logout,
        login,
    } = useAuthContext();

    const value: IAuthContext = {
        user: user,
        loading: loading,
        login,
        logout,
    }

    return <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
}