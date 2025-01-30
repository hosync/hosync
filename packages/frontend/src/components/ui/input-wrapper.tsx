import { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface InputWrapperProps {
  form: UseFormReturn<any>
  label: string
  name: string
  placeholder?: string
  type?: string
  disabled?: boolean
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  form,
  label = '',
  name = '',
  placeholder = '',
  type = 'text',
  disabled = false
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-black">{label}</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
        </FormControl>

        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
)

export { InputWrapper }
