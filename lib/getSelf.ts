const getSelf = (token: string) => {
	return fetch("https://dev.createforever.media/api:lSOVAmsS/auth/me", {
		headers: { "Authorization": `Bearer ${token}` }
	}).then( res => res.json() )
}

export default getSelf
