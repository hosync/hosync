import { cx } from '@hosync/utils'

const FormItem = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: any
}) => <div className={cx.join('space-y-2', className)} {...props} />

const FormLabel = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: any
}) => <label className={cx.join(className)} {...props} />

const FormMessage = ({
  className,
  children,
  ...props
}: {
  className?: string
  children?: React.ReactNode
  [key: string]: any
}) => {
  return (
    <p
      className={cx.join(
        'text-[0.8rem] font-medium text-destructive',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export { FormItem, FormLabel, FormMessage }
