
/**
 * @author fenris
 */
class class_task_group extends class_task {
	
	/**
	 * @author fenris
	 */
	public static create(name : string, sub : Array<class_task>, active : boolean, parameters : Object) : class_task_group {
		return (
			new class_task_group(
				name, sub, active
			)
		);
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return [];
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public outputs() : Array<lib_path.class_filepointer> {
		return [];
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		return [
		];
	}
	
}

class_task.register("group", /*(name, sub, active, parameters) => */class_task_group.create/*(name, sub, active, parameters)*/);

