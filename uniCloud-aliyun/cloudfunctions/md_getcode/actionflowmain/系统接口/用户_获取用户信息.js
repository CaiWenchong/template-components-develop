let {
	id: user_user
} = tokenToData();
let {
	field_string
} = payload;

return query({
	model: "user",
	where: {
		id: {
			_eq: user_user
		}
	},
	field_string
});