const slug = (str: string): string => {
  if (!str) {
    return ''
  }

  str = str.toLowerCase().trim()
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  str = str.replace(/[^a-z0-9\s-]/g, ' ').trim()
  str = str.replace(/[\s-]+/g, '-')

  return str
}

export default slug
