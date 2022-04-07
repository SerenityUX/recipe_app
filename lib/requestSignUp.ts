interface SignUpBody {
	email: string,
	password: string,
	phone_number: string,
	name: string,
	profile_picture: string,
}

// Type response
const requestSignUp = async (body: SignUpBody) => {
	const response = await fetch("https://dev.createforever.media/api:lSOVAmsS/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	}).then( (res) => res.json() )

	if ( response?.code ) return [undefined, response?.message]
	return [response.authToken, undefined]
};

export default requestSignUp;
