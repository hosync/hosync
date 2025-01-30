const is = (value?: any) => ({
  array() {
    return Array.isArray(value)
  },
  client() {
    return typeof window !== 'undefined'
  },
  server() {
    return typeof window === 'undefined'
  },
  defined() {
    return typeof value !== 'undefined' && value !== null
  },
  email() {
    return /^(?!.*\.\.)[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  phone() {
    const regex = /^\+\d{1,2}( \d{3} \d{3} \d{4}|\d{3}-\d{3}-\d{4}|\d{10})$/
    return regex.test(value)
  },
  url() {
    const regex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/
    return regex.test(value)
  },
  empty() {
    if (typeof value === 'string') {
      return value === ''
    }

    if (Array.isArray(value)) {
      return value.length === 0
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return true
    }

    for (const key in value) {
      if (value[key] === '' || !value[key]) {
        return true
      }
    }

    return false
  },
  json() {
    if (typeof value !== 'string' || !value) {
      return false
    }

    try {
      JSON.parse(value)
    } catch (e) {
      return false
    }

    return true
  },
  number() {
    return typeof value === 'number'
  },
  string() {
    return typeof value === 'string'
  }
})

export default is
