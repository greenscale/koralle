
/**
 * @author fenris
 */
abstract class class_target_regular<type_result> extends class_target {
	
	/**
	 * @author fenris
	 */
	protected identifier : string;
	
	
	/**
	 * @author fenris
	 */
	public constructor(identifier : string) {
		super();
		this.identifier = identifier;
	}
	
	
	/**
	 * @author fenris
	 */
	protected compile_action(action : class_action) : type_result {
		if (action instanceof class_action_adhoc) {
			let action_ : class_action_adhoc = <class_action_adhoc>(action);
			return (<type_result>(action_.compilation(this.identifier)));
		}
		else {
			throw (new Error("no delegation for action '" + JSON.stringify(action) + "'"));
		}
	}
	
}

