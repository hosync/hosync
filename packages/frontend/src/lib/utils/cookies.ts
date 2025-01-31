'use server'

import { cookies } from 'next/headers'

export const get = async (name: string, defaultValue: any = '') => {
  const value = (await cookies()).get(name)?.value || defaultValue

  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return value
}

export const set = async ({
  name,
  value,
  path = '/',
  maxAge = 60 * 60 * 24 * 30
}: {
  name: string
  value: string
  path?: string
  maxAge?: number
}) => {
  ;(await cookies()).set({
    name,
    value,
    path,
    maxAge
  })
}

export const del = async (name: string) => {
  await set({
    name,
    value: '',
    maxAge: -1
  })
}
