
/**
 * @author fenris
 */
class class_action_touch extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected filepointer : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(filepointer : lib_path.class_filepointer) {
		super();
		this.filepointer = filepointer;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				switch (configuration["system"]) {
					case "unix": {
						let parts : Array<string> = [];
						parts.push("touch");
						parts.push(this.filepointer.toString());
						return parts.join(" ");
						// break;
					}
					default: {
						throw (new Error("not implemented"));
						// break;
					}
				}
				// break;
			}
			case "ant": {
				return (
					new lib_ant.class_action(
						new lib_xml.class_node_complex(
							"touch",
							{"file": this.filepointer.toString()}
						)
					)
				);
				// break;
			}
			default: {
				throw (new Error("unhandled target '" + target_identifier + "'"));
				break;
			}
		}
	}
	
}

