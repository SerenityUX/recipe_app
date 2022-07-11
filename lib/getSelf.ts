const getSelf = (token: string) => {
	return fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/auth/me", {
		headers: { "Authorization": `Bearer ${token}` }
	}).then( res => res.json() )
}

export default getSelf
