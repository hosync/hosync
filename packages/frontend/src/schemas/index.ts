import * as z from 'zod'

const validations = {
  email: z.string().email({
    message: 'Email is required'
  }),
  fullName: z.string().min(1, {
    message: 'Name is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
}

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password
})

export const RegisterSchema = z.object({
  email: validations.email,
  password: validations.password,
  fullName: validations.fullName
})

export type LoginSchemaValues = z.infer<typeof LoginSchema>
export type RegisterSchemaValues = z.infer<typeof RegisterSchema>
export type AlertValues = {
  error?: string
  success?: string
}
