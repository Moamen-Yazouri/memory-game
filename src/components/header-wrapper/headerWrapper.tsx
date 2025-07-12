import React from 'react'
import { useLocation } from 'react-router-dom'
import { AllowHeader } from './constatnts';
import GameHeader from '../main-header/mainHeader';
import Box from '@mui/material/Box';
interface IProps {
    children: React.ReactNode
}
const HeaderWrapper = (props: IProps) => {
    const pathname = useLocation().pathname;
    if(AllowHeader.includes(pathname)) {
        return (
            <>
                <GameHeader />
                
                <main>
                    {props.children}
                </main>
            </>
        )
    }
    else {
        return (
            <>{props.children}</>
        )
    }
}

export default HeaderWrapper;