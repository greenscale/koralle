
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
class class_task {
	
	/**
	 * @desc a string identifiyng the task (so it should be unique, but it is given by the user); used for addressing tasks (e.g. "make foobar")
	 * @author fenris
	 */
	protected name : string;
	
	
	/**
	 * @desc whether the task is activated (i.e. will be executed)
	 * @author fenris
	 */
	protected active : boolean;
	
	
	/**
	 * @desc a list of subtasks which are executed first
	 * @author fenris
	 */
	protected sub : Array<class_task>;
	
	
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
			"active": active = true,
			"sub": sub = [],
			"inputs": _inputs = [],
			"outputs": _outputs = [],
			"actions": _actions = [],
		}
		: {
			name ?: string;
			active ?: boolean;
			sub ?: Array<class_task>;
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
	
}


/**
 * @author fenris
 */
class class_taskparameter<type_raw, type_ready> {
	
	/**
	 * @author fenris
	 */
	public name : string;
	
	
	/**
	 * @author fenris
	 */
	public extraction : (raw : type_raw)=>type_ready;
	
	
	/**
	 * @author fenris
	 */
	public shape : lib_meta.class_shape;
	
	
	/**
	 * @author fenris
	 */
	public mandatory : boolean;
	
	
	/**
	 * @author fenris
	 */
	public default_ : type_raw;
	
	
	/**
	 * @author fenris
	 */
	public description : string;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"name": name,
			"extraction": extraction = lib_call.id,
			"shape": shape = lib_meta.from_raw({"id": "any"}),
			"mandatory": mandatory = false,
			"default": default_ = null,
			"description": description = null,
		}
		: {
			name : string;
			extraction ?: (raw : type_raw)=>type_ready;
			shape ?: lib_meta.class_shape;
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
	 * @deprecated
	 * @todo make markdown replacement
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
type type_taskfactory = (data : {[name : string] : any}, rawtask ?: type_rawtask)=>{
	sub ?: Array<class_task>;
	inputs ?: Array<lib_path.class_filepointer>;
	outputs ?: Array<lib_path.class_filepointer>;
	actions ?: Array<class_action>;
};


/**
 * @author fenris
 */
class class_tasktemplate {
	
	/**
	 * @author fenris
	 */
	protected description : string;
	
	
	/**
	 * @author fenris
	 */
	protected parameters : Array<class_taskparameter<any, any>>;
	
	
	/**
	 * @author fenris
	 */
	protected factory : type_taskfactory;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"description": description = null,
			"parameters": parameters = [],
			"factory": factory,
		}
		: {
			description ?: string;
			parameters ?: Array<class_taskparameter<any, any>>;
			factory : type_taskfactory;
		}
	) {
		this.description = description;
		this.parameters = parameters;
		this.factory = factory;
	}
	
	
	/**
	 * @desc converts raw parameter values to real ones
	 * @author fenris
	 */
	protected convert(object_raw : {[name : string] : any}, name ?: string) : {[name : string] : any} {
		let object_ready : {[name : string] : any} = {};
		this.parameters.forEach(
			parameter => {
				let value_raw : any;
				if (parameter.name in object_raw) {
					value_raw = object_raw[parameter.name];
				}
				else {
					if (parameter.mandatory) {
						throw (new Error(`the mandatory parameter '${parameter.name}' is missing in the task description for task '${name}'`));
					}
					else {
						value_raw = parameter.default_;
					}
				}
				let messages : Array<string> = parameter.shape.inspect(value_raw);
				if (messages.length > 0) {
					throw (new Error(`given value '${instance_show(value_raw)}' for parameter '${parameter.name}' with shape '${instance_show(parameter.shape)}' is malformed: ${messages.join("; ")}`));
				}
				else {
					let value_ready : any = parameter.extraction(value_raw);
					object_ready[parameter.name] = value_ready;
				}
			}
		);
		return object_ready;
	}
	
	
	/**
	 * @author fenris
	 */
	protected create(
		rawtask : type_rawtask,
		nameprefix : string = null
	) : class_task {
		let data : {[name : string] : any} = this.convert(rawtask.parameters, rawtask.name);
		let stuff : any = this.factory(data, rawtask);
		let sub : Array<class_task> = (stuff["sub"] || []);
		let inputs : Array<lib_path.class_filepointer> = (stuff["inputs"] || []);
		let outputs : Array<lib_path.class_filepointer> = (stuff["outputs"] || []);
		let actions : Array<class_action> = (stuff["actions"] || []);
		return (
			new class_task(
				{
					"name": ((nameprefix == null) ? `${rawtask.name}` : `${nameprefix}-${rawtask.name}`),
					"active": rawtask.active,
					"sub": (rawtask.sub || []).map(rawtask_ => class_tasktemplate.create(rawtask_, nameprefix)).concat(sub),
					"inputs": inputs,
					"outputs": outputs,
					"actions": actions,
				}
			)
		);
	}
	
	
	/**
	 * @author fenris
	 */
	protected static pool : {[id : string] : class_tasktemplate} = {};
	
	
	/**
	 * @author fenris
	 */
	public static register(id : string, tasktemplate : class_tasktemplate) : void {
		this.pool[id] = tasktemplate;
	}
	
	
	/**
	 * @author fenris
	 */
	public static get(id : string) : class_tasktemplate {
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
	public static create(
		rawtask : type_rawtask,
		nameprefix : string = null
	) : class_task {
		let tasktemplate : class_tasktemplate = this.get(rawtask.type);
		return tasktemplate.create(rawtask, nameprefix);
	}
	
	
	/**
	 * @desc returns an overview over all available tasktemplates in markdown format
	 * @author fenris
	 */
	public static list() : string {
		let str : string = "";
		lib_object.to_array(this.pool).forEach(
			({"key": id, "value": tasktemplate}) => {
				str += lib_markdown.section(2, id);
				{
					str += lib_markdown.section(3, "Description");
					str += lib_markdown.paragraph(((tasktemplate.description != null) ? tasktemplate.description : "(missing)"));
					str += lib_markdown.paragraph();
				}
				{
					str += lib_markdown.section(3, "Parameters");
					tasktemplate.parameters.forEach(
						taskparameter => {
							let str_ : string = "";
							{
								// name
								{
									str_ += lib_markdown.paragraph(lib_markdown.code(taskparameter.name));
								}
								// shape
								{
									str_ += lib_markdown.listitem(2, "type: " + lib_markdown.italic(instance_show(taskparameter.shape)));
								}
								// kind
								{
									let content : string;
									if (taskparameter.mandatory) {
										content = "mandatory";
									}
									else {
										content = ("optional (default: " + instance_show(taskparameter.default_) + ")");
									}
									str_ += lib_markdown.listitem(2, "kind: " + content);
								}
								// description
								{
									str_ += lib_markdown.listitem(2, "description: " + taskparameter.description);
								}
							}
							str += lib_markdown.listitem(1, str_);
						}
					);
					str += lib_markdown.paragraph();
				}
			}
		);
		return str;
	}
	
}


