'use server'

import { SignUpSchema, SignUpSchemaValues } from '@/schemas'

export const register = async (values: SignUpSchemaValues) => {
  const validatedFields = SignUpSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields'
    }
  }

  return {
    success: 'Email sent'
  }
}
