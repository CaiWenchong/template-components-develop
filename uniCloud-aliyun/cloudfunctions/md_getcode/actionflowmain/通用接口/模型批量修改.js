let {
	model = "",
		lists = [],
		field_string
} = payload;

let batch_mutations = [];
lists.forEach((item, index) => {
	let {
		id,
		model_data
	} = item;
	model_data = model_data || item?.[model + "_data"];
	batch_mutations.push({
		response_key: `update_${model}_${id}_${index}`,
		operation: `update_${model}`,
		where: {
			id: {
				_eq: id
			}
		},
		_set: {
			...model_data
		},
		field_string
	})
})

return responseMutation(batch_mutations);