/**
 * @author fenris
 */
class class_tasktemplate_transductor
	extends class_tasktemplate
{
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"description": description = null,
			"parameters_additional": parameters_additional = [],
			"factory": factory,
		}
		: {
			description ?: string;
			parameters_additional ?: Array<class_taskparameter<any, any>>;
			factory : type_taskfactory;
		}
	) {
		super(
			{
				"description": description,
				"parameters": (
					[
						new class_taskparameter<string, lib_path.class_filepointer>(
							{
								"name": "input",
								"extraction": raw => lib_path.filepointer_read(raw),
								"shape": lib_meta.from_raw(
									{
										"id": "string"
									}
								),
								"mandatory": true,
								"default": null,
								"description": "the path to the input file",
							}
						),
						new class_taskparameter<string, lib_path.class_filepointer>(
							{
								"name": "output",
								"extraction": raw => lib_path.filepointer_read(raw),
								"shape": lib_meta.from_raw(
									{
										"id": "string"
									}
								),
								"mandatory": true,
								"default": null,
								"description": "the path to the output file"
							}
						),
					]
					.concat(parameters_additional)
				),
				"factory": factory,
			}
		);
	}
		
}


/**
 * @author fenris
 */
class class_tasktemplate_aggregator
	extends class_tasktemplate
{
	
	/**
	 * @author fenris
	 */
	public constructor(
		{
			"description": description = null,
			"parameters_additional": parameters_additional = [],
			"factory": factory,
		}
		: {
			description ?: string;
			parameters_additional ?: Array<class_taskparameter<any, any>>;
			factory : type_taskfactory;
		}
	) {
		super(
			{
				"description": description,
				"parameters": (
					[
						new class_taskparameter<Array<string>, Array<lib_path.class_filepointer>>(
							{
								"name": "inputs",
								"extraction": raw => raw.map(x => lib_path.filepointer_read(x)),
								"shape": lib_meta.from_raw(
									{
										"id": "array",
										"parameters": {
											"shape_element": {
												"id": "string"
											}
										}
									}
								),
								"mandatory": true,
								"default": null,
								"description": "the list of paths to the input files",
							}
						),
						new class_taskparameter<string, lib_path.class_filepointer>(
							{
								"name": "output",
								"extraction": raw => lib_path.filepointer_read(raw),
								"shape": lib_meta.from_raw(
									{
										"id": "string"
									}
								),
								"mandatory": true,
								"default": null,
								"description": "the path to the output file"
							}
						),
					]
					.concat(parameters_additional)
				),
				"factory": factory,
			}
		);
	}
		
}

