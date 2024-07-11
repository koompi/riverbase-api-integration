const { signUp } = require("./signUp");
const { createOrg } = require("./createOrg");
const { createKey } = require("./createKey");
const { createWebhook } = require("./createWebhook");

async function createBarayMerchant({
	email,
	password,
	storeName,
	storeDomain,
	callbackUrl,
}) {
	const token = await signUp({ email, password });

	const org = await createOrg({
		token,
		name: storeName,
	});

	const key = await createKey({
		token,
		keyName: "riverbase",
		orgId: org.id,
		origin: storeDomain,
		target: "prod",
	});

	const webhook = await createWebhook({
		token,
		orgId: org.id,
		serviceUrl: callbackUrl,
		serviceType: "prod",
		serviceTarget: "Endpoint",
	});

	return {
		org,
		key,
		webhook,
	};
}

module.exports = {
	createBarayMerchant,
};
