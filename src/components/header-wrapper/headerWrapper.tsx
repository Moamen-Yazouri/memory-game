import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AllowHeader } from "./constatnts";
import GameHeader from "../main-header/mainHeader";
import Box from "@mui/material/Box";
import { GameThemeContext } from "@/providers/theme/themeContext";

interface IProps {
  children: React.ReactNode;
}

const HeaderWrapper = ({ children }: IProps) => {
    const pathname = useLocation().pathname;
    const { theme } = useContext(GameThemeContext);
    const scrollbarStyles = {
        overflowY: "auto",
        height: "100vh",
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.paper,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '6px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    };

  return AllowHeader.includes(pathname) ? (
    <Box sx={scrollbarStyles}>
      <GameHeader />
      <main>{children}</main>
    </Box>
  ) : (
    <Box sx={scrollbarStyles}>{children}</Box>
  );
};

export default HeaderWrapper;
