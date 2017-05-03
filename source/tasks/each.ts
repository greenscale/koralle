
/**
 * @author fenris
 */
type type_output_description = {
	kind : string;
	parameters : Object;
};


/**
 * @author fenris
 */
function task_each_generate_output(input_raw : string, output_description : type_output_description, index : int) : string {
	switch (output_description.kind) {
		case "replace": {
			let regexp : RegExp = new RegExp(output_description.parameters["from"]);
			// let filter : boolean = ((output_description.parameters["filter"] == undefined) || (output_description.parameters["from"] == true));
			let execute : boolean = /*((! filter) || regexp.test(input_raw))*/true;
			if (execute) {
				let output_raw : string = input_raw.replace(
					regexp,
					output_description.parameters["to"]
				);
				if (input_raw == output_raw) {
					(
						new class_message(
							`replacement for input '${input_raw}' resulted in the same string`,
							{
								"type": "warning",
								"prefix": "koralle"
							}
						)
					).stderr();
				}
				return output_raw;
			}
			else {
				return null;
			}
			break;
		}
		case "enumerate": {
			let folder : string = (output_description["parameters"]["folder"] || "build/");
			let prefix : string = (output_description["parameters"]["prefix"] || "output_");
			let suffix : string = (output_description["parameters"]["suffix"]);
			let output_raw : string = (folder + "/" + prefix + index.toString() + ((suffix == null) ? "" : ("." + suffix)));
			return output_raw;
			break;
		}
		default: {
			throw (new Error(`unhandled kind '${output_description.kind}'`));
			break;
		}
	}
}


/**
 * @author fenris
 */
class_tasktemplate.register(
	"each",
	new class_tasktemplate(
		{
			"description": "executes a specific task for a list of inputs",
			"parameters": [
				class_taskparameter.input_list({"default": new class_just<Array<any>>([])}),
				class_taskparameter.input_schwamm({"default": new class_just<any>(null)}),
				new class_taskparameter<string, string>(
					{
						"name": "element_type",
						"shape": lib_meta.from_raw({"id": "string"}),
						"default": new class_nothing<string>(),
						"description": "the type of the inner task"
					}
				),
				new class_taskparameter<Object, Object>(
					{
						"name": "element_parameters",
						"shape": lib_meta.from_raw({"id": "any"}),
						"default": new class_just<Object>({}),
						"description": "the parameters for the inner task"
					}
				),
				new class_taskparameter<type_output_description, type_output_description>(
					{
						"name": "output_description",
						"shape": lib_meta.from_raw({"id": "any"}),
						"default": new class_nothing<type_output_description>(),
						"description": "how the output paths are generated"
					}
				),
			],
			"factory": (data, rawtask) => {
				let inputs : Array<lib_path.class_filepointer> = data["inputs"].concat(data["input_from_schwamm"]);
				return {
					"sub": inputs.map(
						(input, index) => {
							let input_raw : string = input.as_string();
							let output_raw : string = task_each_generate_output(input_raw, data["output_description"], index);
							if (output_raw == null) {
								return null;
							}
							else {
								return (
									class_tasktemplate.create(
										{
											"name": index.toString(),
											"type": data["element_type"],
											"parameters": lib_object.patched(
												data["element_parameters"],
												{
													"input": input_raw,
													"output": output_raw,
												}
											)
										},
										rawtask["name"]
									)
								);
							}
						}
					).filter(x => (x != null)),
				};
			}
		}
	)
);

