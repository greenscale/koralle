
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
					case "linux": {
						let args : Array<string> = [];
						if (this.folder) {
							args.push("--recursive");
							args.push("--update");
							args.push("--verbose");
							args.push((new lib_path.class_filepointer(this.filepointer_from.location, "*")).as_string(configuration.system));
						}
						else {
							args.push(this.filepointer_from.as_string(configuration.system));
						}
						args.push(this.filepointer_to.as_string(configuration.system));
						return (
							lib_gnumake.macro_command(
								{
									"path": "cp",
									"args": args,
								}
							)
						);
						break;
					}
					case "bsd": {
						let args : Array<string> = [];
						if (this.folder) {
							args.push("-r");
							// args.push("-u");
							args.push("-v");
							args.push((new lib_path.class_filepointer(this.filepointer_from.location, "*")).as_string(configuration.system));
						}
						else {
							args.push(this.filepointer_from.as_string(configuration.system));
						}
						args.push(this.filepointer_to.as_string(configuration.system));
						return (
							lib_gnumake.macro_command(
								{
									"path": "cp",
									"args": args,
								}
							)
						);
						break;
					}
					case "win": {
						throw (new Error("not implemented"));
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
									"file": this.filepointer_from.as_string("linux"),
									"tofile": this.filepointer_to.as_string("linux"),
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
									"todir": this.filepointer_to.as_string("linux"),
								},
								[
									new lib_xml.class_node_complex(
										"fileset",
										{
											"dir": this.filepointer_from.as_string("linux"),
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

