
/**
 * @author fenris
 */
class_task.register(
	"empty",
	new class_tasktemplate(
		{
			"description": "creates an empty output file",
			"parameters": [
				new class_taskparameter<string, lib_path.class_filepointer>(
					{
						"name": "output",
						"extraction": raw => lib_path.filepointer_read(raw)
						"shape": lib_meta.from_raw(
							{
								"id": "string"
							}
						),
						"mandatory": true,
						"description": "the path to the output file"
					}
				)
			],
			"factory": (rawtask : type_rawtask, data : {[name : string] : any}) => {
				return (
					new class_task(
						{
							"name": rawtask.name,
							"active": rawtask.active,
							"outputs": [data["output"]],
							"actions": [
								new class_action_mkdir(
									data["output"].location
								),
								new class_action_touch(
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

