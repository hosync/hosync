'use client'

import { useState, useTransition } from 'react'

import { core } from '@hosync/utils'

import { login } from '@/actions/auth/login'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormAlert } from '@/components/form/form-alert'
import { Button } from '@/components/ui/button'
import { InputWrapper } from '@/components/ui/input-wrapper'
import validation, { AlertValues, LoginValues } from '@/validations'

const LoginForm: React.FC = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const onSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const values = core.formData.get(formData)
    const validatedFields = validation.login<LoginValues>(values as LoginValues)

    setError('')
    setSuccess('')

    startTransition(() => {
      login(validatedFields.safeValues).then((data: AlertValues) => {
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
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <InputWrapper
            label="Email:"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            disabled={isPending}
          />

          <InputWrapper
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
    </CardWrapper>
  )
}

export { LoginForm }
