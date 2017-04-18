
/**
 * @author fenris
 */
class_task.register(
	"typescript",
	{
		"description": "compiles a list of typescript input files to a single javascript output file",
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
								"id": "string"
							}
						}
					}
				),
				"mandatory": true,
				"default": [],
				"description": "the paths of the source files"
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
						"id": "string"
					}
				),
				"mandatory": true,
				"default": null,
				"description": "the path to the output file"
			},
			{
				"name": "declaration",
				"extraction": raw => {
					return (
						(raw == null)
						? null
						: new class_just<lib_path.class_filepointer>(
							lib_path.filepointer_read(raw)
						)
					);
				},
				"shape": lib_meta.from_raw(
					{
						"id": "string",
					}
				),
				"mandatory": false,
				"default": null,
				"description": "the path of the file in which to write the declaration; if not set, no declaration-script will be created",
			},
			{
				"name": "target",
				"extraction": raw => {
					return (
						(raw == null)
						? null
						: new class_just<string>(
							raw
						)
					);
				},
				"shape": lib_meta.from_raw(
					{
						"id": "string",
					}
				),
				"mandatory": false,
				"default": null,
				"description": "the tsc-switch 'target'; default: don't specify",
			},
			{
				"name": "allow_unreachable_code",
				"extraction": raw => {
					return (
						(raw == null)
						? null
						: new class_just<boolean>(
							raw
						)
					);
				},
				"shape": lib_meta.from_raw(
					{
						"id": "boolean",
					}
				),
				"mandatory": false,
				"default": null,
				"description": "the tsc-switch 'allowUnreachableCode'; default: don't specify",
			},
		],
		"inputs": data => {
			return data["inputs"];
		},
		"outputs": data => {
			let outputs : Array<lib_path.class_filepointer> = [];
			outputs.push(data["output"]);
			if (data["declaration"] != null) {
				outputs.push(data["declaration"]);
			}
			return outputs;
		},
		"actions": data => {
			let actions : Array<class_action> = [];
			actions = actions.concat(
				[
					new class_action_mkdir(
						data["output"].location
					),
					new class_action_tsc(
						data["inputs"],
						data["output"],
						data["target"],
						data["allow_unreachable_code"],
						data["declaration"]
					),
				]
			)
			if (data["declaration"] != null) {
				let from = new lib_path.class_filepointer(
					data["output"].location,
					data["output"].filename.replace(new RegExp(".js$"), ".d.ts")
				);
				actions = actions.concat(
					[
						new class_action_mkdir(
							data["declaration"].location
						),
						new class_action_move(
							{
								"from": from,
								"to": data["declaration"],
							}
						),
					]
				);
			}
			return actions;
		},
	}
);

