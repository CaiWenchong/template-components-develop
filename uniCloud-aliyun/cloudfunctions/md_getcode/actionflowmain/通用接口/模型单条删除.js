let {
	model = "",
		id = 0,
		field_string
} = payload;

return responseMutation({
	operation: `delete_${model}`,
	field_string,
	where: {
		id: {
			_eq: id
		}
	},
});