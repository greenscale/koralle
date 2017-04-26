
/**
 * @author fenris
 */
class_tasktemplate.register(
	"php",
	new class_tasktemplate_aggregator(
		{
			"description": "compiles a list of php input files to a single output file",
			"parameters_additional": [
				new class_taskparameter<boolean, boolean>(
					{
						"name": "only_last",
						"shape": lib_meta.from_raw({"id": "boolean"}),
						"default": new class_just<boolean>(false),
						"description": "only compile the last file in the list and use the others as dependencies",
					}
				),
				new class_taskparameter<boolean, boolean>(
					{
						"name": "only_first",
						"shape": lib_meta.from_raw({"id": "boolean"}),
						"default": new class_just<boolean>(false),
						"description": "only compile the first file in the list and use the others as dependencies",
					}
				),
			],
			"factory": (data) => {
				let inputs : Array<lib_path.class_filepointer> = class_tasktemplate_aggregator.inputs_all(data);
				return {
					"inputs": inputs,
					"outputs": data["outputs"],
					"actions": [
						new class_action_mkdir(
							data["output"].location
						),
						new class_action_php(
							inputs,
							data["output"],
							data["only_first"],
							data["only_last"]
						),
					],
				};
			},
		}
	)
);


