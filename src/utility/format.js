export const formatCurrency = (price = 0) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

export const formatDate = (date) => new Date(date).toLocaleString("id-ID");
