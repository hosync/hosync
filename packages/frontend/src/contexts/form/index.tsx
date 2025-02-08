import React, { createContext, useCallback, useReducer } from 'react'

import { ValidatorResult } from '@/lib/utils/validations'

import {
  createFormReducer,
  createInitialState,
  createNextStep,
  createPreviousStep,
  createStepValidate,
  createSubmitForm,
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
    validator,
    singleValidator,
    onSubmit
  }: {
    children: React.ReactNode
    initialValues: T
    totalSteps?: number
    validator?: (values: T, step?: number) => ValidatorResult
    singleValidator?: (values: T) => ValidatorResult
    onSubmit?: (values: T) => Promise<any>
  }) {
    const [state, dispatch] = useReducer(
      createFormReducer<T>(),
      createInitialState(initialValues, totalSteps ?? 1)
    )

    const validateStep = createStepValidate(state, dispatch, validator)
    const validate = createValidate(state, dispatch, singleValidator)

    const nextStep = createNextStep(state, dispatch, totalSteps, validateStep)
    const previousStep = createPreviousStep(state, dispatch)
    const submitForm = createSubmitForm(state, dispatch, validate, onSubmit)

    const setFormValues = useCallback(
      (values: Partial<T> | ((prevValues: T) => Partial<T>)) => {
        if (typeof values === 'function') {
          dispatch({ type: 'SET_VALUES', payload: values(state.values) })
        } else {
          dispatch({ type: 'SET_VALUES', payload: values })
        }
      },
      [state.values]
    )

    const onChange = (
      event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | null,
      manual?: { name: string; value: any }
    ) => {
      let name: string
      let value: any

      if (manual) {
        // Handle manual object case
        name = manual.name
        value = manual.value
      } else if (event) {
        // Handle event case
        name = event.target.name
        value = event.target.value
      } else {
        return
      }

      console.log('onChange', name, value)

      setFormValues((prevValues: T) => {
        const newValues = { ...prevValues }

        if (name.includes('.')) {
          const [parent, child] = name.split('.')

          newValues[parent as keyof T] = {
            ...(newValues[parent as keyof T] || {}),
            [child]: value
          } as any
        } else {
          newValues[name as keyof T] = value
        }

        return newValues
      })
    }

    const value = {
      state,
      dispatch,
      nextStep,
      previousStep,
      setFormValues,
      validate,
      onChange,
      submitForm
    }

    // @ts-ignore
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
  }
}
