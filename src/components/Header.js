import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SearchInput from './SearchInput'
import IconButton from './IconButton'
import NavButton from './NavButton'
import { db } from '../firebase'
import {
	query,
	getDocs,
	collection,
	where,
} from 'firebase/firestore'

export default function Header({username}) {
  const [query, setQuery] = useState('')
  const [id, setID] = useState('')

  function handleSearch() {}

  function handleLogout() {}
  
  useEffect(() => {
    const asyncFetchDailyData = async() => {
      const querySnapshot =  await getDocs(query(collection(db, "user"), where("username", "==", username)))
      querySnapshot.forEach((doc) => {
        setID(doc.data().userID)
        });
      }
      asyncFetchDailyData();
  }, [])

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
        <NavButton dest={`/profile/${username}`} text='Profile' />
        <NavButton dest='/following' text='Following' userId={id}/>
      </div>
    </div>
  )
}
