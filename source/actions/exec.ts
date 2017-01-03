
/**
 * @author fenris
 */
class class_action_exec extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected paths_input : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected paths_output : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected path_script : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected path_interpreter : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected workdir : lib_path.class_location;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"inputs": inputs,
			"outputs": outputs,
			"path": path,
			"interpreter": interpreter,
			"workdir": workdir,
		} : {
			inputs : Array<lib_path.class_filepointer>;
			outputs : Array<lib_path.class_filepointer>;
			path : lib_path.class_filepointer;
			interpreter : lib_path.class_filepointer;
			workdir : lib_path.class_location;
		}
	) {
		super();
		this.paths_input = inputs;
		this.paths_output = outputs;
		this.path_script = path;
		this.path_interpreter = interpreter;
		this.workdir = workdir;
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
						let command : string = "";
						{
							command = lib_gnumake.macro_command(
								{
									"interpreter": ((this.path_interpreter != null) ? this.path_interpreter.as_string(configuration.system) : null),
									"path": this.path_script.as_string(configuration.system),
									"args": [
										("'" + this.paths_input.map(filepointer => filepointer.as_string(configuration.system)).join(",") + "'"),
										("'" + this.paths_output.map(filepointer => filepointer.as_string(configuration.system)).join(",") + "'"),
									],
									"system": configuration.system,
								}
							)
						}
						{
							if (this.workdir != null) {
								// command = `pushd ${this.workdir.as_string(configuration.system)} && ${command} ; popd`
								command = `cd ${this.workdir.as_string(configuration.system)} && ${command} ; cd -`
							}
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
					lib_ant.class_action.macro_exec(
						{
							"interpreter": ((this.path_interpreter != null) ? this.path_interpreter.as_string(configuration.system) : null),
							"path": this.path_script.as_string("linux"),
							"args": [
								("'" + this.paths_input.map(filepointer => filepointer.as_string("linux")).join(",") + "'"),
								("'" + this.paths_output.map(filepointer => filepointer.as_string("linux")).join(",") + "'"),
							],
							"system": configuration.system,
						}
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

