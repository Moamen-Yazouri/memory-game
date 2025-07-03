import { IUser } from "@/@types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { createContext, useEffect, useState } from "react";


interface IAuthContext {
    user: IUser | null,
    loading: boolean,
}

interface IProviderProps {
    children: React.ReactNode,
}

export const AuthContext = createContext<IAuthContext>({user: null, loading: true});

export const AuthProvider = ({ children }: IProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
          const  disconnect = onAuthStateChanged(auth, (user) => {
            if (user && user.email && user.displayName) {
                const signedUser: IUser = {
                    id: user.uid,
                    email: user.email,
                    name: user.displayName,
                } 
                setUser(signedUser);
            } else {
              setUser(null);
            }
          });
          setLoading(false);
          return () => disconnect();
    }, []);

    const value: IAuthContext = {
        user: user,
        loading: loading
    }

    return <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
}