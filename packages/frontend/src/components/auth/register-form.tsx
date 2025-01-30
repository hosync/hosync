'use client'

import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { register } from '@/actions/auth/register'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormAlert } from '@/components/form/form-alert'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { AlertValues, RegisterSchema, RegisterSchemaValues } from '@/schemas'

const RegisterForm: React.FC = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<RegisterSchemaValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: ''
    }
  })

  const onSubmit = (values: RegisterSchemaValues) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      register(values).then((data: AlertValues) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <InputWrapper
              form={form}
              label="Full name:"
              name="fullName"
              placeholder="John Doe"
              disabled={isPending}
            />

            <InputWrapper
              form={form}
              label="Email:"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              disabled={isPending}
            />

            <InputWrapper
              form={form}
              label="Password:"
              name="password"
              type="password"
              placeholder="******"
              disabled={isPending}
            />
          </div>

          <FormAlert type="error" message={error} />
          <FormAlert type="success" message={success} />

          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { RegisterForm }
