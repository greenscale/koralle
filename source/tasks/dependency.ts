
/**
 * @author fenris
 */
class class_task_dependency extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
				"path": path_raw = null,
				"output": output = configuration["target"],
				"raw": raw = true,
				"workdir": workdir_raw = null,
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				path ?: string;
				output ?: string;
				raw ?: boolean;
				workdir ?: string;
			};
		}
	) {
		if (path_raw == undefined) {
			throw (new Error(class_task.errormessage_mandatoryparamater("dependency", name, "path")));
		}
		let path : lib_path.class_filepointer = lib_call.use(
			path_raw,
			x => ((x == null) ? null : lib_path.filepointer_read(x))
		);
		let workdir : lib_path.class_location = lib_call.use(
			workdir_raw,
			x => ((x == null) ? path.location : lib_path.location_read(x))
		);
		let actions : Array<class_action> = (
			() => {
				switch (output) {
					case "gnumake": {
						let filepointer_buildfile : lib_path.class_filepointer = new lib_path.class_filepointer(
							lib_path.location_read(configuration.tempfolder, configuration.system),
							"makefile"
						);
						return [
							new class_action_koralle(
								{
									"filepointer_in": path,
									"filepointer_out": filepointer_buildfile,
									"output": output,
									"raw": raw,
								}
							),
							new class_action_gnumake(
								filepointer_buildfile,
								workdir
							),
						];
						break;
					}
					case "ant": {
						let filepointer_buildfile : lib_path.class_filepointer = new lib_path.class_filepointer(
							lib_path.location_read(configuration.tempfolder, configuration.system),
							"build.xml"
						);
						return [
							new class_action_koralle(
								{
									"filepointer_in": path,
									"filepointer_out": filepointer_buildfile,
									"output": output,
									"raw": raw,
								}
							),
							new class_action_ant(
								filepointer_buildfile,
								workdir
							),
						];
						break;
					}
					default: {
						throw (new Error("unhandled target '${target}'"));
						break;
					}
				}
			}
		)();
		super(
			name, sub, active,
			[path],
			[],
			actions
		);
	}
	
}

