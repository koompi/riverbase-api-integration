const { model, Schema, connect } = require("mongoose");
const { createBarayMerchant } = require("../baray/api");

const MerchantSchema = new Schema({
	// Riverbase store
	storeId: String,
	// Baray User
	userEmail: String,
	userPassword: String,
	// Baray Org
	merchantOrgId: String,
	apiPublicKey: String,
	apiSecretKey: String,
	apiSecretIv: String,
	webhookSecretKey: String,
	webhookSecretIv: String,
});

const MERCHANT = model("merchants", MerchantSchema);

async function getMerchantByStoreId({ storeId }) {
	return await MERCHANT.findOne({ storeId });
}

async function createMerchant({
	storeId,
	storeName,
	storeDomain,
	userEmail,
	userPassword,
	callbackUrl,
}) {
	const baray = await createBarayMerchant({
		email: userEmail,
		password: userPassword,
		storeName: storeName,
		storeDomain: storeDomain,
		callbackUrl: callbackUrl,
	});

	const merchant = new MERCHANT({
		storeId,
		userEmail,
		userPassword,
		merchantOrgId: baray.org.id,
		apiPublicKey: baray.key.keys[0].id,
		apiSecretKey: `sk_prod_${baray.key.keys[0].secretKey.sk}`,
		apiSecretIv: baray.key.keys[0].secretKey.iv,
		webhookSecretKey: `wh_sk_${baray.webhook.webhooks[0].key.sk}`,
		webhookSecretIv: `wh_iv_${baray.webhook.webhooks[0].key.iv}`,
	});

	let saved = await merchant.save();
	return saved;
}

module.exports = {
	MERCHANT,
	createMerchant,
	getMerchantByStoreId,
};
