import { Link } from '@remix-run/react'
import { PlusIcon } from '~/common/components/Icons'

export const AddButton = () => {
  return (
    <Link to='/todos/null/edit' className='add-button'>
      <PlusIcon width='1.2rem' height='1.2rem' />
    </Link>
  )
}
