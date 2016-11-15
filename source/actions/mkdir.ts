
/**
 * @author fenris
 */
class class_action_mkdir extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected location : lib_path.class_location;
	
	
	/**
	 * @author fenris
	 */
	public constructor(location : lib_path.class_location) {
		super();
		this.location = location;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				let parts : Array<string> = [];
				parts.push("mkdir");
				switch (configuration["system"]) {
					case "unix": {
						// parts.push("--parents");
						parts.push("-p");
						break;
					}
					case "win": {
						break;
					}
					default: {
						throw (new Error("not implemented"));
						break;
					}
				}
				parts.push(this.location.as_string(configuration["system"]));
				return parts.join(" ");
				// break;
			}
			case "ant": {
				return (
					new lib_ant.class_action(
						new lib_xml.class_node_complex(
							"mkdir",
							{"dir": this.location.as_string("unix")}
						)
					)
				);
				// break;
			}
			default: {
				throw (new Error("unhandled target '" + target_identifier + "'"));
				// break;
			}
		}
	}
	
}

