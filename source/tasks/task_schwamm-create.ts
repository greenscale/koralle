
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
				"includes": includes = [],
				"adhoc": adhoc = {},
				"output": output = null,
				"dir": dir = null,
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
		let includes_ : Array<lib_path.class_filepointer> = lib_call.use(
			includes,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		let adhoc_ : {[group : string] : Array<lib_path.class_filepointer>} = lib_call.use(
			adhoc,
			x => lib_object.map<Array<string>, Array<lib_path.class_filepointer>>(x, members => members.map(member => lib_path.filepointer_read(member)))
		);
		let output_ : lib_path.class_filepointer = lib_call.use(
			output,
			x => lib_path.filepointer_read(x)
		);
		let dir_ : lib_path.class_location = lib_call.use(
			dir,
			x => ((x == null) ? null : lib_path.location_read(x))
		);
		super(
			name, sub, active,
			includes_.concat(lib_object.values<Array<lib_path.class_filepointer>>(adhoc_).reduce((x, y) => x.concat(y), [])),
			[output_],
			[
				new class_action_mkdir(
					output_.location
				),
				new class_action_schwamm_create(
					includes_,
					adhoc_,
					output_,
					dir_
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

