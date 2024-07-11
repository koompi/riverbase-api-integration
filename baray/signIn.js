const axios = require("axios");

async function signIn({ email, password }) {
	let data = JSON.stringify({
		query: `mutation signIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password)
}`,
		variables: { email: email, password: password },
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://uat-api.baray.io/graphql",
		headers: {
			"content-type": "application/json",
		},
		data: data,
	};

	const response = await axios.request(config);
	return response.data.data.signIn;
}

module.exports = {
	signIn,
};
