'use client'

import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'

import { login } from '@/actions/auth/login'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormAlert } from '@/components/form/form-alert'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { AlertValues } from '@/schemas'
import validation, { LoginValues } from '@/validations'

const LoginForm: React.FC = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<LoginValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: LoginValues) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values).then((data: AlertValues) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { LoginForm }
