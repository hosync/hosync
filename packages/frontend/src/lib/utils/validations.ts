function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+\d{1,3}\s?\d{2,4}[-\s]?\d{3,4}[-\s]?\d{4}$/
  return phoneRegex.test(phone)
}

function isValidZipCode(zip: string): boolean {
  const zipRegex = /^\d{5}$/
  return zipRegex.test(zip)
}

function isValidUrl(url: string): boolean {
  const urlRegex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/
  return urlRegex.test(url)
}

function isValidDate(date: string): boolean {
  return !isNaN(Date.parse(date))
}

function isValidGoogleMapsUrl(url: string): boolean {
  return (
    url.startsWith('https://www.google.com/maps') ||
    url.startsWith('https://www.google.com.mx/maps') ||
    url.startsWith('https://google.com/maps') ||
    url.startsWith('https://google.com.mx/maps') ||
    url.startsWith('https://maps.app.goo.gl')
  )
}

const isValidFullName = (name: string) => {
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*\s+[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(
    name.trim()
  )
}

const isEmpty = (value: string) => {
  const v = value.trim()
  return v === '' || v === null || v === undefined
}

type PasswordValidation = {
  min: (length: number) => PasswordValidation
  lowercase: () => PasswordValidation
  uppercase: () => PasswordValidation
  digit: () => PasswordValidation
  special: () => PasswordValidation
  getMessage: () => string
}

function isValidPassword(
  value: string,
  messages: Record<string, string>
): PasswordValidation {
  let lastError: string = ''

  return {
    min(length: number): PasswordValidation {
      if (value.length < length) lastError = messages.min
      return this
    },
    lowercase(): PasswordValidation {
      if (!/[a-z]/.test(value)) lastError = messages.lowercase
      return this
    },
    uppercase(): PasswordValidation {
      if (!/[A-Z]/.test(value)) lastError = messages.uppercase
      return this
    },
    digit(): PasswordValidation {
      if (!/\d/.test(value)) lastError = messages.digit
      return this
    },
    special(): PasswordValidation {
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) lastError = messages.special
      return this
    },
    getMessage(): string {
      return lastError || ''
    }
  }
}

function sanitizeValues<T>(values: T): T {
  const sanitized: any = {}

  Object.entries(values as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      sanitized[key] = value.trim().replace(/(<([^>]+)>)/gi, '')
    } else {
      sanitized[key] = value
    }
  })

  return sanitized as T
}

export type ValidatorResult = {
  isSuccess: boolean
  error: Record<string, string>
  safeValues: Record<string, any>
}

export {
  isEmpty,
  isValidDate,
  isValidEmail,
  isValidFullName,
  isValidGoogleMapsUrl,
  isValidPassword,
  isValidPhone,
  isValidUrl,
  isValidZipCode,
  sanitizeValues
}
