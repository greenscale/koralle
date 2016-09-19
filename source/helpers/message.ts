
/**
 * @author fenris
 */
function indentation(depth : int, symbol : string = "\t") : string {
	return ((depth == 0) ? "" : (symbol + indentation(depth-1, symbol)));
}


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
		if (parameters.prefix == undefined) parameters.prefix = null;
		if (parameters.type == undefined) parameters.type = null;
		if (parameters.depth == undefined) parameters.depth = 0;
		if (parameters.linebreak == undefined) parameters.linebreak = false;
		this.content = content;
		this.type = parameters.type;
		this.depth = parameters.depth;
		this.prefix = parameters.prefix;
		this.linebreak = parameters.linebreak;
	}
	
	
	/**
	 * @author fenris
	 */
	public generate(with_type : boolean = true) : string {
		let output : string = "";
		output += indentation(this.depth);
		if (with_type) {
			if (this.type != null) {
				output += ("[" + this.type + "]" + " ");
			}
		}
		if (this.prefix != null) {
			output += ("<" + this.prefix + ">" + " ");
		}
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

