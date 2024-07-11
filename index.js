const { PrivateClient } = require("baray-js");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { createMerchant, getMerchantByStoreId } = require("./models/merchant");

dotenv.config();
mongoose.connect(process.env.DB);
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/merchants/create", async (req, res) => {
	try {
		// BODY Sample
		// {
		// 	storeName: "Reganal",
		// 	storeDomain: "https://reganal.com",
		// 	callbackUrl: "https://api.reganal.com/callback",
		// 	storeId: "001",
		// 	userEmail: "reganal@gmail.com",
		// 	userPassword: "123",
		// }
		const created = await createMerchant(req.body);
		res.json(created);
	} catch (error) {
		res.status(400).json({
			code: 400,
			message: error.message,
		});
	}
});

app.get("/merchants/:storeId", async (req, res) => {
	const storeId = req.params.storeId;
	const merchant = await getMerchantByStoreId({ storeId });
	res.json(merchant);
});

app.get("/merchants/:storeId/apiKey", async (req, res) => {
	const storeId = req.params.storeId;
	const merchant = await getMerchantByStoreId({ storeId });
	res.json({
		apiPublicKey: merchant.apiPublicKey,
	});
});

app.post("/merchants/:storeId/create-intent", async (req, res) => {
	const storeId = req.params.storeId;
	const merchant = await getMerchantByStoreId({ storeId });

	console.log(merchant);

	const baray = new PrivateClient(
		merchant.apiPublicKey,
		merchant.apiSecretKey,
		merchant.apiSecretIv,
		merchant.webhookSecretKey,
		merchant.webhookSecretIv
	);
	const orderId = req.body.orderId;
	const amount = req.body.amount;
	const currency = req.body.currency;

	const intent = await baray.createIntent({
		amount: amount,
		currency: currency,
		order_id: orderId,
	});

	res.json(intent);
});

app.post("/merchants/:storeId/callback", async (req, res) => {
	const storeId = req.params.storeId;
	const merchant = await getMerchantByStoreId({ storeId });
	const baray = new PrivateClient(
		merchant.apiPublicKey,
		merchant.apiSecretKey,
		merchant.apiSecretIv,
		merchant.webhookSecretKey,
		merchant.webhookSecretIv
	);
	const decrypted = baray.decryptIntent(body.encrypted_order_id);

	res.json({
		orderId: decrypted,
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port ${process.env.PORT}`);
});
