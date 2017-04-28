
/**
 * @author fenris
 */
class_tasktemplate.register(
	"copy",
	new class_tasktemplate_transductor(
		{
			"description": "copies a file",
			"parameters_additional": [
				new class_taskparameter<boolean, boolean>(
					{
						"name": "folder",
						"default": new class_just<boolean>(false),
					}
				),
			],
			"factory": (data) => {
				return {
					"inputs": [data["input"]],
					"outputs": /*[data["output"]]*/[],
					"actions": [
						new class_action_mkdir(
							data["output"].location
						),
						new class_action_copy(
							data["input"],
							data["output"],
							data["folder"]
						),
					],
				};
			}
		}
	)
);

