
/**
 * @author fenris
 */
class class_action_koralle extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected filepointer_in : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected filepointer_out : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected target : string;
	
	
	/**
	 * @author fenris
	 */
	protected raw : boolean;
	
	
	/**
	 * @author fenris
	 */
	public constructor(filepointer_in : lib_path.class_filepointer, filepointer_out : lib_path.class_filepointer, target : string, raw : boolean) {
		super();
		this.filepointer_in = filepointer_in;
		this.filepointer_out = filepointer_out;
		this.target = target;
		this.raw = raw;
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
						let parts : Array<string> = [];
						parts.push("koralle");
						parts.push(`--output=${this.target}`);
						parts.push(`--system=${configuration["system"]}`);
						if (this.raw) parts.push("--raw");
						parts.push(this.filepointer_in.as_string(configuration["system"]));
						parts.push(`--file=${this.filepointer_out.as_string(configuration["system"])}`);
						// parts.push(`> ${this.filepointer_out.as_string(configuration["system"])}`);
						return (parts.join(" "));
						// break;
					}
					default: {
						throw (new Error("not implemented"));
						// break;
					}
				}
				break;
			}
			case "ant": {
				switch (configuration["system"]) {
					case "unix": {
						return (
							new lib_ant.class_action(
								new lib_xml.class_node_complex(
									"exec",
									{
										"executable": "koralle",
										"output": this.filepointer_out.as_string("unix"),
									},
									(
										[]
										.concat(
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--target=" + this.target}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--system=" + configuration["system"]}
												),
											]
										)
										.concat(
											this.raw
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--raw"}
												),
											]
											:
											[]
										)
										.concat(
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": this.filepointer_in.as_string("unix")}
												)
											]
										)
									)
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
										"output": this.filepointer_out.as_string("win"),
									},
									(
										[]
										.concat(
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "/c"}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": "koralle"}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--target=" + this.target}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--system=" + configuration["system"]}
												),
											]
										)
										.concat(
											this.raw
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--raw"}
												),
											]
											:
											[]
										)
										.concat(
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": this.filepointer_in.as_string("unix")}
												)
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
				// break;
			}
		}
	}
	
}

