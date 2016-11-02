
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
		switch (target_identifier) {
			case "gnumake": {
				let parts : Array<string> = [];
				parts.push("schwamm");
				parts.push("create");
				this.includes.forEach(
					include => {
						parts.push(`--include=${include.as_string(configuration["unix"])}`);
					}
				);
				Object.keys(this.adhoc).forEach(
					group => {
						this.adhoc[group].forEach(
							member => {
								let filepointer : lib_path.class_filepointer = /*lib_path.filepointer_read(configuration["path"]).foo(member)*/member;
								parts.push(`--adhoc=${group}:${filepointer.as_string(configuration["unix"])}`);
							}
						);
					}
				);
				// parts.push(`--file=${this.output.as_string(configuration["system"])}`);
				if (this.dir != null) {
					parts.push(`--dir=${this.dir.as_string("unix")}`);
				}
				else {
					parts.push(`--dir=${this.output.location.as_string("unix")}`);
				}
				parts.push(`> ${this.output.as_string(configuration["unix"])}`);
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

