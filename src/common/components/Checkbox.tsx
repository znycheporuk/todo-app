import type { HTMLProps } from 'react'

interface ICheckboxProps extends HTMLProps<HTMLInputElement> {
  label: string
}

export const Checkbox = ({label, ...props}: ICheckboxProps) => {
  return (
    <label className='check'>
      <input {...props} type='checkbox' className='check__input' />
      <svg className='check__box' viewBox='0 0 24 24'>
        <path className='check__mark' d='M8 13L10.9167 16L16 8' />
      </svg>
      {label}
    </label>
  )
}
