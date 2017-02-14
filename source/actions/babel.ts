
/**
 * @author neu3no
 */
class class_action_babel extends class_action_adhoc {
	
	/**
	 * @author neu3no
	 */
	protected filepointers_from : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author neu3no
	 */
	protected filepointer_to : lib_path.class_filepointer;
	
	
	/**
	 */
	protected preset : string;
	
	
	/**
	 */
	protected minify : boolean;
	
	
	/**
	 * @author neu3no
	 */
	public constructor(
		filepointers_from : Array<lib_path.class_filepointer>,
		filepointer_to : lib_path.class_filepointer,
		preset : string,
		minify : boolean
	) {
		super();
		this.filepointers_from = filepointers_from;
		this.filepointer_to = filepointer_to;
		this.preset = preset;
		this.minify = minify;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author neu3no
	 */
	public compilation(target_identifier : string) : any {
		let args : Array<string> = [];
		args.push("--no-babelrc");
		// input
		{
			this.filepointers_from.forEach(filepointer => args.push(filepointer.as_string(globalvars.configuration.system)));
		}
		// output
		{
			args.push("--out-file");
			args.push(this.filepointer_to.as_string(globalvars.configuration.system));
		}
		// presets
		{
			let presets : Array<string> = [];
			if (this.preset !== null) {
				presets.push(this.preset);
			}
			if (this.minify) {
				args.push("--minified")
			}
			if (presets.length > 0) {
				args.push("--presets");
				args.push(presets.join(","));
			}
		}
		let cmdparams : type_cmdparams = {
			"path": "babel",
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
				throw (new Error("unhandled target '" + target_identifier + "'"));
				break;
			}
		}
	}
	
}

