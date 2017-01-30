
/**
 * @author fenris
 */
class class_message {
	
	/**
	 * @author fenris
	 */
	protected prefix : string;
	
	
	/**
	 * @author fenris
	 */
	protected type : string;
	
	
	/**
	 * @author fenris
	 */
	protected content : string;
	
	
	/**
	 * @author fenris
	 */
	protected depth : int = 0;
	
	
	/**
	 * @author fenris
	 */
	protected linebreak : boolean;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		content : string,
		parameters : {
			prefix ?: string;
			type ?: string;
			depth ?: int;
			linebreak ?: boolean;
		} = {}
	) {
		this.content = content;
		this.type = lib_object.fetch<string>(parameters, "type", null, 0);
		this.depth = lib_object.fetch<int>(parameters, "depth", 0, 0);
		this.prefix = lib_object.fetch<string>(parameters, "prefix", null, 0);
		this.linebreak = lib_object.fetch<boolean>(parameters, "linebreak", false, 0);
	}
	
	
	/**
	 * @author fenris
	 */
	public generate(with_type : boolean = true) : string {
		let output : string = "";
		if (with_type) {
			if (this.type != null) {
				output += ("[" + this.type + "]" + " ");
			}
		}
		if (this.prefix != null) {
			output += ("<" + this.prefix + ">" + " ");
		}
		output += lib_string.repeat("\t", this.depth);
		output += this.content;
		if (this.linebreak) {
			output += "\n";
		}
		return output;
	}
	
	
	/**
	 * @author fenris
	 */
	public stdout() : void {
		console.log(this.generate(true));
	}
	
	
	/**
	 * @author fenris
	 */
	public stderr() : void {
		console.error(this.generate(true));
	}
	
	
	/**
	 * @author fenris
	 */
	public console() : void {
		switch (this.type) {
			case "log": {
				console.log(this.generate(false));
				break;
			}
			case "information": {
				console.info(this.generate(false));
				break;
			}
			case "warning": {
				console.warn(this.generate(false));
				break;
			}
			case "error": {
				console.error(this.generate(false));
				break;
			}
			default: {
				throw (new Error("unhandled type '" + this.type + "'"));
			}
		}
	}
	
}

