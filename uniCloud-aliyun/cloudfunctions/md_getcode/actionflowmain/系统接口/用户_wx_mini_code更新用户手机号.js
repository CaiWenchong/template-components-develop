let {
	wx_mini_code,
	field_string = "id mobile"

} = payload;

let {
	id: user_user
} = tokenToData();
if (!wx_mini_code) {
	return setReturn({
		payload
	}, "失败", "请传入获取微信小程序手机号的code");
}

let {
	access_token
} = getAuthtoken({
	type: "wx_mini",
	params: {}
});

let apiRes = callThirdapi({
	thirdapi_name: "微信小程序_获取手机号",
	params: {
		access_token
	},
	fz_body: {
		code: wx_mini_code
	},
	field_string: `field_200_json{errmsg errcode
	  phone_info {
		phoneNumber
		purePhoneNumber
		countryCode
		watermark {
		  timestamp
		  appid
		}
	  }
  }`
})?.field_200_json;

let {
	purePhoneNumber: mobile
} = apiRes?.phone_info || {}

if (!mobile) {
	return setReturn({
		apiRes,
		payload
	}, "失败", "获取手机号失败")
}

return responseMutation({
	operation: "update_user",
	where: {
		id: {
			_eq: user_user
		},
	},
	_set: {
		mobile
	},
	field_string
});