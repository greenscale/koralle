
/**
 * @author fenris
 */
class class_task_group extends class_task {
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"sub": sub,
			"active": active,
			"parameters": {
			},
		} : {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			parameters ?: {
			};
		}
	) {
		super(
			name, sub, active,
			[],
			[],
			[]
		);
	}
	
}

class_task.register(
	"group",
	(name, sub, active, parameters) => new class_task_group(
		{
			"name": name, "sub": sub, "active": active,
			"parameters": parameters,
		}
	)
);

