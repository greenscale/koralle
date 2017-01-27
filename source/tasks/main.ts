
/**
 * @author fenris
 */
class class_task_main
	extends class_task
{
	
	/**
	 * @author fenris
	 */
	public constructor(
		core : class_task,
		dependencies : Array<class_task>
	) {
		super(
			"__root",
			dependencies.concat([core]),
			true,
			[],
			[],
			[]
		);
	}
	
}

