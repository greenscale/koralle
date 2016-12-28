
/**
 * @author fenris
 */
class class_action_gitpull extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected url : string;
	
	
	/**
	 * @author fenris
	 */
	public constructor(url : string) {
		super();
		this.url = url;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @todo escape message
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				switch (configuration["system"]) {
					case "linux":
					case "win": {
						let parts : Array<string> = [];
						parts.push("git pull");
						parts.push(this.url);
						return parts.join(" ");
						break;
					}
					default: {
						throw (new Error("not implemented"));
						break;
					}
				}
				break;
			}
			/*
			case "ant": {
				return (
					new lib_ant.class_action(
						new lib_xml.class_node_complex(
							"echo",
							{"message": this.message}
						)
					)
				);
				break;
			}
			 */
			default: {
				throw (new Error("unhandled target '" + target_identifier + "'"));
				break;
			}
		}
	}
	
}

