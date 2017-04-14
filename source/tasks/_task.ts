
/**
 * @author fenris
 */
type type_rawtask = {
	type ?: string;
	name ?: string;
	active ?: boolean;
	parameters ?: Object;
	sub ?: Array<type_rawtask>;
};


/**
 * @author fenris
 */
type type_taskparameter<type_raw, type_ready> = {
	name : string;
	extraction : (raw : type_raw)=>class_maybe<type_ready>;
	shape : lib_meta.class_shape;
	mandatory ?: boolean;
	default ?: type_raw;
	description ?: string;
};

	
/**
 * @author fenris
 */
function taskparameter_toString(taskparameter : type_taskparameter<any, any>) : string {
	let str : string = "";
	// name
	{
		str = `${taskparameter.name}`;
	}
	// shape
	{
		str = `${str} : ${instance_show(taskparameter.shape)}`;
	}
	// mandatory & default
	{
		if (taskparameter.mandatory) {
		}
		else {
			str = `[${str} = ${instance_show(taskparameter.default)}]`;
		}
	}
	// description
	{
		str = `${str} -- ${taskparameter.description}`;
	}
	return str;
}


/**
 * @author fenris
 */
type type_tasktemplate = {
	parameters : Array<type_taskparameter<any, any>>;
	inputs : (data : {[name : string] : any})=>Array<lib_path.class_filepointer>;
	outputs : (data : {[name : string] : any})=>Array<lib_path.class_filepointer>;
	actions : (data : {[name : string] : any})=>Array<class_action>;
}


/**
 * @author fenris
 */
class class_task {
	
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
	public context : lib_path.class_location;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name = null,
			"sub": sub = [],
			"active": active = true,
			"inputs": _inputs = [],
			"outputs": _outputs = [],
			"actions": _actions = [],
		}
		: {
			name ?: string;
			sub ?: Array<class_task>;
			active ?: boolean;
			inputs ?: Array<lib_path.class_filepointer>;
			outputs ?: Array<lib_path.class_filepointer>;
			actions ?: Array<class_action>;
		}
	) {
		this.name = name;
		this.sub = sub;
		this.active = active;
		this._inputs = _inputs;
		this._outputs = _outputs;
		this._actions = _actions;
		this.context = null;
	}
	
	
	/**
	 * @desc [accessor] [getter]
	 * @author fenris
	 */
	public name_get() : string {
		return this.name;
	}
	
	
	/**
	 * @desc [accessor] [getter]
	 * @author fenris
	 */
	public sub_get() : Array<class_task> {
		return this.sub;
	}
	
	
	/**
	 * @desc [accessor] [getter]
	 * @author fenris
	 */
	public active_get() : boolean {
		return this.active;
	}
	
	
	/**
	 * @desc [mutator] [setter]
	 * @author fenris
	 */
	public context_set(context : lib_path.class_location) : void {
		this.context = context;
	}
	
	
	/**
	 * @desc [accessor] [getter]
	 * @author fenris
	 */
	public context_get() : lib_path.class_location {
		return this.context;
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
	 * @desc [accessor] [getter]
	 * @author fenris
	 */
	protected values(raw : Object) : Object {
		return null;
	}
	
	
	/**
	 * @desc [accessor] [getter] a list of paths which represent input-files of the task
	 * @author fenris
	 */
	public inputs() : Array<lib_path.class_filepointer> {
		return this._inputs;
	}
	
	
	/**
	 * @desc [accessor] [getter] a list of paths which represent output-files of the task
	 * @author fenris
	 */
	public outputs() : Array<lib_path.class_filepointer> {
		return this._outputs;
	}
	
	
	/**
	 * @desc [accessor] [getter] generates all actions which have to be executed in order to fulfil the task
	 * @author fenris
	 */
	public actions() : Array<class_action> {
		return this._actions;
	}
	
	
	/**
	 * @author fenris
	 */
	protected static pool : {[id : string] : type_tasktemplate} = {};
	
	
	/**
	 * @author fenris
	 */
	public static register(id : string, tasktemplate : type_tasktemplate) : void {
		this.pool[id] = tasktemplate;
	}
	
	
	/**
	 * @author fenris
	 */
	public static get(id : string) : type_tasktemplate {
		if (id in this.pool) {
			return this.pool[id];
		}
		else {
			throw (new Error(`no task registered with name '${id}'`));
		}
	}
	
	
	/**
	 * @author fenris
	 */
	public static list() : Array<string> {
		return (
			lib_object.to_array(this.pool)
			.map(
				({"key": id, "value": taskfactory}) => {
					return (
						`${id}\n`
						+
						(
							taskfactory.parameters
							.map(
								parameter => taskparameter_toString(parameter)
							)
							.map(
								x => `\t\t* ${x}\n`
							)
							.join("")
						)
						+
						"\n"
					);
				}
			)
		);
	}
	
	
	/**
	 * @author fenris
	 */
	protected static convert(tasktemplate : type_tasktemplate, object : {[name : string] : any}) : {[name : string] : any} {
		let result : {[name : string] : any} = {};
		tasktemplate.parameters.forEach(
			parameter => {
				let raw : any;
				if (parameter.name in object) {
					raw = object[parameter.name];
				}
				else {
					if (parameter.mandatory) {
						throw (new Error(`the mandatory parameter '${parameter.name}' is missing in the task '${this.name}'`));
					}
					else {
						raw = parameter.default;
					}
				}
				let value : any = parameter.extraction(raw);
				result[parameter.name] = value;
			}
		);
		return result;
	}
	
	
	/**
	 * @author fenris
	 */
	public static create(
		{
			"name": name = null,
			"type": type = null,
			"sub": sub = [],
			"active": active = true,
			"parameters": parameters = {},
		} : type_rawtask,
		nameprefix : string = null
	) : class_task {
		let tasktemplate : type_tasktemplate = this.get(type);
		let data : {[name : string] : any} = this.convert(tasktemplate, parameters);
		return (
			new class_task(
				{
					"name": ((nameprefix == null) ? `${name}` : `${nameprefix}-${name}`),
					"active": active,
					"sub": sub.map(rawtask => class_task.create(rawtask, nameprefix)),
					"inputs": tasktemplate.inputs(data),
					"outputs": tasktemplate.outputs(data),
					"actions": tasktemplate.actions(data),
				}
			)
		);
	}
	
}

