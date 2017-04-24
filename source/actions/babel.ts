
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
	 * @author neu3no,fenris
	 */
	protected presets : Array<string>;
	
	
	/**
	 * @author fenris
	 */
	protected plugins : Array<string>;
	
	
	/**
	 * @author neu3no
	 */
	protected minify : boolean;
	
	
	/**
	 * @author neu3no
	 */
	public constructor(
		filepointers_from : Array<lib_path.class_filepointer>,
		filepointer_to : lib_path.class_filepointer,
		presets : Array<string>,
		plugins : Array<string>,
		minify : boolean,
	) {
		super();
		this.filepointers_from = filepointers_from;
		this.filepointer_to = filepointer_to;
		this.presets = presets;
		this.plugins = plugins;
		this.minify = minify;
	}
	
	
	/**
	 * @override
	 * @author neu3no,fenris
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
			if ((this.presets !== null) && (this.presets.length > 0)) {
				args.push("--presets");
				args.push(this.presets.join(","));
			}
		}
		// plugins
		{
			if ((this.plugins != null) && (this.plugins.length > 0)) {
				args.push("--plugins");
				args.push(this.plugins.join(","));
			}
		}
		// minify
		{
			if (this.minify) {
				args.push("--minified")
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
				throw (new Error(`unhandled target '${target_identifier}'`));
				break;
			}
		}
	}
	
}

