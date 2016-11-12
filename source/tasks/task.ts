	
/**
 * @author fenris
 */
type type_taskfactory = (name : string, sub : Array<class_task>, active : boolean, parameters : Object)=>class_task;


/**
 * @author fenris
 */
abstract class class_task {
	
	/**
	 * @desc a unique identifier for the task; sometimes used as a fallback-value
	 * @author fenris
	 */
	protected identifier : string;
	
	
	/**
	 * @desc a string identifiyng the task (so it should be unique, but it is given by the user); used for addressing tasks (e.g. "make foobar")
	 * @author fenris
	 */
	protected name : string;
	
	
	/**
	 * @desc a list of subtasks which are executed first
	 * @author fenris
	 */
	protected sub : Array<class_task>;
	
	
	/**
	 * @desc whether the task is activated (i.e. will be executed)
	 * @author fenris
	 */
	protected active : boolean;
	
	
	/**
	 * @desc a list of paths which represent input-files of the task
	 * @author fenris
	 */
	protected _inputs : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @desc a list of paths which represent output-files of the task
	 * @author fenris
	 */
	protected _outputs : Array<lib_path.class_filepointer>;
	
	
	/**
	 * @desc generates all actions which have to be executed in order to fulfil the task
	 * @author fenris
	 */
	protected _actions : Array<class_action>;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		name : string,
		sub : Array<class_task> = [],
		active : boolean = true,
		_inputs : Array<lib_path.class_filepointer> = [],
		_outputs : Array<lib_path.class_filepointer> = [],
		_actions : Array<class_action> = []
	) {
		this.identifier = genid("task_");
		this.name = ((name != null) ? name : this.identifier);
		this.sub = sub;
		this.active = active;
		this._inputs = _inputs;
		this._outputs = _outputs;
		this._actions = _actions;
	}
	
	
	/**
	 * @author fenris
	 */
	public identifier_get() : string {
		return this.identifier;
	}
	
	
	/**
	 * @author fenris
	 */
	public name_get() : string {
		return this.name;
	}
	
	
	/**
	 * @author fenris
	 */
	public sub_get() : Array<class_task> {
		return this.sub;
	}
	
	
	/**
	 * @author fenris
	 */
	public active_get() : boolean {
		return this.active;
	}
	
	
	/**
	 * @returns the subgraph of all active tasks
	 * @author fenris
	 */
	public clean(root : boolean = true) : void {
		if (root && (! this.active)) {
			throw (new Error("cant't clean inactive root"));
		}
		else {
			this.sub = this.sub.filter(task_ => task_.active);
			this.sub.forEach(task_ => task_.clean(false));
		}
	}
	
	
	/**
	 * @desc a list of paths which represent input-files of the task
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return this._inputs;
	}
	
	
	/**
	 * @desc a list of paths which represent output-files of the task
	 * @author fenris
	 */
	public outputs() : Array<lib_path.class_filepointer> {
		return this._outputs;
	}
	
	
	/**
	 * @desc generates all actions which have to be executed in order to fulfil the task
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		return this._actions;
	}
	
	
	/**
	 * @author fenris
	 */
	protected static pool : {[id : string] : type_taskfactory} = {};
	
	
	/**
	 * @author fenris
	 */
	public static register(id : string, factory : type_taskfactory) : void {
		this.pool[id] = factory;
	}
	
	
	/**
	 * @author fenris
	 */
	public static get(id : string) : type_taskfactory {
		if (id in this.pool) {
			return this.pool[id];
		}
		else {
			throw (new Error(`no task registered with id '${id}'`));
		}
	}
	
	
	/**
	 * @author fenris
	 */
	public static list() : Array<string> {
		return Object.keys(this.pool);
	}
	
	
	/**
	 * @author fenris
	 */
	protected static errormessage_mandatoryparamater(type : string, name : string, fieldname : string) : string {
		return `mandatory paramater '${fieldname}' missing in ${type}-task '${name}'`;
	}
	
}

