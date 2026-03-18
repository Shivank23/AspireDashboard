export function generateCardNumber() {
  const groups = Array.from({ length: 4 }, () =>
    Math.floor(1000 + Math.random() * 9000)
  )
  return groups.join(' ')
}

export function generateExpiryDate() {
  const now = new Date()
  const yearsAhead = Math.floor(1 + Math.random() * 5)
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String((now.getFullYear() + yearsAhead) % 100).padStart(2, '0')
  return `${month}/${year}`
}

export function generateCVV() {
  return String(Math.floor(100 + Math.random() * 900))
}

export function createCard(cardholderName) {
  return {
    id: crypto.randomUUID(),
    cardholderName,
    cardNumber: generateCardNumber(),
    expiry: generateExpiryDate(),
    cvv: generateCVV(),
    status: 'active',
    createdAt: new Date().toISOString(),
  }
}

export function maskCardNumber(cardNumber) {
  const parts = cardNumber.split(' ')
  return parts
    .map((part, i) => (i < parts.length - 1 ? '••••' : part))
    .join(' ')
}

export function formatCurrency(amount, currency = 'S$') {
  return `${currency} ${Number(amount).toLocaleString('en-SG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`
}
