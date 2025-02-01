import { api, security, slug } from '@hosync/utils'

import * as cookies from '@/lib/utils/cookies'
import { APIResponse, CreatedItem, Token } from '@/types/api'

import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('user')
  }

  async login({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<APIResponse<Token>> {
    const response = await api.fetch<APIResponse<Token>>(
      `${process.env.API_URL}/api/v1/user/login`,
      {
        method: 'POST',
        body: { emailOrUsername: email.toLowerCase(), password }
      }
    )

    if (response.ok) {
      const [{ token = '' }] = response.items || []

      await cookies.set({
        name: 'at',
        value: token
      })
    }

    return response
  }

  async initialSignup({
    fullName,
    businessName,
    businessEmail,
    businessPhone,
    businessWebsite,
    country
  }: {
    fullName: string
    businessName: string
    businessEmail: string
    businessPhone: string
    businessWebsite: string
    country: string
  }): Promise<any> {
    const code = security.string.code(10)
    const temporalPassword = security.password.encrypt('Abc123456$')
    const email = businessEmail.toLowerCase()

    const requests = [
      {
        url: `${process.env.API_URL}/api/v1/user/create`,
        method: 'POST',
        body: {
          tier: 'free',
          role: 'business.admin',
          email,
          password: temporalPassword,
          fullName,
          phone: businessPhone,
          avatar: '',
          birthday: '',
          website: businessWebsite,
          code,
          active: false
        },
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'emailAlreadyExists'
        }
      },
      ({ items }: any) => ({
        url: `${process.env.API_URL}/api/v1/account/create`,
        method: 'POST',
        body: {
          userId: items[0].id,
          provider: 'credentials',
          providerAccountId: '',
          accessToken: '',
          refreshToken: '',
          scope: ''
        }
      }),
      ({ items }: any) => ({
        url: `${process.env.API_URL}/api/v1/business/create`,
        method: 'POST',
        body: {
          userId: items[0].userId,
          type: 'cabin',
          name: businessName,
          slug: slug(businessName),
          email,
          phone: businessPhone,
          priceRange: '0',
          website: businessWebsite,
          facebook: '',
          instagram: '',
          youtube: '',
          logo: '',
          raiting: 5,
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          country,
          zipCode: '',
          active: true
        },
        error: {
          code: 'SERVER_ERROR_WHILE_CREATING_BUSINESS',
          message: 'serverErrorWhileCreatingBusiness'
        }
      })
    ]

    const { responses, errors } = await api.fetchChain(requests)

    if (errors.length) {
      return {
        ok: false,
        error: errors[0]
      }
    }

    return {
      ok: true,
      responses
    }
  }

  async signup({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<APIResponse<CreatedItem>> {
    const response = await api.fetch<APIResponse<CreatedItem>>(
      `${process.env.API_URL}/api/v1/user/create`,
      {
        method: 'POST',
        body: {
          email,
          password
        }
      }
    )

    return response
  }
}

const userService = new Service()

export default userService
