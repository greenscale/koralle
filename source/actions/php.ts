
/**
 * @author fenris
 */
class class_action_php extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected filepointers_from : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected filepointer_to : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected only_first : boolean;
	
	
	/**
	 * @author fenris
	 */
	protected only_last : boolean;
	
	
	/**
	 * @author fenris
	 */
	public constructor(filepointers_from : Array<lib_path.class_filepointer>, filepointer_to : lib_path.class_filepointer, only_first : boolean, only_last : boolean) {
		super();
		this.filepointers_from = filepointers_from;
		this.filepointer_to = filepointer_to;
		this.only_first = only_first;
		this.only_last = only_last;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		switch (target_identifier) {
			case "gnumake": {
				switch (configuration.system) {
					case "bsd":
					case "linux": {
						let parts : Array<string> = [];
						parts.push("php");
						if (this.only_last) {
							parts.push(this.filepointers_from.slice(-1)[0].toString());
						}
						else {
							if (this.only_first) {
								parts.push(this.filepointers_from[0].toString());
							}
							else {
								this.filepointers_from.forEach(filepointer => parts.push(filepointer.toString()));
							}
						}
						parts.push(">");
						parts.push(this.filepointer_to.toString());
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
				throw (new Error("not implemented"));
				break;
			}
			default: {
				throw (new Error("unhandled target '" + target_identifier + "'"));
				break;
			}
		}
	}
	
}

