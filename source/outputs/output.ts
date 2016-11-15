
/**
 * @author fenris
 */
abstract class class_target {
	
	/**
	 * @author fenris
	 */
	public constructor() {
	}
	
	
	/**
	 * @author fenris
	 */
	public abstract tempfolder() : string;
	
	
	/**
	 * @author fenris
	 */
	// public abstract compile_action(action : class_action) : type_result;
	
	
	/**
	 * @author fenris
	 */
	// public abstract compile_task(task : class_task) : Array<type_result>;
	
	
	/**
	 * @author fenris
	 */
	// public abstract compile_project(project : class_project) : type_result;
	
	
	/**
	 * @author fenris
	 */
	public abstract compile_project_string(project : class_project, without_dependencies ?: boolean) : string;
	
	
	/**
	 * @author fenris
	 */
	public abstract execute(filepointer : lib_path.class_filepointer, workdir ?: string) : lib_call.type_executor<void, Error>;
	
}

