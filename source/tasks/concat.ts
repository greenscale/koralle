
/**
 * @author fenris
 */
class_task.register(
	"concat",
	{
		"parameters": [
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
				"shape": lib_meta.from_raw(
					{
						"id": "array",
						"parameters": {
							"shape_element": {
								"id": "string",
								"parameters": {
									"soft": false
								}
							}
						}
					}
				),
				"mandatory": true,
				"default": null,
				"description": "the list of paths to files which shall be concatenated",
			},
			{
				"name": "output",
				"extraction": raw => {
					return (
						new class_just<lib_path.class_filepointer>(
							lib_path.filepointer_read(raw)
						)
					);
				},
				"shape": lib_meta.from_raw(
					{
						"id": "string",
						"parameters": {
							"soft": false
						}
					}
				),
				"mandatory": true,
				"default": null,
				"description": "the path to the output file"
			},
		],
		"inputs": data => {
			return data["inputs"];
		},
		"outputs": data => {
			return [data["output"]];
		},
		"actions": data => {
			return [
				new class_action_mkdir(
					data["output"].location
				),
				new class_action_concat(
					data["inputs"],
					data["output"]
				),
			];
		},
	}
);

