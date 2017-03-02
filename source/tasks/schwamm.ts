
/**
 * @author fenris
 */
class class_task_schwamm extends class_task {
	
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
				"inputs": inputs_raw = {},
				"output": {
					"save": save_raw = null,
					"dump": dump_raw = {},
					"locmerge": locmerge_raw = {},
				},
			}
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters ?: {
				includes ?: Array<string>;
				inputs ?: {[domain : string] : Array<string>};
				output ?: {
					save ?: string;
					dump ?: {[domain : string] : string};
					locmerge ?: {[domain : string] : {[identifier : string] : string}};
				};
			}
		}
	) {
		let includes : Array<lib_path.class_filepointer> = lib_call.use(
			includes_raw,
			x => x.map(y => lib_path.filepointer_read(y))
		);
		let inputs : {[domain : string] : Array<lib_path.class_filepointer>} = lib_call.use(
			inputs_raw,
			x => lib_object.map<Array<string>, Array<lib_path.class_filepointer>>(x, members => members.map(member => lib_path.filepointer_read(member)))
		);
		let save : lib_path.class_filepointer = lib_call.use(
			save_raw,
			y => ((y == null) ? null : lib_path.filepointer_read(y))
		);
		let dump : {[domain : string] : lib_path.class_filepointer} = lib_call.use(
			dump_raw,
			x => lib_object.map<string, lib_path.class_filepointer>(x, y => lib_path.filepointer_read(y))
		);
		let locmerge : {[domain : string] : {[identifier : string] : lib_path.class_filepointer}} = lib_call.use(
			locmerge_raw,
			x => lib_object.map<{[identifier : string] : string}, {[identifier : string] : lib_path.class_filepointer}>(
				x,
				y => lib_object.map<string, lib_path.class_filepointer>(y, z => lib_path.filepointer_read(z))
			)
		);
		super(
			name, sub, active,
			(
				[]
				.concat(includes)
				.concat(lib_object.values(inputs).reduce((x, y) => x.concat(y), []))
			),
			(
				[]
				.concat(
					(save == null)
					? []
					: [save]
				)
				.concat(
					lib_object.values(dump).reduce((x, y) => x.concat(y), [])
				)
			),
			(
				[]
				.concat(
					(save == null)
					? [
					]
					: [
						new class_action_mkdir(
							save.location
						),
						new class_action_schwamm(
							includes,
							inputs,
							save
						),
					]
				)
				.concat(
					lib_object.to_array(dump)
					.map(
						pair => [
							new class_action_mkdir(
								pair.value.location
							),
							new class_action_schwamm(
								includes,
								inputs,
								undefined,
								pair.key,
								pair.value
							),
						]
					)
					.reduce((x, y) => x.concat(y), [])
				)
				.concat(
					lib_object.to_array(locmerge)
					.map(
						pair => lib_object.to_array(pair.value)
						.map(
							pair_ => [
								new class_action_mkdir(
									pair_.value.location
								),
								new class_action_schwamm(
									includes,
									inputs,
									undefined,
									undefined,
									undefined,
									pair.key,
									pair_.key,
									pair_.value,
								),
							]
						)
						.reduce((x, y) => x.concat(y), [])
					)
					.reduce((x, y) => x.concat(y), [])
				)
			)
		);
	}	
	
}

class_task.register(
	"schwamm",
	(name, sub, active, parameters) => new class_task_schwamm(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

