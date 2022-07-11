interface LoginBody {
	email: string,
	password: string,
}

// Type response
const requestLogin = async (body: LoginBody) => {
	const response = await fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	}).then( (res) => res.json() )

	if ( response?.code ) return [undefined, response?.message]
	return [response.authToken, undefined]
};

export default requestLogin;
