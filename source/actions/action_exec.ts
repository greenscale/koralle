
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
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				switch (configuration["system"]) {
					case "unix":
					case "win": {
						let command : string = "";
						{
							let parts : Array<string> = [];
							if (this.path_interpreter != null) parts.push(this.path_interpreter.as_string(configuration["system"]));
							parts.push(this.path_script.as_string(configuration["system"]));
							parts.push(this.paths_input.map(filepointer => filepointer.as_string(configuration["system"])).join(","));
							parts.push(this.paths_output.map(filepointer => filepointer.as_string(configuration["system"])).join(","));
							command = parts.join(" ");
						}
						{
							if (this.workdir != null) {
								command = `pushd ${this.workdir.as_string(configuration.system)} && ${command} ; popd`
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
				switch (configuration["system"]) {
					case "unix": {
						if (this.path_interpreter == null) {
							return (
								new lib_ant.class_action(
									new lib_xml.class_node_complex(
										"exec",
										{"executable": this.path_script.as_string("unix")},
										[
											new lib_xml.class_node_complex(
												"arg",
												{"value": "'" + this.paths_input.map(filepointer => filepointer.as_string("unix")).join(",") + "'"}
											),
											new lib_xml.class_node_complex(
												"arg",
												{"value": "'" + this.paths_output.map(filepointer => filepointer.as_string("unix")).join(",") + "'"}
											),
										]
									)
								)
							)
						}
						else {
							return (
								new lib_ant.class_action(
									new lib_xml.class_node_complex(
										"exec",
										{"executable": this.path_interpreter.as_string("unix")},
										[
											new lib_xml.class_node_complex(
												"arg",
												{"value": this.path_script.as_string("unix")}
											),
											new lib_xml.class_node_complex(
												"arg",
												{"value": "'" + this.paths_input.map(filepointer => filepointer.as_string("unix")).join(",") + "'"}
											),
											new lib_xml.class_node_complex(
												"arg",
												{"value": "'" + this.paths_output.map(filepointer => filepointer.as_string("unix")).join(",") + "'"}
											),
										]
									)
								)
							);
						}
						// break;
					}
					case "win": {
						return (
							new lib_ant.class_action(
								new lib_xml.class_node_complex(
									"exec",
									{"executable": "cmd"},
									(
										[]
										.concat(
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "/c"}
												),
											]
										)
										.concat(
											(this.path_interpreter != null)
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": this.path_interpreter.as_string("win")}
												),
											]
											:
											[]
										)
										.concat(
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": this.path_script.as_string("win")}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": "'" + this.paths_input.map(filepointer => filepointer.as_string("win")).join(",") + "'"}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": "'" + this.paths_output.map(filepointer => filepointer.as_string("win")).join(",") + "'"}
												),
											]
										)
									)
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

