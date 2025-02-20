import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { api, security } from '@hosync/utils'

import { loginValidator } from '@/validators/login'

import { LoginFormValues } from './providers/login'

export const BASE_PATH = '/api/auth'

const scope = 'openid email profile https://www.googleapis.com/auth/contacts'

async function refreshAccessToken(token: any) {
  try {
    const body = {
      client_id: process.env.AUTH_GOOGLE_ID || '',
      client_secret: process.env.AUTH_GOOGLE_SECRET || '',
      refresh_token: token.refreshToken,
      grant_type: 'refresh_token'
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(body)
    })

    const refreshedTokens: any = await response.json()

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return { ...token, error: 'RefreshAccessTokenError' }
  }
}

const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      async authorize(credentials): Promise<any> {
        const validatedFields = loginValidator(
          credentials as unknown as LoginFormValues
        )

        if (validatedFields.isSuccess) {
          const { email, password } = validatedFields.safeValues

          const body = {
            email: email.toLowerCase(),
            password: security.password.encrypt(password)
          }

          console.log('BODY XXXX===>', body)

          const response = await api.fetch<any>(
            `${process.env.API_URL}/api/v1/user/login`,
            {
              method: 'POST',
              body
            }
          )

          console.log('RESPONSE credentials===>', response)

          if (response.ok) {
            const { items } = response
            const user = items[0].user

            return {
              id: user.id,
              name: user.fullName,
              email: user.email,
              role: 'admin'
            }
          }
        }

        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope,
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  ],
  callbacks: {
    async signIn(allData: any) {
      console.log('ALL DATA ===>', allData)

      const response = await api.fetch<any>(
        `${process.env.API_URL}/api/v1/account/link`,
        {
          method: 'POST',
          body: {
            ...allData,
            scope
          }
        }
      )

      if (!response.ok) {
        return `/auth/register?error=account&email=${allData.user.email}`
      }

      const connectedUser = response.items[0]
      const isActive = connectedUser.active

      if (!isActive) {
        return `/auth/error?error=inactive&email=${allData.user.email}`
      }

      return true
    },
    async jwt(params: { token: any; account: any; user: any; profile?: any }) {
      // console.log('JWT COMPLETA===>', params)
      const { token, account, user } = params

      const email = account?.email ?? user?.email

      const response = await api.fetch<any>(
        `${process.env.API_URL}/api/v1/user/by/email/${email}`,
        {
          method: 'GET'
        }
      )

      if (response.ok) {
        const localUser = response.items[0]

        token.id = localUser.id
        token.name = localUser.fullName
        token.tier = localUser.tier
        token.role = localUser.role
        token.phone = localUser.phone
        token.avatar = localUser.avatar
        token.code = localUser.code

        const businessResponse = await api.fetch<any>(
          `${process.env.API_URL}/api/v1/business/by/userId/${localUser.id}`,
          {
            method: 'GET'
          }
        )

        if (businessResponse.ok) {
          const business = businessResponse.items[0]

          token.businessId = business.id
          token.businessName = business.name
          token.slug = business.slug
          token.businessEmail = business.email
          token.logo = business.logo

          // Login using Google
          if (account) {
            token.accessToken = account.access_token
            token.refreshToken = account.refresh_token
            token.accessTokenExpires =
              Date.now() + (account?.expires_in ?? 0) * 1000

            if (Date.now() < token.accessTokenExpires) {
              return token
            }

            if (token.refreshToken) {
              return await refreshAccessToken(token)
            }
          }
        }
      }

      return token
    },
    async session(params: any) {
      console.log('SESSION COMPLETA===>', params)
      const { session, token } = params
      session.user.id = token.id
      session.user.name = token.name
      session.user.accessToken = token.accessToken
      session.user.role = token.role
      session.user.tier = token.tier
      session.user.phone = token.phone
      session.user.avatar = token.avatar
      session.user.code = token.code
      session.user.business = {
        businessId: token.businessId,
        name: token.businessName,
        slug: token.slug,
        email: token.businessEmail,
        logo: token.logo
      }

      return session
    }
  },
  basePath: BASE_PATH,
  secret: process.env.AUTH_CREDENTIALS_SECRET
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
