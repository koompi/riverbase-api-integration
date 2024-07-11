const axios = require("axios");

async function createWebhook({
	token,
	serviceUrl, //"http://localhost:3000",
	serviceType, //"Endpoint",
	serviceTarget, //"prod",
	orgId, //"org-01909bab-da8a-7e0e-b785-971675e8aa14",
}) {
	let data = JSON.stringify({
		query: `mutation orgWebhookCreate($orgId: String!, $serviceType: String!, $serviceUrl: String!, $serviceTarget: String!) {
  orgWebhookCreate(
    orgId: $orgId
    serviceType: $serviceType
    serviceUrl: $serviceUrl
    serviceTarget: $serviceTarget
  ) {
    id
    name
    ...OrganizationFragment
  }
}

fragment OrganizationFragment on Organization {
  id
  name
  logo
  webhooks {
    ...WebhookFragment
  }
}

fragment WebhookFragment on Webhook {
  id
  serviceType
  serviceUrl
  serviceTarget
  key {
    sk
    iv
  }
}`,
		variables: {
			serviceUrl: serviceUrl,
			serviceType: serviceType,
			serviceTarget: serviceTarget,
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
	return response.data.data.orgWebhookCreate;
}

module.exports = {
	createWebhook,
};
