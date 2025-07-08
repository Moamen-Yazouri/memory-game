import { IUser } from "@/@types";
import authService from "@/service/auth.service";
import { useEffect, useState } from "react";

const useAuthContext = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{

        authService.getLoggedUser()
        .then((user) => {
            if (user && user.email && user.displayName) {
                    const signedUser: IUser = {
                        id: user.uid,
                        email: user.email,
                        name: user.displayName,
                    } 
                    setUser(signedUser);
                }
        }).catch((e) => {
            console.error("Something went wrong on Authentication:", e); 
        })
        .finally(() => {
            setLoading(false);
        });
        
    }, []);

    return {
        user,
        loading,
    }
}

export default useAuthContext;