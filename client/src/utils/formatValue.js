export const formatValue = (value, fallback = "—") => {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }

    return value;
};