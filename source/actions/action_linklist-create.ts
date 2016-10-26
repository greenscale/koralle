
/**
 * @author fenris
 */
class class_action_linklist_create extends class_action_adhoc {
	
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
	public constructor(
		includes : Array<lib_path.class_filepointer>,
		adhoc : {[group : string] : Array<lib_path.class_filepointer>},
		output : lib_path.class_filepointer
	) {
		super();
		this.includes = includes;
		this.adhoc = adhoc;
		this.output = output;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				let parts : Array<string> = [];
				parts.push("linklist");
				parts.push("create");
				this.includes.forEach(
					include => {
						parts = parts.concat(["-i", include.as_string(configuration["system"])]);
					}
				);
				Object.keys(this.adhoc).forEach(
					group => {
						this.adhoc[group].forEach(
							member => {
								let filepointer : lib_path.class_filepointer = lib_path.filepointer_read(configuration["path"]).foo(member);
								parts = parts.concat(["-a", `${group}:${filepointer.as_string(configuration["system"])}`]);
							}
						);
					}
				);
				parts.push(">");
				parts.push(this.output.as_string(configuration["system"]));
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

