
/**
 * @author fenris
 */
class class_action_lessc extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected filepointer_from : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected filepointer_to : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(filepointer_from : lib_path.class_filepointer, filepointer_to : lib_path.class_filepointer) {
		super();
		this.filepointer_from = filepointer_from;
		this.filepointer_to = filepointer_to;
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		let args : Array<string> = [];
		args.push(this.filepointer_from.as_string(globalvars.configuration.system));
		let cmdparams : type_cmdparams = {
			"path": "lessc",
			"args": args,
			"output": this.filepointer_to.as_string(globalvars.configuration.system),
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

