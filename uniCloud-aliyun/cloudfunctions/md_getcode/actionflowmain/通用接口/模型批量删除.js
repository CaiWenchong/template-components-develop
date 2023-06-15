let {
	model = "",
		where,
		field_string
} = payload;

return responseMutation({
	operation: `delete_${model}`,
	field_string,
	where,
});