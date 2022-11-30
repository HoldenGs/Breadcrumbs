import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../components/AuthContext'
import SearchInput from './SearchInput'
import IconButton from './IconButton'
import NavButton from './NavButton'

// username/id params are to pass through to profile/following pages
export default function Header({ username, id, searchVal, active }) {
	const [query, setQuery] = useState(searchVal)
	const { logout } = useAuth()
	const navigate = useNavigate()

	async function handleSearch(e) {
		navigate(`/search/${encodeURIComponent(query)}`)
	}

	function handleLogout() {
		logout().finally(() => {
			navigate('/')
		})
	}

	return (
		<div className="header">
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
					type="logout"
					iconURL="/icons/logout.svg"
					alt="Logout"
					handleClick={handleLogout}
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
		</div>
	)
}

Header.defaultProps = {
	searchVal: '',
}
