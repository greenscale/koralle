
/**
 * @author fenris
 */
class class_action_lessc extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected filepointer_from : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected filepointer_to : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(filepointer_from : lib_path.class_filepointer, filepointer_to : lib_path.class_filepointer) {
		super();
		this.filepointer_from = filepointer_from;
		this.filepointer_to = filepointer_to;
	}
	
	
	/**
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				switch (globalvars.configuration["system"]) {
					case "linux":
					case "bsd":
					case "win": {
						let parts : Array<string> = [];
						parts.push("lessc");
						parts.push(this.filepointer_from.toString());
						parts.push(this.filepointer_to.toString());
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
			case "ant": {
				switch (globalvars.configuration["system"]) {
					case "linux": {
						return (
							new lib_ant.class_action(
								new lib_xml.class_node_complex(
									"exec",
									{
										"executable": "lessc",
										"output": this.filepointer_to.toString(),
									},
									[
										new lib_xml.class_node_complex(
											"arg",
											{"value": this.filepointer_from.toString()}
										),
									]
								)
							)
						);
						// break;
					}
					case "win": {
						return (
							new lib_ant.class_action(
								new lib_xml.class_node_complex(
									"exec",
									{
										"executable": "cmd",
										"output": this.filepointer_to.toString(),
									},
									[
										new lib_xml.class_node_complex(
											"arg",
											{"value": "/c"}
										),
										new lib_xml.class_node_complex(
											"arg",
											{"value": "lessc"}
										),
										new lib_xml.class_node_complex(
											"arg",
											{"value": this.filepointer_from.toString()}
										),
									]
								)
							)
						);
						// break;
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
				break;
			}
		}
	}
	
}

