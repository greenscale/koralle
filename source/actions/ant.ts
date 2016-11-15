
///<reference path="../../../plankton/object/build/logic.d.ts"/>


/**
 * @author fenris
 */
class class_action_ant extends class_action_build {
	
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
					case "unix": {
						// cmd_cd1
						let cmd_cd1 : string;
						{
							let parts : Array<string> = [];
							parts.push("cd");
							parts.push(this.workdir.toString());
							cmd_cd1 = parts.join(" ");
						}
						// cmd_cd2
						let cmd_cd2 : string;
						{
							let parts : Array<string> = [];
							parts.push("cd");
							parts.push("-");
							cmd_cd2 = parts.join(" ") + " > /dev/null";
						}
						// cmd_ant
						let cmd_ant : string;
						{
							let parts : Array<string> = [];
							parts.push("ant");
							parts.push(this.filepointer.toString());
							cmd_ant = parts.join(" ");
						}
						return ((this.workdir == null) ? [cmd_ant] : [cmd_cd1, cmd_ant, cmd_cd2]).join(" && ");
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
							"ant",
							{
								"antfile": this.filepointer.toString(),
							}
						)
						:
						new lib_xml.class_node_complex(
							"ant",
							{
								"antfile": this.filepointer.toString(),
								"dir": this.workdir.toString(),
							}
						)
					)
				);
				break;
			}
			default: {
				throw (new Error(`unhandled target '${target_identifier}'`));
				break;
			}
		}
	}
	
}

