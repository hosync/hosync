import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { api, security } from '@hosync/utils'

import { LoginSchema } from './schemas'

export const BASE_PATH = '/api/auth'

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
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const body = {
            emailOrUsername: email.toLowerCase(),
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

            console.log('USER===>', items[0].user)
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
          scope:
            'openid email profile https://www.googleapis.com/auth/contacts',
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  ],
  callbacks: {
    async jwt({
      token,
      account,
      user
    }: {
      token: any
      account: any
      user: any
    }) {
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
    async session({ session, token }: any) {
      session.user.id = token.id
      session.user.role = token.role
      session.user.accessToken = token.accessToken
      return session
    },
    async signIn(allData: any) {
      console.log('ALL DATA ===>', allData)
      return true
    }
  },
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
