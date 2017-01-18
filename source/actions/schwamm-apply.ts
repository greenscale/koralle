
/**
 * @author fenris
 */
class class_action_schwamm_apply extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected path : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected output_group : string;
	
	
	/**
	 * @author fenris
	 */
	protected output_filepointer : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		path : lib_path.class_filepointer,
		output_group : string,
		output_filepointer : lib_path.class_filepointer
	) {
		super();
		this.path = path;
		this.output_group = output_group;
		this.output_filepointer = output_filepointer;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		let args : Array<string> = [];
		args.push(`--include=${this.path.as_string(configuration["system"])}`);
		args.push(`--output=dump:${this.output_group}`);
		let filepointer : lib_path.class_filepointer = lib_path.filepointer_read(configuration["path"]).foo(this.output_filepointer);
		let cmdparams : type_cmdparams = {
			"path": "schwamm",
			"args": args,
			"output": filepointer.as_string(configuration["system"]),
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

