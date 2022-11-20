import {useState} from 'react'
import {Link} from 'react-router-dom'

import SearchInput from './SearchInput'
import IconButton from './IconButton'
import NavButton from './NavButton'

export default function Header() {
  const [query, setQuery] = useState('')

  function handleSearch() {}

  function handleLogout() {}

  return (
    <div className='header'>
      <div className='header__topbar'>
        <Link to='/'>
          <img
            className='header__icon'
            src='/icons/breadcrumbs-icon-jet.svg'
            alt='Breadcrumbs Icon - Jet'
          />
        </Link>
        <SearchInput
          value={query}
          handleChange={e => setQuery(e.target.value)}
          handleClick={handleSearch}
        />
        <IconButton
          type='logout'
          iconURL='/icons/logout.svg'
          alt='Logout'
          handleClick={handleLogout}
        />
      </div>
      <div className='header__navbar'>
        <NavButton dest='/' text='Profile' />
        <NavButton dest='/following' text='Following' />
      </div>
    </div>
  )
}
