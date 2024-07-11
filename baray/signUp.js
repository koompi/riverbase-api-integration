const axios = require("axios");

async function signUp({ email, password }) {
	let data = JSON.stringify({
		query: `mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password)
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
	return response.data.data.signUp;
}

module.exports = {
	signUp,
};
