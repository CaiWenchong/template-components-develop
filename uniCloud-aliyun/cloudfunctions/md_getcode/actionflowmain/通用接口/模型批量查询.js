let {
	args_location,
	args = {},
	model = "account",
	where = {},
	limit = 20,
	offset = 0,
	order_by,
	distinct_on,
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
	where,
	limit,
	offset,
	order_by,
	distinct_on,
	field_string,
	aggregate_field_string,
});