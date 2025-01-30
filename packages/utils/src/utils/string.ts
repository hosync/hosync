const str = {
  ellipsis: (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...'
    }

    return text
  },
  initials(str: string): string {
    return str
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('')
  }
}

export default str
