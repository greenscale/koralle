
/**
 * @author fenris
 */
class class_action_linklist_apply extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected path : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected outputs_ : {[group : string] : lib_path.class_filepointer};
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		path : lib_path.class_filepointer,
		outputs_ : {[group : string] : lib_path.class_filepointer}
	) {
		super();
		this.path = path;
		this.outputs_ = outputs_;
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
				parts.push("apply");
				parts.push(this.path.as_string(configuration["system"]));
				Object.keys(this.outputs_).forEach(
					groupname => {
						let filepointer : lib_path.class_filepointer = lib_path.filepointer_read(configuration["path"]).foo(this.outputs_[groupname]);
						parts = parts.concat(["-o", `${groupname}:${filepointer.as_string(configuration["system"])}`]);
					}
				);
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

