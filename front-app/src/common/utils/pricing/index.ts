export const mounthToAnnual = (price: number) => {
    return price * 10;
};

export const sanitizePrice = (price: number) => {
    return price.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
};

export const getTva = (amount: number) => {
    return amount * 0.2;
};

export const getHt = (amount: number) => {
    return amount - amount * 0.2;
};
