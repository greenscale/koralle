
/**
 * @author fenris
 */
class_tasktemplate.register(
	"locmerge",
	new class_tasktemplate(
		{
			"description": "executes a locmerge command",
			"parameters": [
				class_taskparameter.input_list(),
				class_taskparameter.input_schwamm(),
				new class_taskparameter<string, lib_path.class_location>(
					{
						"name": "output_folder",
						"extraction": raw => lib_path.location_read(raw),
						"shape": lib_meta.from_raw({"id": "string"}),
						"description": "the folder to which the output files are written",
					}
				),
			],
			"factory": (data) => {
				let inputs : Array<lib_path.class_filepointer> = [].concat(data["inputs"]).concat(data["input_from_schwamm"]);
				return {
					"inputs": inputs,
					"outputs": [],
					"actions": [
						new class_action_mkdir(
							data["output_folder"]
						),
						new class_action_locmerge(
							inputs,
							data["output_folder"]
						),
					],
				};
			},
		}
	)
);


