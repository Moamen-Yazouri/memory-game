export const getShowTime = (totalCards: number) => {
    const showTime = Math.min(8000, Math.max(2000, totalCards * 250));
    return showTime;
}