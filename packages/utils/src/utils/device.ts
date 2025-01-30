type DeviceType = 'Mobile' | 'Tablet' | 'Desktop' | 'Unknown'
type Orientation = 'Portrait' | 'Landscape' | 'Unknown'

const device = {
  type(ua?: string): DeviceType {
    const userAgent = ua || (typeof navigator === 'undefined' ? '' : navigator.userAgent)
    const mobile = /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile/.test(userAgent)
    const tablet = /Tablet|iPad/i.test(userAgent)

    if (mobile) return 'Mobile'
    if (tablet) return 'Tablet'
    if (!mobile && !tablet) return 'Desktop'

    return 'Unknown'
  },
  brand(ua?: string): string | null {
    const userAgent = ua || (typeof navigator === 'undefined' ? '' : navigator.userAgent)

    if (/Windows Phone/i.test(userAgent)) return 'Microsoft'
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'Apple'
    if (/Android/i.test(userAgent)) return 'Android'
    if (/BlackBerry/i.test(userAgent)) return 'BlackBerry'
    if (/Firefox/i.test(userAgent)) return 'Mozilla Firefox'
    if (/MSIE|Trident/i.test(userAgent)) return 'Microsoft Internet Explorer'
    if (/bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent)) return 'Bot'
    if (/Chrome/i.test(userAgent)) return 'Chrome'
    if (/Safari/i.test(userAgent)) return 'Safari'
    if (/Opera/i.test(userAgent)) return 'Opera'
    if (/Edge/i.test(userAgent)) return 'Microsoft Edge'

    return null
  },
  orientation(): Orientation {
    if (typeof window === 'undefined') return 'Unknown'

    if (window.innerHeight > window.innerWidth) {
      return 'Portrait'
    } else {
      return 'Landscape'
    }
  },
  language(reqHeaders?: any): string | null {
    // If headers are provided (in SSR context)
    if (reqHeaders && reqHeaders['accept-language']) {
      return reqHeaders['accept-language'].split(',')[0]
    }

    // If running in browser context
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language
    }

    return null
  },
  languages(reqHeaders?: any): string[] | null {
    // If headers are provided (in SSR context)
    if (reqHeaders && reqHeaders['accept-language']) {
      return reqHeaders['accept-language']
        .split(',')
        .map((lang: string) => lang.split(';')[0].trim())
    }

    // If running in browser context
    if (typeof navigator !== 'undefined' && navigator.languages) {
      return [...navigator.languages]
    }

    return null
  },
  is(type: string, ua?: string): boolean {
    switch (type.toLowerCase()) {
      case 'ssr':
        return typeof window === 'undefined'
      case 'mobile':
        return this.type(ua) === 'Mobile'
      case 'tablet':
        return this.type(ua) === 'Tablet'
      case 'desktop':
        return this.type(ua) === 'Desktop'
      case 'portrait':
        return this.orientation() === 'Portrait'
      case 'landscape':
        return this.orientation() === 'Landscape'
      case 'english':
        return this.language() === 'en' || this.language() === 'en-US'
      case 'bot':
        return this.brand() === 'Bot'
      case 'chrome':
        return this.brand() === 'Chrome'
      case 'safari':
        return this.brand() === 'Safari'
      case 'firefox':
        return this.brand() === 'Mozilla Firefox'
      case 'ie':
        return this.brand() === 'Microsoft Internet Explorer'
      case 'edge':
        return this.brand() === 'Microsoft Edge'
      case 'opera':
        return this.brand() === 'Opera'
      default:
        return false
    }
  }
}

export default device
