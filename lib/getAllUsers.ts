const getAllUsers = () => {
	return fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/users")
		.then( res => res.json() )
}

export default getAllUsers
