/**
 * Format an international phone number for display.
 * "+40751106451" → "0751 106 451"
 */
export function formatPhoneForDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  // Remove country code "40" prefix
  const local = digits.startsWith('40') ? '0' + digits.slice(2) : digits;
  // Format as 4-3-3 grouping: 0751 106 451
  return local.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3');
}

/**
 * Format an international phone number for tel: links.
 * "+40751106451" → "0751106451"
 */
export function formatPhoneForTel(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  // Remove country code "40" prefix
  return digits.startsWith('40') ? '0' + digits.slice(2) : digits;
}
