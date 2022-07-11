import type { HTMLProps } from 'react'

interface IInputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input = ({label, ...props}: IInputProps) => {
  return (
    <label style={{display: 'grid'}}>
      {label}
      <input {...props} />
    </label>
  )
}
