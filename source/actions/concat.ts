
/**
 * @author fenris
 */
class class_action_concat extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected sources : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected destination : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(sources : Array<lib_path.class_filepointer>, destination : lib_path.class_filepointer) {
		super();
		this.sources = sources;
		this.destination = destination;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(output_identifier : string) : any {
		switch (output_identifier) {
			case "gnumake": {
				if (this.sources.length > 0) {
					return (
						lib_gnumake.macro_command(
							{
								"path": {
									"linux": "cat",
									"bsd": "cat",
									"win": "type",
								}[globalvars.configuration.system],
								"args": this.sources.map(source => source.as_string(globalvars.configuration.system)),
								"output": this.destination.as_string(globalvars.configuration.system),
							}
						)
					);
				}
				else {
					return (
						lib_gnumake.macro_command(
							{
								"path": "touch",
								"output": this.destination.as_string(globalvars.configuration.system),
							}
						)
					);
				}
				break;
			}
			case "ant": {
				return (
					new lib_ant.class_action(
						new lib_xml.class_node_complex(
							"concat",
							{"destfile": this.destination.as_string("linux")},
							[
								new lib_xml.class_node_complex(
									"filelist",
									{"dir": "."},
									this.sources.map(
										function (source : lib_path.class_filepointer) : lib_xml.class_node {
											return (
												new lib_xml.class_node_complex(
													"file",
													{"name": source.as_string("linux")}
												)
											);
										}
									)
								)
							]
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

