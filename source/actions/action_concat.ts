
/**
 * @author fenris
 */
class class_action_concat extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected filepointers_from : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected filepointer_to : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(filepointers_from : Array<lib_path.class_filepointer>, filepointer_to : lib_path.class_filepointer) {
		super();
		this.filepointers_from = filepointers_from;
		this.filepointer_to = filepointer_to;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				let parts : Array<string> = [];
				switch (configuration["system"]) {
					case "unix": {
						parts.push("cat");
						break;
					}
					case "win": {
						parts.push("type");
						break;
					}
					default: {
						throw (new Error("not implemented"));
						// break;
					}
				}
				this.filepointers_from.forEach(filepointer => parts.push(filepointer.as_string(configuration["system"])));
				parts.push(">");
				parts.push(this.filepointer_to.as_string(configuration["system"]));
				return parts.join(" ");
				// break;
			}
			case "ant": {
				return (
					new lib_ant.class_action(
						new lib_xml.class_node_complex(
							"concat",
							{"destfile": this.filepointer_to.as_string("unix")},
							[
								new lib_xml.class_node_complex(
									"filelist",
									{"dir": "."},
									this.filepointers_from.map(
										function (filepointer : lib_path.class_filepointer) : lib_xml.class_node {
											return (
												new lib_xml.class_node_complex(
													"file",
													{"name": filepointer.as_string("unix")}
												)
											);
										}
									)
								)
							]
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

