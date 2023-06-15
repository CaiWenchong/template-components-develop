let {
	model = "",
		lists = [],
		field_string
} = payload;


let model_objects = [];
lists.forEach((item, index) => {
	model_objects.push(item?.model_data || item?.[model + "_data"]);
})

return responseMutation({
	operation: `insert_${model}`,
	objects: model_objects,
	field_string
});