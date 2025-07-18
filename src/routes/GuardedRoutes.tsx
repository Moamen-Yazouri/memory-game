import GameLoader from '@/components/loader/loader';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const GuardedRoutes = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setIsAuth(true);
            }
            setLoading(false);
        })
    }, []);

    if(loading) return <GameLoader />

    if(!isAuth) {
        return (
            <Navigate
                to="/unauthenticated"
                replace
                state= {{from: location.pathname}}
            />
        )
    }

    return <Outlet/>
}

export default GuardedRoutes;