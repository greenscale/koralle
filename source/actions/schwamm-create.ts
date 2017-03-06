
/**
 * @author fenris
 */
class class_action_schwamm_create extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected includes : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected adhoc : {[group : string] : Array<lib_path.class_filepointer>};
	
	
	/**
	 * @author fenris
	 */
	protected output : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected dir : lib_path.class_location;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		includes : Array<lib_path.class_filepointer>,
		adhoc : {[group : string] : Array<lib_path.class_filepointer>},
		output : lib_path.class_filepointer,
		dir : lib_path.class_location
	) {
		super();
		this.includes = includes;
		this.adhoc = adhoc;
		this.output = output;
		this.dir = dir;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		let args : Array<string> = [];
		this.includes.forEach(
			include => {
				args.push(`--include=${include.as_string(globalvars.configuration["system"])}`);
			}
		);
		Object.keys(this.adhoc).forEach(
			group => {
				this.adhoc[group].forEach(
					member => {
						let filepointer : lib_path.class_filepointer = /*lib_path.filepointer_read(globalvars.configuration["path"]).foo(member)*/member;
						args.push(`--input=${filepointer.as_string(globalvars.configuration["system"])}:${group}`);
					}
				);
			}
		);
		args.push(`--output=native`);
		// args.push(`--file=${this.output.as_string(globalvars.configuration["system"])}`);
		// args.push(`--dir=${((this.dir != null) ? this.dir : this.output.location).as_string("linux")}`);
		let cmdparams : type_cmdparams = {
			"path": "schwamm",
			"args": args,
			"output": this.output.as_string(globalvars.configuration["system"]),
		};
		switch (target_identifier) {
			case "gnumake": {
				return lib_gnumake.macro_command(cmdparams);
				break;
			}
			case "ant": {
				return lib_ant.class_action.macro_command(cmdparams);
				break;
			}
			default: {
				throw (new Error(`unhandled target '${target_identifier}'`));
				break;
			}
		}
	}
	
}

