import type { HTMLProps } from 'react'

interface ISelectProps extends HTMLProps<HTMLSelectElement> {
  label?: string
}

export const Select = ({label, children, ...props}: ISelectProps) => {
  return (
    <label style={{display: 'grid'}}>
      {label}
      <select {...props} >
        {children}
      </select>
    </label>
  )
}
