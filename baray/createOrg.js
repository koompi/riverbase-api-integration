const axios = require("axios");

async function createOrg({ name, token }) {
	let data = JSON.stringify({
		query: `mutation createOrg($name: String!) {
    orgCreate(name: $name) {
      id
      name
    }
  }`,
		variables: { name: name },
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://uat-api.baray.io/graphql",
		headers: {
			accept: "application/graphql-response+json, application/json",
			authorization: token,
			"content-type": "application/json",
		},
		data: data,
	};

	const response = await axios.request(config);
	console.log(response.data.data.orgCreate);
	return response.data.data.orgCreate;
}

module.exports = {
	createOrg,
};
