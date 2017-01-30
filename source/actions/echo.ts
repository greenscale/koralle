
/**
 * @author fenris
 */
class class_action_echo extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected message : string;
	
	
	/**
	 * @author fenris
	 */
	public constructor(message : string) {
		super();
		this.message = message;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @todo escape message
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				switch (globalvars.configuration["system"]) {
					case "linux":
					case "bsd":
					case "win": {
						return (
							lib_gnumake.macro_command(
								{
									"path": "echo",
									"args": ["\"" + this.message + "\""],
								}
							)
						);
						break;
					}
					default: {
						throw (new Error("not implemented"));
						break;
					}
				}
				break;
			}
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
			default: {
				throw (new Error("unhandled target '" + target_identifier + "'"));
				break;
			}
		}
	}
	
}

