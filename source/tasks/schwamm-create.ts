
/**
 * @author fenris
 */
class class_task_schwamm_create extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"includes": includes_raw = [],
				"adhoc": adhoc_raw = {},
				"output": output_raw = null,
				"dir": dir_raw = null,
			},
		} : {
			name ?: string,
			sub ?: Array<class_task>,
			active ?: boolean,
			parameters ?: {
				includes ?: Array<string>,
				adhoc ?: {[group : string] : Array<string>},
				output ?: string,
				dir ?: string;
			}
		}
	) {
		let includes : Array<lib_path.class_filepointer> = lib_call.use(
			includes_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		let adhoc : {[group : string] : Array<lib_path.class_filepointer>} = lib_call.use(
			adhoc_raw,
			x => lib_object.map<Array<string>, Array<lib_path.class_filepointer>>(x, members => members.map(member => lib_path.filepointer_read(member)))
		);
		let output : lib_path.class_filepointer = lib_call.use(
			output_raw,
			x => lib_path.filepointer_read(x)
		);
		let dir : lib_path.class_location = lib_call.use(
			dir_raw,
			x => ((x == null) ? null : lib_path.location_read(x))
		);
		super(
			name, sub, active,
			includes.concat(lib_object.values<Array<lib_path.class_filepointer>>(adhoc).reduce((x, y) => x.concat(y), [])),
			[output],
			[
				new class_action_mkdir(
					output.location
				),
				new class_action_schwamm_create(
					includes,
					adhoc,
					output,
					dir
				),
			]
		);
	}
		
}

class_task.register(
	"schwamm-create",
	(name, sub, active, parameters) => new class_task_schwamm_create(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

