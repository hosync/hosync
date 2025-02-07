import { useCallback } from 'react'

export type FormStep = number
export type FormDirection = 'forward' | 'back'

export interface FormContextType<T> {
  state: FormState<T>
  dispatch: React.Dispatch<FormAction<T>>
  nextStep: () => void
  previousStep: () => void
  setFormValues: (values: Partial<T>) => void
  validate: (step: number) => boolean
}

export type FormAction<T> =
  | { type: 'SET_VALUES'; payload: Partial<T> }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }

export interface FormState<T> {
  values: T
  initialValues: T
  currentStep: FormStep
  direction: FormDirection
  errors: Record<string, string>
}

export function createFormReducer<T>() {
  return (state: FormState<T>, action: FormAction<T>): FormState<T> => {
    switch (action.type) {
      case 'SET_VALUES':
        return {
          ...state,
          values: { ...state.values, ...action.payload }
        }
      case 'SET_ERRORS':
        return {
          ...state,
          errors: action.payload
        }
      case 'NEXT_STEP':
        return {
          ...state,
          currentStep: state.currentStep + 1,
          direction: 'forward'
        }
      case 'PREVIOUS_STEP':
        return {
          ...state,
          currentStep: Math.max(1, state.currentStep - 1),
          direction: 'back'
        }
      default:
        return state
    }
  }
}

export function createInitialState<T>(initialValues: T): FormState<T> {
  return {
    values: initialValues,
    initialValues,
    currentStep: 1,
    direction: 'forward',
    errors: {}
  }
}

export function createValidate<T>(
  state: FormState<T>,
  dispatch: React.Dispatch<FormAction<T>>,
  validator?: (values: T, step: number) => Record<string, string>
) {
  return useCallback(
    (step: number): boolean => {
      if (!validator) return true

      const errors = validator(state.values, step)
      const hasErrors = Object.keys(errors).length > 0

      dispatch({ type: 'SET_ERRORS', payload: errors })
      return !hasErrors
    },
    [state.values, validator, dispatch]
  )
}

export function createNextStep<T>(
  state: FormState<T>,
  dispatch: React.Dispatch<FormAction<T>>,
  totalSteps: number,
  validate: (step: number) => boolean
) {
  return useCallback(() => {
    if (state.currentStep < totalSteps && validate(state.currentStep)) {
      dispatch({ type: 'NEXT_STEP' })
    }
  }, [state.currentStep, totalSteps, validate, dispatch])
}

export function createPreviousStep<T>(
  state: FormState<T>,
  dispatch: React.Dispatch<FormAction<T>>
) {
  return useCallback(() => {
    if (state.currentStep > 1) {
      dispatch({ type: 'PREVIOUS_STEP' })
      dispatch({ type: 'SET_ERRORS', payload: {} })
    }
  }, [state.currentStep, dispatch])
}
