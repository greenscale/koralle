
/**
 * @author fenris
 */
type type_taskfactory = (name : string, sub : Array<class_task>, active : boolean, parameters : Object)=>class_task;


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
class class_taskparameter<type_raw, type_ready> {
	
	/**
	 * @author fenris
	 */
	protected name : string;
	
	
	/**
	 * @author fenris
	 */
	protected extraction : (raw : type_raw)=>class_maybe<type_ready>;
	
	
	/**
	 * @author fenris
	 */
	protected shape : lib_meta.class_shape;
	
	
	/**
	 * @author fenris
	 */
	protected mandatory : boolean;
		
	
	/**
	 * @author fenris
	 */
	protected default_ : type_raw;
	
	
	/**
	 * @author fenris
	 */
	protected description : string;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"extraction": extraction,
			"shape": shape,
			"mandatory": mandatory = false,
			"default": default_ = null,
			"description": description = null,
		}
		: {
			name : string;
			extraction : (raw : type_raw)=>class_maybe<type_ready>;
			shape : lib_meta.class_shape;
			mandatory ?: boolean;
			default ?: type_raw;
			description ?: string;
		}
	) {
		this.name = name;
		this.extraction = extraction;
		this.shape = shape;
		this.mandatory = mandatory;
		this.default_ = default_;
		this.description = description;
	}
	
	
	/**
	 * @author fenris
	 */
	public toString() : string {
		let str : string = "";
		// name
		{
			str = `${this.name}`;
		}
		// shape
		{
			str = `${str} : ${instance_show(this.shape)}`;
		}
		// mandatory & default
		{
			if (this.mandatory) {
			}
			else {
				str = `[${str} = ${instance_show(this.default_)}]`;
			}
		}
		// description
		{
			str = `${str} -- ${this.description}`;
		}
		return str;
	}
	
}


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
	 * @author fenris
	 */
	// protected parameters : Array<class_taskparameter<any, any>>;
	
	
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
		name : string,
		sub : Array<class_task> = [],
		active : boolean = true,
		_inputs : Array<lib_path.class_filepointer> = [],
		_outputs : Array<lib_path.class_filepointer> = [],
		_actions : Array<class_action> = [],
	) {
		this.identifier = lib_string.generate("task_");
		this.name = ((name != null) ? name : this.identifier);
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
	public identifier_get() : string {
		return this.identifier;
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
		return (
			class_task.get(type)(
				((nameprefix == null) ? `${name}` : `${nameprefix}-${name}`),
				sub.map(rawtask => class_task.create(rawtask, nameprefix)),
				active,
				parameters
			)
		);
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


/**
 * @author fenris
 */
class class_task_new
	extends class_task
{
	
	/**
	 * @author fenris
	 */
	protected parameters : Array<class_taskparameter<any>>;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"active": active = true,
			"sub": sub = [],
			"parameters": parameters,
			"inputs": inputs,
			"outputs": output,
			"actions": actions,
		}
		: {
			name : string,
			sub : Array<class_task> = [],
			active : boolean = true,
			parameters : Array<class_taskparameter<any>>
			_inputs : Array<lib_path.class_filepointer> = [],
			_outputs : Array<lib_path.class_filepointer> = [],
			_actions : Array<class_action> = [],
		}
	) {
		super(
			name,
			active,
			sub,
			inputs,
			outputs,
			actions,
		);
		this.parameters = parameters;
	}
	
	
	/**
	 * @author fenris
	 */
	protected convert(object : {[name : string] : any}) : {[name : string] : any} {
		let result : {[name : string] : any} = {};
		this.parameters.forEach(
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
				let value : any = parameter.extract(raw);
				result[parameter.name] = value;
			}
		);
		return result;
	}
	
}

