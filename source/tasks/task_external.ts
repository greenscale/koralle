
/**
 * @author fenris
 */
class class_task_external extends class_task {
	
	/**
	 * url of git repository
	 * @author fenris
	 */
	protected url : string;
	
	
	/**
	 * @author fenris
	 */
	protected target : string;
	
	
	/**
	 * @author fenris
	 */
	protected raw : boolean;
	
	
	/**
	 * @author fenris
	 */
	protected workdir : lib_path.class_location;
	
	
	/**
	 * @author fenris
	 */
	constructor(
		name : string = null,
		sub : Array<class_task> = [],
		active : boolean = true,
		url : string = null,
		target : string = configuration["target"],
		raw : boolean = true,
		workdir : lib_path.class_location = lib_path.location_read("./")
	) {
		super(name, sub, active);
		this.url = url;
		this.target = target;
		this.raw = raw;
		this.workdir = workdir;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_external {
		return (
			new class_task_external(
				name, sub, active,
				object_fetch<string>(parameters, "url", null, 2)
			)
		);
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return [];
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public outputs() : Array<lib_path.class_filepointer> {
		return [];
	}
	
	
	/**
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		let filepointer_project : lib_path.class_filepointer = lib_path.filepointer_read("./project.json");
		let filepointer_buildfile : lib_path.class_filepointer;
		switch (this.target) {
			case "gnumake": {
				filepointer_buildfile = new lib_path.class_filepointer(
					lib_path.location_read(configuration.tempfolder, configuration.system),
					"makefile"
				);
				break;
			}
			case "ant": {
				filepointer_buildfile = new lib_path.class_filepointer(
					lib_path.location_read(configuration.tempfolder, configuration.system),
					"build.xml"
				);
				break;
			}
			default: {
				throw (new Error("unhandled target '" + this.target + "'"));
				break;
			}
		}
		return [
			new class_action_gitpull(
				this.url
			),
			new class_action_koralle(
				filepointer_project,
				filepointer_buildfile,
				this.target,
				this.raw
			),
			new class_action_ant(
				filepointer_buildfile,
				this.workdir
			),
		];
	}
	
}

class_task.register("external", /*(name, sub, active, parameters) => */class_task_external.create/*(name, sub, active, parameters)*/);

