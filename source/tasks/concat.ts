
/**
 * @author fenris
 */
class_task.register(
	"concat",
	new class_tasktemplate_aggregator(
		{
			"description": "concatenes a list of files",
			"factory": (rawtask : type_rawtask, data : {[name : string] : any}) => {
				return (
					new class_task(
						{
							"name": rawtask.name,
							"active": rawtask.active,
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
						}
					)
				);
			}
		}
	)
);

