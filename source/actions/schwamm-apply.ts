
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
	protected outputs : {[group : string] : lib_path.class_filepointer};
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		path : lib_path.class_filepointer,
		outputs : {[group : string] : lib_path.class_filepointer}
	) {
		super();
		this.path = path;
		this.outputs = outputs;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		let args : Array<string> = [];
		args.push("apply");
		args.push(`--file=${this.path.as_string(configuration["system"])}`);
		Object.keys(this.outputs).forEach(
			groupname => {
				let filepointer : lib_path.class_filepointer = lib_path.filepointer_read(configuration["path"]).foo(this.outputs[groupname]);
				args.push(`--output=${groupname}:${filepointer.as_string(configuration["system"])}`);
			}
		);
		let cmdparams : type_cmdparams = {
			"path": "schwamm",
			"args": args,
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

