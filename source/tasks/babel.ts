
/**
 * @author fenris,neu3no
 */
class_tasktemplate.register(
	"babel",
	new class_tasktemplate_aggregator(
		{
			"description": "executes the babel transpiler",
			"parameters_additional": [
				new class_taskparameter<string, string>(
					{
						"name": "preset",
						"shape": lib_meta.from_raw({"id": "string"}),
						"default": new class_just<string>(null),
					}
				),
				new class_taskparameter<boolean, boolean>(
					{
						"name": "minify",
						"shape": lib_meta.from_raw({"id": "boolean"}),
						"default": new class_just<boolean>(false),
					}
				),
			],
			"factory": (data) => {
				return {
					"inputs": data["inputs"],
					"outputs": [data["output"]],
					"actions": [
						new class_action_mkdir(
							data["output"].location
						),
						new class_action_babel(
							data["inputs"],
							data["output"],
							data["preset"],
							data["minify"]
						),
					],
				};
			}
		}
	)
);

