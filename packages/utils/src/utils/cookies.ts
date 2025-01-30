import security from './security'

const isClient = typeof window !== 'undefined'

const cookies = {
  get(cookie: string, cookiesStr = '') {
    if (!cookiesStr && isClient) {
      cookiesStr = document.cookie
    }

    const cookiesObj = cookiesStr.split('; ').reduce((prev: any, current: string) => {
      const [name, ...value] = current.split('=')
      prev[name] = value.join('=')
      return prev
    }, {})

    let parsed = cookiesObj[cookie] || ''

    try {
      parsed = JSON.parse(cookiesObj[cookie])
    } catch (e) {
      // console.log(e)
    }

    return parsed
  },
  set({
    name = '',
    value = '',
    days = 7,
    expiration = 0,
    secure = false,
    httpOnly = false
  }: {
    name: string
    value: string
    days?: number
    expiration?: number
    secure?: boolean
    httpOnly?: boolean
  }) {
    if (!name) {
      return false
    }

    let cookieString = `${name}=${value}`

    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      cookieString += `; expires=${date.toUTCString()}`
    }

    if (expiration > 0) {
      const date = new Date()
      date.setTime(expiration)
      cookieString += `; expires=${date.toUTCString()}`
    }

    if (secure) {
      cookieString += '; Secure'
    }

    if (httpOnly) {
      cookieString += '; HttpOnly'
    }

    cookieString += '; path=/'

    document.cookie = cookieString

    return true
  },
  delete(name: string) {
    this.set({
      name,
      value: '',
      days: -1
    })
  },
  getUserData(at = '') {
    const [, payload] = at.split('.')

    if (payload) {
      const response: any = security.base64.decode(payload)

      if (response?.data) {
        const user: any = security.base64.decode(response.data)

        const userData: any = {
          at,
          isLogged: !!at,
          user
        }

        return userData
      }
    }

    return {
      isLogged: false,
      user: {}
    }
  }
}

export default cookies
