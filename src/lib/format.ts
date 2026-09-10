export function formatPrice(price: string): string {
  if (price.startsWith("From ")) {
    return `From ${price.slice(5)} kr`;
  }
  return `${price} kr`;
}

export function formatPriceShort(price: string): string {
  return `${price.replace("From ", "")} kr`;
}