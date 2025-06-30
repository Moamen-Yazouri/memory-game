import { ThemeModes } from "@/@types"

export const getGradients =  (mode: ThemeModes) => {
    const isLight = mode === "light";
    const gradient = isLight  
      ? "linear-gradient(135deg, rgb(204, 188, 222), rgb(186, 171, 192))"
      : "linear-gradient(135deg, #230739 0%, #3d1561 50%, #5c3a8d 100%)";

      return gradient;
}

export const getShadows = (mode: ThemeModes) => {
    const isLight = mode === "light";
    const shadows = {
      light: {
        flip: "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)",
        hover: "0 6px 20px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08)",
        normal: "0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)",
      },
      dark: {
        flip: "0 8px 32px rgba(0,0,0,0.4), 0 4px 16px rgba(108, 53, 184, 0.3)",
        hover: "0 6px 20px rgba(0,0,0,0.3), 0 3px 10px rgba(108, 53, 184, 0.25)",
        normal: "0 4px 12px rgba(0,0,0,0.2), 0 2px 6px rgba(108, 53, 184, 0.15)",
      }
    };
    return isLight ?  shadows.light :  shadows.dark
}