
/**
 * @author fenris
 */
class_tasktemplate.register(
	"empty",
	new class_tasktemplate(
		{
			"description": "creates an empty output file",
			"parameters": [
				new class_taskparameter<string, lib_path.class_filepointer>(
					{
						"name": "output",
						"extraction": raw => lib_path.filepointer_read(raw),
						"shape": lib_meta.from_raw({"id": "string"}),
						"default": new class_nothing<string>(),
						"description": "the path to the output file"
					}
				)
			],
			"factory": (data) => {
				return {
					"outputs": [data["output"]],
					"actions": [
						new class_action_mkdir(
							data["output"].location
						),
						new class_action_touch(
							data["output"]
						),
					],
				};
			}
		}
	)
);

