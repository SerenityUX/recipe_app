const getAllUsers = () => {
	return fetch("https://dev.createforever.media/api:lSOVAmsS/users")
		.then( res => res.json() )
}

export default getAllUsers
