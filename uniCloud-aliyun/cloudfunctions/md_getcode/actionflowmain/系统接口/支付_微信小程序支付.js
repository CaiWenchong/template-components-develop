let {
	order_id = 0,
		description,
		pay_amount_cny = 1,
		dateType = "json"
} = payload;



if (!pay_amount_cny) {
	return setReturn(payload, "失败", "支付金额为单位为分的整数");
}

let {
	actionflow_config
} = system;

if (!description) {
	description = system?.name || "脉动测试"
}

let [user] = query({
	model: "user",
	where: {
		id: {
			_eq: user_user
		}
	},
	field_string: `id account_account`,
	limit: 1
})
if (!user?.account_account) {
	return setReturn({
		payload,
		user_user,
		user
	}, "失败", "用户信息不存在")
}

// 调用支付创建订单
let {
	status: status_tmp,
	errorMessage: errorMessage_tmp,
	paymentTransactionId
} = callActionflow({
	amount: pay_amount_cny / 100,
	orderId: order_id,
	accountId: user?.account_account,
	description
}, actionflow_config.createpay_actionflow_id);


if (!paymentTransactionId || status_tmp != "succeeded") {
	return setReturn({
		payload,
		status_tmp,
		errorMessage_tmp,
		paymentTransactionId
	}, "失败", errorMessage_tmp);
}

// 生成支付信息
let {
	status,
	errorMessage,
	signedPaymentInfoStatus,
	signedPaymentInfoMessage
} = callActionflow({
	paymentTransactionId
}, actionflow_config.getpayinfo_actionflow_id);
if (!signedPaymentInfoMessage || status != "succeeded" || signedPaymentInfoStatus != "SUCCESS") {
	return setReturn({
		payload,
		paymentTransactionId,
		status,
		errorMessage,
		signedPaymentInfoStatus,
		signedPaymentInfoMessage
	}, "失败", errorMessage);
}

// 是否需要将支付信息转为对象
if (dateType == "json") {
	return JSON.parse(signedPaymentInfoMessage);
}
return signedPaymentInfoMessage;