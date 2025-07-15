export const getBackgroundGradient = (mode: string) => {
    if(mode === "light") {
        return "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.12) 25%, rgba(168, 85, 247, 0.08) 50%, rgba(236, 72, 153, 0.06) 75%, rgba(99, 102, 241, 0.08) 100%)"
    }
    else {
        return "linear-gradient(135deg, rgba(45, 27, 78, 0.4) 0%, rgba(26, 15, 46, 0.5) 25%, rgba(15, 5, 31, 0.4) 50%, rgba(88, 28, 135, 0.3) 75%, rgba(45, 27, 78, 0.4) 100%)"
    }
}

export const getCardGradient = (mode: string): string => {
    if(mode) {
        return "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 25%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.8) 75%, rgba(255, 255, 255, 0.95) 100%)"
    }

    else {
        return "linear-gradient(135deg, rgba(45, 27, 78, 0.95) 0%, rgba(26, 15, 46, 0.9) 25%, rgba(15, 5, 31, 0.95) 50%, rgba(88, 28, 135, 0.85) 75%, rgba(45, 27, 78, 0.95) 100%)";
    }
}