import { FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface InputWrapperProps {
  label: string
  name: string
  placeholder?: string
  type?: string
  disabled?: boolean
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  label = '',
  name = '',
  placeholder = '',
  type = 'text',
  disabled = false
}) => (
  <FormItem>
    <FormLabel className="text-black">{label}</FormLabel>

    <Input
      name={name}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />

    <FormMessage className="text-xs" />
  </FormItem>
)

export { InputWrapper }
