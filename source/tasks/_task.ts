
/**
 * @author fenris
 */
type type_rawtask = {
	type : string;
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
	public default_ : class_maybe<type_raw>;
	
	
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
			"default": default_ = new class_just<type_raw>(null),
			"description": description = null,
		}
		: {
			name : string;
			extraction ?: (raw : type_raw)=>type_ready;
			shape ?: lib_meta.class_shape;
			default ?: class_maybe<type_raw>;
			description ?: string;
		}
	) {
		this.name = name;
		this.extraction = extraction;
		this.shape = shape;
		this.default_ = default_;
		this.description = description;
	}
	
	
	/**
	 * @author fenris
	 */
	public static input_single(
		{
			"description": description = "the list of paths to the input files",
			"default": default_ = new class_nothing<string>(),
		}
		: {
			description ?: string;
			default ?: class_maybe<string>;
		}
		= {
		}
	) : class_taskparameter<string, lib_path.class_filepointer> {
		return (
			new class_taskparameter<string, lib_path.class_filepointer>(
				{
					"name": "input",
					"extraction": raw => lib_path.filepointer_read(raw),
					"shape": lib_meta.from_raw(
						{
							"id": "string"
						}
					),
					"default": default_,
					"description": description,
				}
			)
		);
	}
	
	
	/**
	 * @author fenris
	 */
	public static input_list(
		{
			"description": description = "the list of paths to the input files",
			"default": default_ = new class_just<Array<string>>([]),
		}
		: {
			description ?: string;
			default ?: class_maybe<Array<string>>;
		}
		= {
		}
	) : class_taskparameter<Array<string>, Array<lib_path.class_filepointer>> {
		return (
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
					"default": default_,
					"description": description,
				}
			)
		);
	}
	
	
	/**
	 * @author fenris
	 */
	public static input_schwamm(
		{
			"description": description = "parameters for a schwamm which holds a list of files in a group",
			"default": default_ = new class_just<{path : string; group : string;}>(null),
		}
		: {
			description ?: string;
			default ?: class_maybe<{path : string; group : string;}>;
		}
		= {
		}
	) : class_taskparameter<{path : string; group : string;}, Array<lib_path.class_filepointer>> {
		return (
			new class_taskparameter<{path : string; group : string;}, Array<lib_path.class_filepointer>>(
				{
					"name": "input_from_schwamm",
					"extraction": raw => {
						if (raw == null) {
							return [];
						}
						else {
							let command : string = `schwamm --include=${raw["path"]} --output=list:${raw["group"]}`;
							let result : Buffer = nm_child_process.execSync(command);
							let output : string = result.toString();
							let paths : Array<string> = output.split("\n");
							return paths.filter(path => (path.trim().length > 0)).map(path => lib_path.filepointer_read(path));
						}
					},
					"shape": lib_meta.from_raw(
						{
							"id": "object",
							"parameters": {
								"fields": [
									{
										"name": "path",
										"shape": {
											"id": "string"
										}
									},
									{
										"name": "group",
										"shape": {
											"id": "string"
										}
									},
								]
							}
						}
					),
					"default": default_,
					"description": description,
				}
			)
		);
	}
	
	
	/**
	 * @author fenris
	 */
	public static output_single(
		{
			"description": description = "the list of paths to the input files",
		}
		: {
			description ?: string;
		}
		= {
		}
	) : class_taskparameter<string, lib_path.class_filepointer> {
		return (
			new class_taskparameter<string, lib_path.class_filepointer>(
				{
					"name": "output",
					"extraction": raw => lib_path.filepointer_read(raw),
					"shape": lib_meta.from_raw(
						{
							"id": "string"
						}
					),
					"default": new class_nothing<string>(),
					"description": description,
				}
			)
		);
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
 * @desc defines how a raw task is converted into a real task and provides information to the user how to form the raw task
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
					if (parameter.default_.is_nothing()) {
						throw (new Error(`the mandatory parameter '${parameter.name}' is missing in the task description for task '${name}'`));
					}
					else {
						value_raw = parameter.default_.cull();
					}
				}
				let messages : Array<string> = parameter.shape.inspect(value_raw);
				if (messages.length > 0) {
					let message : string = "";
					message += `given value '${instance_show(value_raw)}'`;
					message += ` for parameter '${parameter.name}'`;
					message += ` with shape '${instance_show(parameter.shape)}'`;
					message += ` is malformed`;
					message += `: ${messages.join("; ")}`;
					throw (new Error(message));
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
	 * @desc does the actual conversion to a real task
	 * @author fenris
	 */
	protected create(
		rawtask : type_rawtask,
		nameprefix : string = null
	) : class_task {
		let data : {[name : string] : any} = this.convert(rawtask.parameters, rawtask.name);
		let stuff : any = this.factory(data, rawtask);
		let name : string = "";
		{
			name = ((rawtask.name != undefined) ? rawtask.name : lib_string.generate("task_"));
			if (nameprefix != null) {
				name = `${nameprefix}-${name}`;
			}
		}
		let active : boolean;
		{
			active = ((rawtask.active != undefined) ? rawtask.active : true);
		}
		let sub : Array<class_task> = [];
		{
			if (rawtask["sub"] != undefined) {
				sub = sub.concat(rawtask.sub.map(rawtask_ => class_tasktemplate.create(rawtask_, nameprefix)));
			}
			if (stuff["sub"] != undefined) {
				sub = sub.concat(stuff["sub"]);
			}
		}
		let inputs : Array<lib_path.class_filepointer> = (stuff["inputs"] || []);
		let outputs : Array<lib_path.class_filepointer> = (stuff["outputs"] || []);
		let actions : Array<class_action> = (stuff["actions"] || []);
		return (
			new class_task(
				{
					"name": name,
					"active": active,
					"sub": sub,
					"inputs": inputs,
					"outputs": outputs,
					"actions": actions,
				}
			)
		);
	}
	
	
	/**
	 * @desc holds the registered tasktemplates
	 * @author fenris
	 */
	protected static pool : {[id : string] : class_tasktemplate} = {};
	
	
	/**
	 * @desc adds a tasktemplate to the pool
	 * @author fenris
	 */
	public static register(id : string, tasktemplate : class_tasktemplate) : void {
		this.pool[id] = tasktemplate;
	}
	
	
	/**
	 * @desc retrieves a registered tasktemplate from the pool
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
	 * @desc searches for the corresponding registered tasktemplate and creates a real task
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
				str += lib_markdown.section(2, "Task '" + lib_markdown.code(id) + "'");
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
									if (taskparameter.default_.is_nothing()) {
										content = "mandatory";
									}
									else {
										content = ("optional (default: " + lib_markdown.code(instance_show(taskparameter.default_.cull())) + ")");
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
 * @desc a tasktemplate for tasks which have a single input and a single output
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
						class_taskparameter.input_single(),
						class_taskparameter.output_single(),
					]
					.concat(parameters_additional)
				),
				"factory": factory,
			}
		);
	}
		
}


/**
 * @desc a tasktemplate for tasks which have a list of inputs and a single output
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
						class_taskparameter.input_list(),
						class_taskparameter.input_schwamm(),
						class_taskparameter.output_single(),
					]
					.concat(parameters_additional)
				),
				"factory": factory,
			}
		);
	}
		
}

