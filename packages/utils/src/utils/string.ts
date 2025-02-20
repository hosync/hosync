const str = {
  ellipsis: (text?: string, maxLength = 20): string => {
    if (!text) {
      return ''
    }

    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...'
    }

    return text
  },
  initials(str?: string): string {
    return str
      ? str
          .split(' ')
          .map((word) => word[0].toUpperCase())
          .join('')
      : ''
  }
}

export default str
