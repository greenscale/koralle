
/**
 * @author fenris
 */
class class_action_locmerge extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected inputs : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected output : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		inputs : Array<lib_path.class_filepointer>,
		output : lib_path.class_filepointer
	) {
		super();
		this.inputs = inputs;
		this.output = output;
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		let args : Array<string> = [];
		// output
		{
			args.push(this.output.as_string(globalvars.configuration.system));
		}
		// inputs
		{
			this.inputs.forEach(input => args.push(input.as_string(globalvars.configuration.system)));
		}
		let cmdparams : type_cmdparams = {
			"path": "locmerge",
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

