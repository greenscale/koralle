
/**
 * @author fenris
 */
class class_task_concat
	extends class_task_new {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": parameters,
		}
		: {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters ?: {[name : string] : any};
		}
	) {
		super(
			{
				"name": name,
				"sub": sub,
				"active": active,
				"parameters": [
					new class_taskparameter<Array<string>, Array<lib_path.class_filepointer>>(
						{
							"name": "inputs",
							"extraction": raw => {
								return (
									new class_just<Array<lib_path.class_filepointer>>(
										raw.map(
											path => lib_path.filepointer_read(path)
										)
									)
								);
							},
							"shape": lib_meta.shape_from_raw(
								{
									"id": "array",
									"parameters": {
										"shape_element": {
											"id": "string"
										}
									}
								}
							),
							"mandatory": true,
							"default": null,
							"description": "the list of paths to files which shall be concatenated",
						}
					),
					new class_taskparameter<string, lib_path.class_filepointer>(
						{
							"name": "output",
							"extraction": raw => {
								return (
									new class_just<lib_path.class_filepointer>(
										lib_path.filepointer_read(raw)
									)
								);
							},
							"shape": lib_meta.shape_from_raw(
								{
									"id": "string"
								}
							),
							"mandatory": true,
							"default": null,
							"description": "the path to the output file"
						}
					),
				],
				"inputs": (
					[]
					.concat(inputs)
					.concat(
						(schwamminput == null)
						? []
						: [schwamminput.path]
					)
				),
				"outputs": [output],
				"actions": [
					new class_action_mkdir(
						output.location
					),
					new class_action_concat(
						inputs,
						output
					),
				],
			}
		);
	}
		
}

class_task.register(
	"concat",
	(name, sub, active, parameters) => new class_task_concat(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

