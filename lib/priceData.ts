export const PRICE_DATA = {
  product: "White Egg Tray",
  eggsPerTray: 30,
  currency: "INR",
  pricePerTray: 190,
  effectiveDate: new Date().toISOString().split("T")[0],
  trend: "stable" as "up" | "down" | "stable",
  previousPrice: 200,
  note: "Price updated every morning at 6 AM",
};

export const FLASH_SALE = {
  enabled: true,
  discount: 10,
  label: "Flash Sale — Today Only!",
  description: "Limited time offer · Ends at midnight",
};
