
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
class class_task_each extends class_task {
	
	/**
	 * @author fenris
	 */
	public static generate_output(output_description : type_output_description, input_raw : string) : string {
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
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"element_type": element_type = null,
				"element_parameters": element_parameters = {},
				"inputs": inputs_raw = [],
				"output_description": output_description = null,
			},
		}
		: {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters ?: {
				element_type ?: string;
				element_parameters ?: Object;
				inputs ?: Array<string>;
				output_description ?: type_output_description;
			};
		}
	) {
		if (element_type == null) {
			throw (new Error(class_task.errormessage_mandatoryparamater("earch", name, "element_type")));
		}
		if (output_description == null) {
			throw (new Error(class_task.errormessage_mandatoryparamater("earch", name, "output_description")));
		}
		super(
			name,
			sub.concat(
				inputs_raw.map(
					(input_raw, index) => class_task.create(
						{
							"name": ((name == null) ? null : (name + "_" + index.toString())),
							"type": element_type,
							"parameters": lib_object.patched(
								element_parameters,
								{
									"input": input_raw,
									"output": class_task_each.generate_output(output_description, input_raw),
								}
							)
						}
					)
				)
			),
			active,
			[],
			[],
			[]
		);
	}
	
}

class_task.register(
	"each",
	(name, sub, active, parameters) => new class_task_each(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);




/**
 * @author fenris
 */
class_task.register(
	"each",
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

