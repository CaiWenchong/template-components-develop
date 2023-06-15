let {
	args_location,
	args = {},
	model = "account",
	id = 0,
	field_string,
	aggregate_field_string = "count"
} = payload;

return responseQuery({
	model,
	args: {
		...args,
		...(args_location ? {
			location: args_location
		} : {})
	},
	where: {
		id: {
			_eq: id
		}
	},
	field_string,
	aggregate_field_string,
});