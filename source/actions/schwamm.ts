
/**
 * @author fenris
 */
class class_action_schwamm extends class_action_adhoc {
	
	/**
	 * @author fenris
	 */
	protected includes : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @author fenris
	 */
	protected inputs : {[domain : string] : Array<lib_path.class_filepointer>};
	
	
	/**
	 * @author fenris
	 */
	protected save : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected dump_group : string;
	
	
	/**
	 * @author fenris
	 */
	protected dump_filepointer : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected locmerge_domain : string;
	
	
	/**
	 * @author fenris
	 */
	protected locmerge_identifier : string;
	
	
	/**
	 * @author fenris
	 */
	protected locmerge_filepointer : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		includes : Array<lib_path.class_filepointer>,
		inputs : {[domain : string] : Array<lib_path.class_filepointer>},
		save : lib_path.class_filepointer,
		dump_group : string = null,
		dump_filepointer : lib_path.class_filepointer = null,
		locmerge_domain : string = null,
		locmerge_identifier : string = null,
		locmerge_filepointer : lib_path.class_filepointer = null
	) {
		super();
		this.includes = includes;
		this.inputs = inputs;
		this.save = save;
		this.dump_group = dump_group;
		this.dump_filepointer = dump_filepointer;
		this.locmerge_domain = locmerge_domain;
		this.locmerge_identifier = locmerge_identifier;
		this.locmerge_filepointer = locmerge_filepointer;
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public compilation(target_identifier : string) : any {
		let args : Array<string> = [];
		this.includes.forEach(
			include => {
				args.push(`--include=${include.as_string(globalvars.configuration["system"])}`);
			}
		);
		lib_object.to_array(this.inputs).forEach(
			pair => {
				pair.value.forEach(
					member => {
						let filepointer : lib_path.class_filepointer = /*lib_path.filepointer_read(globalvars.configuration["path"]).foo(member)*/member;
						args.push(`--input=${filepointer.as_string(globalvars.configuration["system"])}:${pair.key}`);
					}
				);
			}
		);
		// args.push(`--file=${this.output.as_string(globalvars.configuration["system"])}`);
		// args.push(`--dir=${((this.dir != null) ? this.dir : this.output.location).as_string("system")}`);
		let target : lib_path.class_filepointer;
		if (this.save != undefined) {
			args.push(`--output=native`);
			target = this.save;
		}
		else if (this.dump_group != null) {
			args.push(`--output=dump:${this.dump_group}`);
			target = this.dump_filepointer;
		}
		else if (this.locmerge_domain != null) {
			args.push(`--output=locmerge:${this.locmerge_domain}:${this.locmerge_identifier}`);
			target = this.locmerge_filepointer;
		}
		else {
			console.warn("output missing?");
		}
		let cmdparams : type_cmdparams = {
			"path": "schwamm",
			"args": args,
			"output": target.as_string(globalvars.configuration["system"]),
		};
		switch (target_identifier) {
			case "gnumake": {
				return lib_gnumake.macro_command(cmdparams);
				break;
			}
			case "ant": {
				return lib_ant.class_action.macro_command(cmdparams);
				break;
			}
			default: {
				throw (new Error(`unhandled target '${target_identifier}'`));
				break;
			}
		}
	}
	
}

