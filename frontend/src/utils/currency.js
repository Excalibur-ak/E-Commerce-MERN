
const USD_TO_INR_RATE = 82;

export const convertToINR = (usd) => (usd * USD_TO_INR_RATE).toFixed(2);