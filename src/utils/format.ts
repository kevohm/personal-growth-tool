export function formatCurrency(v: number) {
  return v.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  });
}
