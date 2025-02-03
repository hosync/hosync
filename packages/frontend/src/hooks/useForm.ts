import { useEffect, useReducer, useState } from 'react'

type State<T> = {
  values: T
  errors: T // ✅ Errors now have the same shape as `values`
  isSubmitted: boolean
  isSuccess: boolean | null
}

// ✅ Ensure `errors` has the same fields as `values`
const initializeFields = <T extends Record<string, any>>(values: T): T => {
  return Object.keys(values).reduce(
    (acc, key) => ({ ...acc, [key]: '' }), // Initialize all fields to empty strings
    {} as T
  )
}

const reducer = <T>(state: State<T>, action: any): State<T> => {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, values: { ...state.values, ...action.payload } }
    case 'SET_ERRORS':
      return { ...state, errors: { ...state.errors, ...action.payload } } // ✅ Merge errors instead of replacing
    case 'SET_SUBMITTED':
      return {
        ...state,
        isSubmitted: action.payload.submitted,
        isSuccess: action.payload.success
      }
    default:
      return state
  }
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmitAction
}: {
  initialValues: T
  validate: (values: T) => { success: boolean; error?: T; safeValues?: T }
  onSubmitAction: (
    values: T
  ) => Promise<{ ok: boolean; error?: { code: string; message: string } }>
}) => {
  const [mounted, setMounted] = useState(false)
  const [state, dispatch] = useReducer(reducer<T>, {
    values: initialValues,
    errors: initializeFields(initialValues),
    isSubmitted: false,
    isSuccess: null
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_VALUES', payload: { [name]: value } as Partial<T> })
  }

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    const validatedFields = validate(state.values)

    if (!validatedFields.success) {
      dispatch({ type: 'SET_ERRORS', payload: validatedFields.error ?? {} })
      dispatch({
        type: 'SET_SUBMITTED',
        payload: { submitted: true, success: false }
      })
      return
    }

    if (validatedFields.success && validatedFields.safeValues) {
      const response = await onSubmitAction(validatedFields.safeValues)

      if (!response.ok) {
        dispatch({
          type: 'SET_ERRORS',
          payload: { responseError: response.error?.message } as unknown as T
        })
        dispatch({
          type: 'SET_SUBMITTED',
          payload: { submitted: true, success: false }
        })
      } else if (response.ok) {
        dispatch({
          type: 'SET_SUBMITTED',
          payload: { submitted: true, success: true }
        })
      }
    }
  }

  if (!mounted) {
    return {
      state: {
        values: initialValues,
        errors: initializeFields(initialValues),
        isSubmitted: false,
        isSuccess: null
      },
      dispatch: () => {},
      onSubmit: async () => {}, // ✅ Always return `Promise<void>`
      onChange: () => {}
    }
  }

  return { state, dispatch, onSubmit, onChange }
}
