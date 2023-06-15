export default {
	system: {
		model: "system",
		field_string: `id system_id name logo{id url} province city area location address_title address_info address_detail mobile attach_data actionflow_config`,
		mutation_config: {
			on_conflict: {},
		},
		query_config: {
			where: {},
			order_by: {},
			distinct_on: "",
			offset: 0,
			limit: 1,
		}
	}
}