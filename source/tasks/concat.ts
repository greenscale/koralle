
/**
 * @author fenris
 */
class_tasktemplate.register(
	"concat",
	new class_tasktemplate_aggregator(
		{
			"description": "concatenates a list of files",
			"factory": (data) => {
				let inputs : Array<lib_path.class_filepointer> = class_tasktemplate_aggregator.inputs_all(data);
				let output : lib_path.class_filepointer = data["output"];
				return {
					"inputs": inputs,
					"outputs": [output],
					"actions": [
						new class_action_mkdir(
							output.location
						),
						new class_action_concat(
							inputs,
							output
						),
					],
				};
			}
		}
	)
);

