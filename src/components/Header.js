import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../components/AuthContext'
import SearchInput from './SearchInput'
import IconButton from './IconButton'
import NavButton from './NavButton'

// username/id params are to pass through to profile/following pages
export default function Header({ username, id, searchVal, active }) {
	const [query, setQuery] = useState(searchVal)
	const { currentUser, logout } = useAuth()
	const navigate = useNavigate()

	async function handleSearch(e) {
		navigate(`/search/${encodeURIComponent(query)}`)
	}

	function handleAuthChange() {
		logout().finally(() => {
			navigate('/')
		})
	}

	return (
		<header className="header">
			<div className="header__topbar">
				<Link to="/profile">
					<img
						className="header__icon"
						src="/icons/breadcrumbs-icon-jet.svg"
						alt="Breadcrumbs Icon - Jet"
					/>
				</Link>
				<SearchInput
					value={query}
					handleChange={(e) => setQuery(e.target.value)}
					handleClick={handleSearch}
				/>
				<IconButton
					type="medium"
					iconURL={currentUser ? '/icons/logout.svg' : '/icons/login.svg'}
					alt={currentUser ? 'Logout' : 'Login'}
					handleClick={handleAuthChange}
				/>
			</div>
			<div className="header__navbar">
				<NavButton
					dest={username ? `/${username}/profile` : '/profile'}
					text="Profile"
					userID={id}
					active={active === 'profile'}
				/>
				<NavButton
					dest={username ? `/${username}/following` : '/following'}
					text="Following"
					userID={id}
					active={active === 'following'}
				/>
			</div>
		</header>
	)
}

Header.defaultProps = {
	searchVal: '',
}
