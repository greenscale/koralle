
/**
 * @author fenris
 */
class_tasktemplate.register(
	"concat",
	new class_tasktemplate_aggregator(
		{
			"description": "concatenates a list of files",
			"factory": (data) => {
				return {
					"inputs": data["inputs"],
					"outputs": [data["output"]],
					"actions": [
						new class_action_mkdir(
							data["output"].location
						),
						new class_action_concat(
							data["inputs"],
							data["output"]
						),
					],
				};
			}
		}
	)
);

