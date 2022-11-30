import { useNavigate } from 'react-router-dom'

import CourseCard from './CourseCard'

export default function ProfileCard({
	name,
	gradYear,
	majors,
	reviewLabel,
	review,
	username,
}) {
	const navigate = useNavigate()
	const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

	return (
		<div
			className="profile-card"
			onClick={() => navigate(`/profile/${username}`)}
		>
			<div className="profile-card__flex">
				<h2 className="profile-card__name">{name}</h2>
				<h2 className="profile-card__year">{years[2026 - gradYear]}</h2>
			</div>
			<p className="profile-card__majors">{`${majors.join(', ')}`}</p>
			{review && (
				<>
					<p className="profile-card__review-label">{reviewLabel}</p>
					<CourseCard editable={false} reviewInfo={review} />
				</>
			)}
		</div>
	)
}
