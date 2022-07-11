import { Link } from '@remix-run/react'
import { GearIcon } from '~/common/components/Icons'

export const Header = () => {
  return (
    <header className='header'>
      <Link to='/' className='header__logo'>ToDo</Link>
      <Link to='/settings' className='header__settings'>
        <GearIcon />
      </Link>
    </header>
  )
}
