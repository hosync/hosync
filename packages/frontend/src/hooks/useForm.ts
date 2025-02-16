import { useContext } from 'react'

import { FormContext } from '@/contexts/form'
import { FormContextType } from '@/contexts/form/helpers'

export function useForm<T>() {
  const context = useContext(FormContext) as FormContextType<T> | undefined

  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')
  }

  return context
}
