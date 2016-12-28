
/**
 * @author fenris
 */
class class_action_move extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected from : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected to : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"from": from,
			"to": to,
		} : {
			from : lib_path.class_filepointer,
			to : lib_path.class_filepointer
		}
	) {
		super();
		this.from = from;
		this.to = to;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(output_identifier : string) : any {
		switch (output_identifier) {
			case "gnumake": {
				switch (configuration.system) {
					case "linux":
					case "bsd":
					case "win": {
						let from : string = this.from.as_string(configuration.system);
						let to : string = this.to.as_string(configuration.system);
						let command : string = "";
						{
							command = lib_gnumake.macro_command(
								{
									"path": "mv",
									// "args": ["--verbose", from, to],
									"args": ["-v", from, to],
									"system": configuration.system,
								}
							)
						}
						{
							command = `[ "${from}" -ef "${to}" ] || ${command}`;
						}
						return command;
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
							"move",
							{
								"file": this.from.as_string("linux"),
								"tofile": this.to.as_string("linux"),
							}
						)
					)
				);
				break;
			}
			default: {
				throw (new Error(`unhandled output '${output_identifier}'`));
				break;
			}
		}
	}
	
}

