
/**
 * @author fenris
 */
class class_action_tsc extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected paths_input : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected path_output : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected target : string;
	
	
	/**
	 * @author fenris
	 */
	protected allowUnreachableCode : boolean;
	
	
	/**
	 * @author fenris
	 */
	protected declaration : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		paths_input : Array<lib_path.class_filepointer>,
		path_output : lib_path.class_filepointer,
		target : string,
		allowUnreachableCode : boolean,
		declaration : lib_path.class_filepointer
	) {
		super();
		this.paths_input = paths_input;
		this.path_output = path_output;
		this.target = target;
		this.allowUnreachableCode = allowUnreachableCode;
		this.declaration = declaration;
	}
	
	
	/**
	 * @author fenris
	 * @todo handle declarion-path
	 */
	public compilation(output_identifier : string) : any {
		let args : Array<string> = [];
		{
			if (this.allowUnreachableCode) {
				args.push("--allowUnreachableCode");
			}
		}
		{
			if (this.target != null) {
				args.push("--target");
				args.push(this.target);
			}
		}
		{
			this.paths_input.forEach(filepointer => args.push(filepointer.as_string(globalvars.configuration.system)));
		}
		{
			if (this.declaration != null) {
				args.push("--declaration");
			}
		}
		{
			args.push("--outFile");
			args.push(this.path_output.as_string(globalvars.configuration.system));
		}
		let cmdparams : type_cmdparams = {
			"path": "tsc",
			"args": args,
			"system": globalvars.configuration.system,
		};
		switch (output_identifier) {
			case "gnumake": {
				return lib_gnumake.macro_command(cmdparams);
				break;
			}
			case "ant": {
				return lib_ant.class_action.macro_command(cmdparams);
				break;
			}
			default: {
				throw (new Error(`unhandled output '${output_identifier}'`));
				break;
			}
		}
	}
	
}

