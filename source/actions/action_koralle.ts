
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
	protected output : string;
	
	
	/**
	 * @author fenris
	 */
	protected raw : boolean;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"filepointer_in": filepointer_in,
			"filepointer_out": filepointer_out,
			"output": output,
			"raw": raw,
		} : {
			filepointer_in : lib_path.class_filepointer;
			filepointer_out : lib_path.class_filepointer;
			output : string;
			raw : boolean;
		}
	) {
		super();
		this.filepointer_in = filepointer_in;
		this.filepointer_out = filepointer_out;
		this.output = output;
		this.raw = raw;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into an output-piece
	 * @author fenris
	 */
	public compilation(output_identifier : string) : any {
		switch (output_identifier) {
			case "gnumake": {
				switch (configuration.system) {
					case "unix":
					case "win": {
						let parts : Array<string> = [];
						if (configuration.invocation.interpreter != null) {
							parts.push(configuration.invocation.interpreter);
						}
						parts.push(configuration.invocation.path);
						parts.push(`--output=${this.output}`);
						parts.push(`--system=${configuration.system}`);
						if (this.raw) {
							parts.push("--raw");
						}
						parts.push(this.filepointer_in.as_string(configuration.system));
						parts.push(`--file=${this.filepointer_out.as_string(configuration.system)}`);
						return (parts.join(" "));
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
				switch (configuration.system) {
					case "unix":
					case "win": {
						let args : Array<string> = [];
						args.push(configuration.invocation.path);
						args.push(`--output=${this.output}`);
						args.push(`--system=${configuration.system}`);
						if (this.raw) {
							args.push(`--raw`);
						}
						args.push(this.filepointer_in.as_string("unix"));
						args.push(`--file=${this.filepointer_out.as_string(configuration.system)}`);
						return (
							lib_ant.class_action.macro_exec(
								{
									"executable": configuration.invocation.interpreter,
									"args": args,
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
			default: {
				throw (new Error(`unhandled output '${output_identifier}'`));
				break;
			}
		}
	}
	
}

