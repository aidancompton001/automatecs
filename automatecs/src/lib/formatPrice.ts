/**
 * Convert cents integer to German EUR format.
 * 829000 → "8.290,00 €"
 *
 * ЖЕЛЕЗНОЕ ПРАВИЛО: все цены в центах (integer). Форматирование ТОЛЬКО здесь.
 */
export function formatCentsToEUR(cents: number): string {
  const euros = cents / 100;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(euros);
}

/**
 * Format cents without currency symbol for compact display.
 * 829000 → "8.290"
 */
export function formatCentsCompact(cents: number): string {
  const euros = Math.floor(cents / 100);
  return new Intl.NumberFormat("de-DE").format(euros);
}
