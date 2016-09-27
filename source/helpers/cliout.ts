
///<reference path="../../../plankton/string/build/logic.d.ts"/>


/**
 * @author fenris
 */
class class_cliout {
	
	/**
	 * @author fenris
	 */
	public static stdout(content : string, depth : int = 0) : void {
		console.log(lib_string.repeat("\t", depth) + content);
	}
	
	
	/**
	 * @author fenris
	 */
	public static stderr(content : string, depth : int = 0) : void {
		console.error(lib_string.repeat("\t", depth) + content);
	}
	
	
	/**
	 * @author fenris
	 */
	public static log(content : string, depth : int = 0) : void {
		this.stderr("-- " + content, depth);
	}
	
	
	/**
	 * @author fenris
	 */
	public static info(content : string, depth : int = 0) : void {
		this.stderr(">> " + content, depth);
	}
	
	
	/**
	 * @author fenris
	 */
	public static warn(content : string, depth : int = 0) : void {
		this.stderr(">> " + content, depth);
	}
	
	
	/**
	 * @author fenris
	 */
	public static error(content : string, depth : int = 0) : void {
		this.stderr(">> " + content, depth);
	}
	
}

