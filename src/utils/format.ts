export function formatCurrency(v: number) {
  return v.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  });
}

export const generateGuestName = () => {
  const suffix = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
  return `Guest${suffix}`;
};
