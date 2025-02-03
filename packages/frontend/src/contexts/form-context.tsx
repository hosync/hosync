import { createContext, ReactNode, useContext } from 'react'

import { useForm } from '@/hooks/useForm'

// ✅ Define the expected structure of `useForm<T>()`
type FormType<T extends Record<string, any>> = {
  state: {
    values: T
    errors: T
    isSubmitted: boolean
    isSuccess: boolean | null
  }
  dispatch: React.Dispatch<any>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
}

type FormContextType<T extends Record<string, any>> = FormType<T> | null

// ✅ Create the context
const FormContext = createContext<FormContextType<any>>(null)

export const FormProvider = <T extends Record<string, any>>({
  children,
  initialValues,
  validate,
  onSubmitAction
}: {
  children: ReactNode
  initialValues: T
  validate: (values: T) => { success: boolean; error?: T; safeValues?: T }
  onSubmitAction: (
    values: T
  ) => Promise<{ ok: boolean; error?: { code: string } }>
}) => {
  const form = useForm<T>({ initialValues, validate, onSubmitAction })

  return <FormContext.Provider value={form}>{children}</FormContext.Provider>
}

// ✅ Ensure correct typing for `useFormContext`
export const useFormContext = <T extends Record<string, any>>() => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context as FormType<T> // ✅ Now `state`, `onSubmit`, etc., are properly typed!
}
