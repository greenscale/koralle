
module lib_markdown {
	
	/**
	 * @author fenris
	 */
	export function italic(content : string) : string {
		return ("_" + content + "_");
	}
	
	
	/**
	 * @author fenris
	 */
	export function bold(content : string) : string {
		return ("__" + content + "__");
	}
	
	
	/**
	 * @author fenris
	 */
	export function code(content : string) : string {
		return ("`" + content + "`");
	}
	
	
	/**
	 * @author fenris
	 */
	export function section(level : int, title : string) : string {
		return ("#".repeat(level) + " " + title + "\n");
	}
	
	
	/**
	 * @author fenris
	 */
	export function paragraph(content : string = "") : string {
		return (content + "\n");
	}
	
	
	/**
	 * @author fenris
	 */
	export function listitem(level : int, content : string) : string {
		return ("    ".repeat(level-1) + "* " + content + "\n");
	}
	
}

