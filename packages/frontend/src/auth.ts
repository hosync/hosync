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

          console.log('BODY===>', body)

          const response = await api.fetch<any>(
            `${process.env.API_URL}/api/v1/user/login`,
            {
              method: 'POST',
              body
            }
          )

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
    async jwt(params: { token: any; account: any; user: any; profile?: any }) {
      console.log('JWT COMPLETA===>', params)
      const { token, account, user } = params

      if (user) {
        token.id = user.id // Add the user ID to the token
        token.role = user.role // Add custom role field
      }

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

      return token
    },
    async session(params: any) {
      console.log('SESSION COMPLETA===>', params)
      const { session, token } = params
      session.user.id = token.id
      session.user.role = token.role
      session.user.accessToken = token.accessToken
      return session
    },
    async signIn(allData: any) {
      console.log('ALL DATA ===>', allData)

      return true
      // try {
      //   const response = await api.fetch<any>(
      //     `${process.env.API_URL}/api/v1/account/link`,
      //     {
      //       method: 'POST',
      //       body: {
      //         ...allData,
      //         scope
      //       }
      //     }
      //   )

      //   // const connectedUser = response.items[0]
      //   // const isActive = connectedUser.active
      //   // const isLinked =
      //   //   connectedUser.providerAccountId === allData.account.providerAccountId

      //   return true
      // } catch (error) {
      //   console.error('Error linking account:', error)
      //   return true
      // }
    }
  },
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
