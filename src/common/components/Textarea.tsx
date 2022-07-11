import type { HTMLProps } from 'react'

interface ITextareaProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = ({label, ...props}: ITextareaProps) => {
  return (
    <label style={{display: 'grid'}}>
      {label}
      <textarea {...props} />
    </label>
  )
}
