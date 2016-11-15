
///<reference path="../../../plankton/object/build/logic.d.ts"/>


/**
 * @author fenris
 */
class class_action_gnumake extends class_action_build {
	
	/**
	 * @author fenris
	 */
	public constructor(filepointer : lib_path.class_filepointer, workdir : lib_path.class_location) {
		super(filepointer, workdir);
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
						// cmd_cd1
						let cmd_cd1 : string;
						{
							let parts : Array<string> = [];
							parts.push("pushd");
							parts.push(this.workdir.as_string(configuration["system"]));
							if (configuration["system"] == "unix") {
								parts.push("> /dev/null");
							}
							cmd_cd1 = parts.join(" ");
						}
						// cmd_cd2
						let cmd_cd2 : string;
						{
							let parts : Array<string> = [];
							parts.push("popd");
							if (configuration["system"] == "unix") {
								parts.push("> /dev/null");
							}
							cmd_cd2 = parts.join(" ");
						}
						// cmd_make
						let cmd_make : string;
						{
							let parts : Array<string> = [];
							parts.push("make");
							parts.push("--no-print-directory");
							parts.push("--directory=" + this.workdir.as_string(configuration["system"]));
							parts.push("--file=" + this.filepointer.as_string(configuration["system"]));
							cmd_make = parts.join(" ");
						}
						// return ((this.workdir == null) ? [cmd_make] : [cmd_cd1, cmd_make, cmd_cd2]).join(" && ");
						return [cmd_make];
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
				return (
					new lib_ant.class_action(
						(this.workdir == null)
						?
						new lib_xml.class_node_complex(
							"exec",
							{
								"executable": "make",
							},
							[
								new lib_xml.class_node_complex(
									"arg",
									{"value": "--no-print-directory"}
								),
								new lib_xml.class_node_complex(
									"arg",
									{"value": "--file=" + this.filepointer.as_string("unix")}
								),
							]
						)
						:
						new lib_xml.class_node_complex(
							"exec",
							{
								"executable": "make",
								"dir": this.workdir.as_string("unix"),
							},
							[
								new lib_xml.class_node_complex(
									"arg",
									{"value": "--no-print-directory"}
								),
								new lib_xml.class_node_complex(
									"arg",
									{"value": "--file=" + this.filepointer.as_string("unix")}
								),
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

