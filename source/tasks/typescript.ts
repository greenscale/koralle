
/**
 * @author fenris
 */
class class_task_typescript extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"inputs": inputs_raw = [],
				"output": output_raw = null,
				"target": target = null,
				"allowUnreachableCode": allowUnreachableCode = null,
				"declaration": declaration_raw = null,
			}
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				inputs ?: Array<string>;
				output ?: string;
				target ?: string;
				allowUnreachableCode ?: boolean;
				declaration ?: string;
			}
		}
	) {
		/*
		[
			new class_taskparameter<Array<string>, Array<lib_path.class_filepointer>>(
				{
					"name": "inputs",
					"type": {
						"id": "array",
						"parameters": {
							"type_element": {
								"id": "string",
							},
						},
					},
					"mandatory": false,
					"default": [],
					"key": "inputs",
					"extraction": raw => lib_call.use(
						raw,
						x => x.map(y => lib_path.filepointer_read(y))
					),
					"description": "the paths of the source files",
				}
			),
			new class_taskparameter<string>(
				{
					"type": {
						"id": "string",
					},
					"name": "output",
					"key": "output",
					"mandatory": true,
					"default": null,
					"description": "the path of the file in which to write the compilation",
				}
			),
			new class_taskparameter<string>(
				{
					"type": {
						"id": "string",
					},
					"name": "declaration",
					"key": "declaration",
					"mandatory": false,
					"default": null,
					"description": "the path of the file in which to write the declaration; if not set, no declaration-script will be created",
				}
			),
			new class_taskparameter<string>(
				{
					"type": {
						"id": "string",
					},
					"name": "target",
					"key": "target",
					"mandatory": false,
					"default": null,
					"description": "the tsc-switch 'target'; default: don't specify",
				}
			),
			new class_taskparameter<boolean>(
				{
					"type": {
						"id": "boolean",
					},
					"name": "allowUnreachableCode",
					"key": "allow_unreachable_code",
					"mandatory": false,
					"default": null,
					"description": "the tsc-switch 'allowUnreachableCode'; default: don't specify",
				}
			),
		]
		 */
		let inputs : Array<lib_path.class_filepointer> = lib_call.use(
			inputs_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		if (output_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("typescript", name, "output")));
		}
		let output : lib_path.class_filepointer = lib_call.use(
			output_raw,
			x => lib_path.filepointer_read(x)
		);
		let declaration : lib_path.class_filepointer = lib_call.use(
			declaration_raw,
			x => ((x == null) ? null : lib_path.filepointer_read(x))
		);
		let original : lib_path.class_filepointer = lib_call.use(
			output_raw,
			lib_call.compose(
				x => x.replace(new RegExp(".js$"), ".d.ts"),
				x => lib_path.filepointer_read(x)
			)
		);
		super(
			name, sub, active,
			inputs,
			(
				[]
				.concat(
					[output]
				)
				.concat(
					(declaration == null)
					? []
					: [declaration]
				)
			),
			(
				[]
				.concat(
					[
						new class_action_mkdir(
							output.location
						),
						new class_action_tsc(
							inputs,
							output,
							target,
							allowUnreachableCode,
							declaration
						),
					]
				)
				.concat(
					(declaration == null)
					?
					[]
					:
					[
						new class_action_mkdir(
							declaration.location
						),
						new class_action_move(
							{
								"from": original,
								"to": declaration,
							}
						),
					]
				)
			)
		);
	}
	
}

class_task.register(
	"typescript",
	(name, sub, active, parameters) => new class_task_typescript(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

