
/**
 * @author fenris
 */
class_tasktemplate.register(
	"locmerge",
	new class_tasktemplate_aggregator(
		{
			"description": "executes a locmerge command",
			"parameters_additional": [
			],
			"factory": (data) => {
				let inputs : Array<lib_path.class_filepointer> = class_tasktemplate_aggregator.inputs_all(data);
				return {
					"inputs": inputs,
					"outputs": [],
					"actions": [
						new class_action_mkdir(
							data["output"].location
						),
						new class_action_locmerge(
							inputs,
							data["output"]
						),
					],
				};
			},
		}
	)
);


