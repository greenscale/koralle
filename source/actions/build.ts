
/**
 * @author fenris
 */
abstract class class_action_build extends class_action {
	
	/**
	 * @author fenris
	 */
	protected filepointer : lib_path.class_filepointer;
	
	
	/**
	 * @author fenris
	 */
	protected workdir : lib_path.class_location;
	
	
	/**
	 * @author fenris
	 */
	public constructor(filepointer : lib_path.class_filepointer, workdir : lib_path.class_location) {
		super();
		this.filepointer = filepointer;
		this.workdir = workdir;
	}
	
}

