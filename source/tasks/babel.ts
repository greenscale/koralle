
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
						"description": "[deprecated] single plugin; use 'presets' parameter instead (you can still use this parameter; its value is added to the plugin list)",
					}
				),
				new class_taskparameter<Array<string>, Array<string>>(
					{
						"name": "presets",
						"shape": lib_meta.from_raw({"id": "array", "parameters": {"shape_element": {"id": "string"}}}),
						"default": new class_just<Array<string>>([]),
						"description": "a list of presets to use",
					}
				),
				new class_taskparameter<Array<string>, Array<string>>(
					{
						"name": "plugins",
						"shape": lib_meta.from_raw({"id": "array", "parameters": {"shape_element": {"id": "string"}}}),
						"default": new class_just<Array<string>>([]),
						"description": "a list of plugins to use",
					}
				),
				new class_taskparameter<boolean, boolean>(
					{
						"name": "minify",
						"shape": lib_meta.from_raw({"id": "boolean"}),
						"default": new class_just<boolean>(false),
						"description": "whether to pass the 'minify' argument to the babel command",
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
							data["presets"].concat((data["preset"] == null) ? [] : [data["preset"]]),
							data["plugins"],
							data["minify"]
						),
					],
				};
			}
		}
	)
);

