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
				switch (configuration["system"]) {
					case "unix": 
					case "win": 
						parts.push("babel");
						break;
					default: {
						throw (new Error("not implemented"));
						// break;
					}
				}
				let presets=[];
				if (this.preset !== null) {
					presets.push(this.preset);
				}
				this.filepointers_from.forEach(filepointer => parts.push(filepointer.as_string(configuration["system"])));
				parts.push("--out-file");
				parts.push(this.filepointer_to.as_string(configuration["system"]));
				if (this.minify) {
					presets.push("babili");	
				}
				if (presets.length > 0) {
					parts.push("--presets");
					parts.push(presets.join(","));
				}
				parts.push("--no-babelrc");

				return parts.join(" ");
				// break;
			}
			default: {
				throw (new Error("unhandled target '" + target_identifier + "'"));
				// break;
			}
		}
	}
	
}

