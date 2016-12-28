
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
	public compilation(output_identifier : string) : any {
		switch (output_identifier) {
			case "gnumake": {
				switch (configuration.system) {
					case "linux":
					case "bsd":
					case "win": {
						return (
							lib_gnumake.macro_command(
								{
									"path": "make",
									"args": {
										"linux": [
											"--no-print-directory",
											"--directory=" + this.workdir.as_string(configuration.system),
											"--file=" + this.filepointer.as_string(configuration.system),
										],
										"bsd": [
											"-C " + this.workdir.as_string(configuration.system),
											"-f " + this.filepointer.as_string(configuration.system),
										],
										"win": [
											"-C " + this.workdir.as_string(configuration.system),
											"-f " + this.filepointer.as_string(configuration.system),
										],
									}[configuration.system],
								}
							)
						);
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
							"path": "make",
							"args": {
								"linux": [
									"--no-print-directory",
									"--directory=" + this.workdir.as_string(configuration.system),
									"--file=" + this.filepointer.as_string(configuration.system),
								],
								"bsd": [
									"-C " + this.workdir.as_string(configuration.system),
									"-f " + this.filepointer.as_string(configuration.system),
								],
								"win": [
									"-C " + this.workdir.as_string(configuration.system),
									"-f " + this.filepointer.as_string(configuration.system),
								],
							}[configuration.system],
						}
					)
				);
				break;
			}
			default: {
				throw (new Error("unhandled target '" + output_identifier + "'"));
				break;
			}
		}
	}
	
}

