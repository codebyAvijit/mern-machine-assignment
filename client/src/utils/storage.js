export const getStorageItem = (key, fallback = null) => {
    try {
        const value = localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : fallback;
    } catch {
        return fallback;
    }
};

export const setStorageItem = (key, value) => {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error) {
        console.error(
            "Failed to save localStorage:",
            error
        );
    }
};

export const removeStorageItem = (key) => {
    localStorage.removeItem(key);
};