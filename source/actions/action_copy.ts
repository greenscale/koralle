
/**
 * @author fenris
 */
class class_action_copy extends class_action_adhoc {
	
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
	protected folder : boolean;
	
	
	/**
	 * @author fenris
	 */
	public constructor(filepointer_from : lib_path.class_filepointer, filepointer_to : lib_path.class_filepointer, folder : boolean) {
		super();
		this.filepointer_from = filepointer_from;
		this.filepointer_to = filepointer_to;
		this.folder = folder;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				switch (configuration.system) {
					case "unix":
					case "win": {
						let parts : Array<string> = [];
						parts.push("cp");
						if (this.folder) {
							parts.push("--recursive");
							parts.push("--update");
							parts.push("--verbose");
							parts.push((new lib_path.class_filepointer(this.filepointer_from.location, "*")).as_string(configuration.system));
						}
						else {
							parts.push(this.filepointer_from.as_string(configuration.system));
						}
						parts.push(this.filepointer_to.as_string(configuration.system));
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
				if (! this.folder) {
					return (
						new lib_ant.class_action(
							new lib_xml.class_node_complex(
								"copy",
								{
									"file": this.filepointer_from.as_string("unix"),
									"tofile": this.filepointer_to.as_string("unix"),
								}
							)
						)
					);
				}
				else {
					return (
						new lib_ant.class_action(
							new lib_xml.class_node_complex(
								"copy",
								{
									"todir": this.filepointer_to.as_string("unix"),
								},
								[
									new lib_xml.class_node_complex(
										"fileset",
										{
											"dir": this.filepointer_from.as_string("unix"),
										}
									)
								]
							)
						)
					);
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

