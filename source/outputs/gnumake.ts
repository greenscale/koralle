
/**
 * @author fenris
 */
class class_target_gnumake extends class_target_regular<string> {
	
	/**
	 * @author fenris
	 */
	public constructor() {
		super("gnumake");
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public tempfolder() : string {
		switch (configuration.system) {
			case "linux": {
				return "/tmp/";
				break;
			}
			case "bsd": {
				return "/tmp/";
				break;
			}
			case "win": {
				return "%TEMP%\\";
				break;
			}
			default: {
				throw (new Error(`invalid system '${configuration.system}'`));
				break;
			}
		}
	}
	
	
	/**
	 * @author fenris
	 */
	protected compile_task(
		task : class_task,
		branch : Array<string> = [],
		depth : int = 0,
		prefix : string = null
	) : Array<lib_gnumake.class_rule> {
		let branch_ : Array<string> = /*branch.concat(*/[task.name_get()]/*)*/;
		let logging_begin : class_action = new class_action_echo(
			(new class_message("processing '" + branch_.join("-") + "' ...", {"type": "log", "depth": depth, "prefix": prefix})).generate()
		);
		let logging_end : class_action = new class_action_echo(
			(new class_message("... finished '" + branch_.join("-") + "'", {"type": "log", "depth": depth, "prefix": prefix})).generate()
		);
		let rules_core : Array<lib_gnumake.class_rule> = [];
		{
			// meta rule
			rules_core.push(
				new lib_gnumake.class_rule(
					{
						"name": branch_.join("-"),
						"dependencies": (
							[]
							.concat(
								["__logging_" + branch_.join("-")]
							)
							.concat(
								task.sub_get()
								.filter(task_ => task_.active_get())
								.map(task_ => /*branch_.concat(*/[task_.name_get()]/*)*/.join("-"))
							)
							.concat(
								task.outputs().map(filepointer => filepointer.as_string(configuration.system))
							)
						),
						"actions": (
							[]
							.concat((task.outputs().length == 0) ? task.actions() : [])
							// .concat([logging_end])
							.map(action => this.compile_action(action))
						),
						"phony": true,
					}
				)
			);
			// logging
			rules_core.push(
				new lib_gnumake.class_rule(
					{
						"name": ("__logging_" + branch_.join("-")),
						"actions": [logging_begin].map(action => this.compile_action(action)),
						"phony": true,
					}
				)
			);
			// actual rule
			if (task.outputs().length > 0) {
				rules_core.push(
					new lib_gnumake.class_rule(
						{
							"name": task.outputs().map(filepointer => filepointer.as_string(configuration.system)).join(" "), // hacky!
							"dependencies": task.inputs().map(filepointer => filepointer.as_string(configuration.system)),
							"actions": task.actions().map(action => this.compile_action(action)),
							"phony": false,
						}
					)
				);
			}
		}
		let rules_sub : Array<lib_gnumake.class_rule> = [];
		{
			rules_sub = task.sub_get()
				.map(task_ => this.compile_task(task_, branch_, depth+1, prefix))
				.reduce((x, y) => x.concat(y), [])
			;
		}
		return [].concat(rules_core).concat(rules_sub);
	}
	
	
	/**
	 * @author fenris
	 */
	protected compile_project(project : class_project, without_dependencies : boolean = false) : lib_gnumake.class_sheet {
		let comments : Array<string> = [
			`Project \"${project.name_get()}\"`,
			`This makefile was generated by Koralle ${configuration.version}`,
		].map(x => x);
		let dependencies : Array<class_task> = project.dependencytasks(this.identifier);
		let rules : Array<lib_gnumake.class_rule> = []
			.concat(
				[
					new lib_gnumake.class_rule(
						{
							"name": "__default",
							"dependencies": ["__root"],
							"actions": [],
							"phony": true,
						}
					)
				]
			)
			.concat(
				[
					new lib_gnumake.class_rule(
						{
							"name": "__root",
							"dependencies": ["__dependencies", "__core"],
							"phony": true,
						}
					)
				]
			)
			.concat(
				[
					new lib_gnumake.class_rule(
						{
							"name": "__dependencies",
							"dependencies": without_dependencies ? [] : dependencies.map(dependency => dependency.name_get()),
							"phony": true,
						}
					)
				]
			)
			.concat(
				dependencies.map(dependency => this.compile_task(dependency)).reduce((x, y) => x.concat(y), [])
			)
			.concat(
				[
					new lib_gnumake.class_rule(
						{
							"name": "__core",
							"dependencies": [project.roottask_get().name_get()],
							"phony": true,
						}
					)
				]
			)
			.concat(
				this.compile_task(project.roottask_get(), undefined, undefined, project.name_get())
			)
		;
		return (new lib_gnumake.class_sheet(rules, comments));
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public compile_project_string(project : class_project, without_dependencies : boolean = false) : string {
		return (this.compile_project(project, without_dependencies).compile(true));
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public execute(filepointer : lib_path.class_filepointer, workdir : string = process.cwd()) : lib_call.type_executor<void, Error> {
		return (
			(resolve, reject) => {
				let cp = _child_process.spawn(
					"make",
					[
						// `--directory=${workdir}`,
						// `--file=${filepointer.as_string(configuration.system)}`,
						`-f ${filepointer.as_string(configuration.system)}`,
					],
					{}
				);
				cp.stdout.on(
					"data",
					[x => x.toString(), x => x.slice(0, x.length-1), console.log].reduce(lib_call.compose)
				);
				cp.stderr.on(
					"data",
					[x => x.toString(), x => x.slice(0, x.length-1), console.error].reduce(lib_call.compose)
				);
				cp.on(
					"error",
					error => reject(new class_error("subprocess not finish successfully", [error]))
				);
				cp.on(
					"close",
					code => {
						if (code == 0) {
							resolve(undefined);
						}
						else {
							reject(new Error("unknown error while subprocess execution"));
						}
					}
				);
			}
		);
	}
	
}

