
/**
 * @author fenris
 */
class class_action_tsc extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected paths_input : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected path_output : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected target : string;
	
	
	/**
	 * @author fenris
	 */
	protected allowUnreachableCode : boolean;
	
	
	/**
	 * @author fenris
	 */
	protected declaration : string;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		paths_input : Array<lib_path.class_filepointer>,
		path_output : lib_path.class_filepointer,
		target : string,
		allowUnreachableCode : boolean,
		declaration : string
	) {
		super();
		this.paths_input = paths_input;
		this.path_output = path_output;
		this.target = target;
		this.allowUnreachableCode = allowUnreachableCode;
		this.declaration = declaration;
	}
	
	
	/**
	 * @author fenris
	 * @todo handle declarion-path
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				switch (configuration["system"]) {
					case "unix":
					case "win": {
						let parts : Array<string> = [];
						parts.push("tsc");
						if (this.allowUnreachableCode) parts.push("--allowUnreachableCode");
						if (this.declaration != null) parts.push("--declaration");
						if (this.target != null) parts.push("--target"); parts.push(this.target);
						this.paths_input.forEach(filepointer => parts.push(filepointer.toString()));
						parts.push("--outFile"); parts.push(this.path_output.toString());
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
				switch (configuration["system"]) {
					case "unix": {
						return (
							new lib_ant.class_action(
								new lib_xml.class_node_complex(
									"exec",
									{"executable": "tsc"},
									(
										[]
										.concat(
											this.paths_input.map(
												function (filepointer : lib_path.class_filepointer) : lib_xml.class_node {
													return (
														new lib_xml.class_node_complex(
															"arg",
															{"value": filepointer.toString()}
														)
													);
												}
											)
										)
										.concat(
											this.allowUnreachableCode
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--allowUnreachableCode"}
												),
											]
											:
											[
											]
										)
										.concat(
											(this.declaration != null)
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--declaration"}
												),
											]
											:
											[
											]
										)
										.concat(
											(this.target != null)
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--target"}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": this.target}
												),
											]
											:
											[
											]
										)
										.concat(
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--outFile"}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": this.path_output.toString()}
												),
											]
										)
									)
								)
							)
						);
						break;
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
												new lib_xml.class_node_complex(
													"arg",
													{"value": "tsc"}
												),
											]
										)
										.concat(
											this.paths_input.map(
												function (filepointer : lib_path.class_filepointer) : lib_xml.class_node {
													return (
														new lib_xml.class_node_complex(
															"arg",
															{"value": filepointer.toString()}
														)
													);
												}
											)
										)
										.concat(
											this.allowUnreachableCode
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--allowUnreachableCode"}
												),
											]
											:
											[
											]
										)
										.concat(
											this.declaration
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--declaration"}
												),
											]
											:
											[
											]
										)
										.concat(
											(this.target != null)
											?
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--target"}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": this.target}
												),
											]
											:
											[
											]
										)
										.concat(
											[
												new lib_xml.class_node_complex(
													"arg",
													{"value": "--outFile"}
												),
												new lib_xml.class_node_complex(
													"arg",
													{"value": this.path_output.toString()}
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
				// break;
			}
		}
	}
	
}

