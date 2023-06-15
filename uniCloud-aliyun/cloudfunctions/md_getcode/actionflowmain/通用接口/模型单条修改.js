let {
	model = "",
		id = 0,
		model_data,
		field_string
} = payload;

model_data = model_data || payload?.[model + "_data"] || {};
return responseMutation({
	operation: `update_${model}`,
	field_string,
	where: {
		id: {
			_eq: id
		}
	},
	_set: {
		...model_data || {}
	}
});