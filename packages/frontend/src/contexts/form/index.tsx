import React, { createContext, useCallback, useReducer } from 'react'

import {
  createFormReducer,
  createInitialState,
  createNextStep,
  createPreviousStep,
  createValidate,
  FormContextType
} from './helpers'

export const FormContext = createContext<FormContextType<any> | undefined>(
  undefined
)

export function createFormProvider<T>() {
  return function FormProvider({
    children,
    initialValues,
    totalSteps,
    validator
  }: {
    children: React.ReactNode
    initialValues: T
    totalSteps: number
    validator?: (values: T, step: number) => Record<string, string>
  }) {
    const [state, dispatch] = useReducer(
      createFormReducer<T>(),
      createInitialState(initialValues)
    )

    const validate = createValidate(state, dispatch, validator)
    const nextStep = createNextStep(state, dispatch, totalSteps, validate)
    const previousStep = createPreviousStep(state, dispatch)

    const setFormValues = useCallback((values: Partial<T>) => {
      dispatch({ type: 'SET_VALUES', payload: values })
    }, [])

    const value = {
      state,
      dispatch,
      nextStep,
      previousStep,
      setFormValues,
      validate
    }

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
  }
}
