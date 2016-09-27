
/**
 * @author fenris
 */
class class_task_dependency extends class_task {
	
	/**
	 * @author fenris
	 */
	protected filepointer_project : lib_path.class_filepointer;
	
	
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
		filepointer_project : lib_path.class_filepointer = null,
		target : string = configuration["target"],
		raw : boolean = true,
		workdir : lib_path.class_location = filepointer_project.location// = null
	) {
		super(name, sub, active);
		this.filepointer_project = filepointer_project;
		this.target = target;
		this.raw = raw;
		this.workdir = workdir;
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return [this.filepointer_project];
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
		switch (this.target) {
			case "gnumake": {
				let filepointer_buildfile : lib_path.class_filepointer = new lib_path.class_filepointer(
					lib_path.location_read(configuration.tempfolder, configuration.system),
					"makefile"
				);
				return [
					new class_action_koralle(
						this.filepointer_project,
						filepointer_buildfile,
						this.target,
						this.raw
					),
					new class_action_gnumake(
						filepointer_buildfile,
						this.workdir
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
						this.filepointer_project,
						filepointer_buildfile,
						this.target,
						this.raw
					),
					new class_action_ant(
						filepointer_buildfile,
						this.workdir
					),
				];
				break;
			}
			default: {
				throw (new Error("unhandled target '" + this.target + "'"));
				break;
			}
		}
	}
	
}

