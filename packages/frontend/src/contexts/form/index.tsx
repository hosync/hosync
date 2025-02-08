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

    const setFormValues = useCallback((values: Partial<T>) => {
      dispatch({ type: 'SET_VALUES', payload: values })
    }, [])

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target

      console.log('onChange', name, value)

      if (name.includes('.')) {
        const [parent, child] = name.split('.')
        console.log('parent', parent, 'child', child)
        setFormValues({
          [parent]: {
            ...(state.values[parent as keyof T] as any),
            [child]: value
          }
        } as Partial<T>)
      } else {
        setFormValues({ [name]: value } as Partial<T>)
      }
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
