const axios = require("axios");

async function createKey({
	token,
	origin, // "http://localhost:3000",
	target, // "prod",
	keyName, // "riverbase",
	orgId, // "org-01909bab-da8a-7e0e-b785-971675e8aa14",
}) {
	let data = JSON.stringify({
		query: `mutation orgKeyAdd($orgId: String!, $keyName: String!, $target: String!, $origin: String!) {
    orgKeyAdd(orgId: $orgId, keyName: $keyName, target: $target, origin: $origin) {
      id
      name
      ...OrganizationFragment
    }
  }
  
  fragment OrganizationFragment on Organization {
    id
    keys {
      ...KeyFragment
    }
  }
  
  fragment KeyFragment on Key {
    id
    name
    target
    secretKey {
      sk
      iv
    }
    apis
    origin
  }`,
		variables: {
			origin: origin,
			target: target,
			keyName: keyName,
			orgId: orgId,
		},
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://uat-api.baray.io/graphql",
		headers: {
			accept: "application/graphql-response+json, application/json",
			"accept-language": "en-US,en",
			authorization: token,
			"content-type": "application/json",
		},
		data: data,
	};

	const response = await axios.request(config);
	return response.data.data.orgKeyAdd;
}

module.exports = {
	createKey,
};
