
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
				"path": path = null,
				"target": target = configuration["target"],
				"raw": raw = true,
				"workdir": workdir = null,
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters : {
				path ?: string;
				target ?: string;
				raw ?: boolean;
				workdir ?: string;
			};
		}
	) {
		let path_ : lib_path.class_filepointer = lib_call.use(
			path,
			x => ((x == null) ? null : lib_path.filepointer_read(x))
		);
		let workdir_ : lib_path.class_location = lib_call.use(
			workdir,
			x => ((x == null) ? path_.location : lib_path.location_read(x))
		);
		let actions : Array<class_action> = (
			() => {
				switch (target) {
					case "gnumake": {
						let filepointer_buildfile : lib_path.class_filepointer = new lib_path.class_filepointer(
							lib_path.location_read(configuration.tempfolder, configuration.system),
							"makefile"
						);
						return [
							new class_action_koralle(
								path_,
								filepointer_buildfile,
								target,
								raw
							),
							new class_action_gnumake(
								filepointer_buildfile,
								workdir_
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
								path_,
								filepointer_buildfile,
								target,
								raw
							),
							new class_action_ant(
								filepointer_buildfile,
								workdir_
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
			[path_],
			[],
			actions
		);
	}
	
}

