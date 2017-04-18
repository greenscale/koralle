
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
function task_each_generate_output(output_description : type_output_description, input_raw : string) : string {
	switch (output_description.kind) {
		case "replace": {
			let output_raw : string = input_raw.replace(
				new RegExp(output_description.parameters["from"]),
				output_description.parameters["to"]
			);
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
				return {
					"sub": rawtask.parameters["inputs"].map(
						(input_raw, index) => class_tasktemplate.create(
							{
								"name": ((rawtask["name"] == null) ? null : (rawtask["name"] + "_" + index.toString())),
								"type": data["element_type"],
								"parameters": lib_object.patched(
									data["element_parameters"],
									{
										"input": input_raw,
										"output": task_each_generate_output(data["output_description"], input_raw),
									}
								)
							}
						)
					),
				};
			}
		}
	)
);

