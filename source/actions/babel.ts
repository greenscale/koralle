
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

	protected preset : string;
	
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
		switch (target_identifier) {
			case "gnumake": {
				let parts : Array<string> = [];
				switch (globalvars.configuration["system"]) {
					case "linux":
					case "bsd":
					case "win": {
						parts.push("babel");
						parts.push("--no-babelrc");
						// input
						{
							this.filepointers_from.forEach(filepointer => parts.push(filepointer.as_string(globalvars.configuration["system"])));
						}
						// output
						{
							parts.push("--out-file");
							parts.push(this.filepointer_to.as_string(globalvars.configuration["system"]));
						}
						// presets
						{
							let presets : Array<string> = [];
							if (this.preset !== null) {
								presets.push(this.preset);
							}
							if (this.minify) {
								parts.push("--minified")
							}
							if (presets.length > 0) {
								parts.push("--presets");
								parts.push(presets.join(","));
							}
						}
						return parts.join(" ");
						break;
					}
					default: {
						throw (new Error("not implemented"));
						// break;
					}
				}
				break;
			}
			default: {
				throw (new Error("unhandled target '" + target_identifier + "'"));
				// break;
			}
		}
	}
	
}

