
/**
 * @author fenris
 */
class_task.register(
	"copy",
	new class_tasktemplate_transductor(
		{
			"description": "copies a file",
			"parameters_additional": [
				new class_taskparameter<boolean, boolean>(
					{
						"name": "folder",
						"mandatory": false,
						"default": false,
					}
				)
			],
			"factory": (rawtask : type_rawtask, data : {[name : string] : any}) => {
				return (
					new class_task(
						{
							"name": rawtask.name,
							"active": rawtask.active,
							"inputs": [data["input"]],
							"outputs": [data["output"]],
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
						}
					)
				);
			}
		}
	)
);

