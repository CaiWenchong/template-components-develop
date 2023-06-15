let {
	model = "",
		model_data,
		field_string
} = payload;

model_data = model_data || payload?.[model + "_data"] || {};

return responseMutation({
	operation: `insert_${model}`,
	field_string,
	objects: [{
		...model_data || {}
	}]
});