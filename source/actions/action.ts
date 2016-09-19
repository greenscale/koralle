/**
 * @author fenris
 */
class class_action {
	
	/**
	 * @author fenris
	 */
	public constructor() {
	}
	
}


/**
 * @author fenris
 */
abstract class class_action_adhoc extends class_action {
	
	/**
	 * @author fenris
	 */
	public constructor() {
		super();
	}
	
	
	/**
	 * @desc for defining directly how the action is to be converted into a target-piece
	 * @author fenris
	 */
	public abstract compilation(target_identifier : string) : any /*{
		switch (target_identifier) {
			case "gnumake": {
				break;
			}
			case "ant": {
				break;
			}
			default: {
				throw (new Error("unhandled target '" + target_identifier + "'"));
				break;
			}
		}
	}
	 */
	;

}

