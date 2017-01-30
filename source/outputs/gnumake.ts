
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
		switch (globalvars.configuration.system) {
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
				throw (new Error(`invalid system '${globalvars.configuration.system}'`));
				break;
			}
		}
	}
	
	
	/**
	 * @author fenris
	 */
	protected compile_task(
		{
			"task": task,
			"branch": branch = [],
			"depth": depth = 0,
			"context": context = null,
			"prefix": prefix = null
		} : {
			task : class_task;
			branch ?: Array<string>;
			depth ?: int;
			context ?: lib_path.class_location;
			prefix ?: string;
		}
	) : Array<lib_gnumake.class_rule> {
		let log_begin : boolean = true;
		let log_end : boolean = false;
		let aggregate : boolean = false;
		let branch_ : Array<string> = (aggregate ? branch.concat([task.name_get()]) : [task.name_get()]);
		let logging_begin : class_action = new class_action_echo(
			// (new class_message("processing '" + branch_.join("-") + "' ...", {"type": "log", "depth": depth, "prefix": prefix})).generate()
			(new class_message(branch_.join("-") + " …", {"type": "log", "depth": depth, "prefix": prefix})).generate()
		);
		let logging_end : class_action = new class_action_echo(
			// (new class_message("... finished '" + branch_.join("-") + "'", {"type": "log", "depth": depth, "prefix": prefix})).generate()
			(new class_message("✔", {"type": "log", "depth": depth, "prefix": prefix})).generate()
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
								log_begin
								? ["__logging_" + branch_.join("-")]
								: []
							)
							.concat(
								task.sub_get()
								.filter(task_ => task_.active_get())
								.map(
									task_ => {
										return (aggregate ? branch_.concat([task_.name_get()]) : [task_.name_get()]).join("-");
									}
								)
							)
							.concat(
								task.outputs().map(
									filepointer => {
										let filepointer_ : lib_path.class_filepointer = (
											(context == null)
											? filepointer
											: filepointer.relocate(context)
										);
										return filepointer_.as_string(globalvars.configuration.system);
									}
								)
							)
						),
						"actions": (
							[]
							.concat((task.outputs().length == 0) ? task.actions() : [])
							.concat(
								log_end
								? [logging_end]
								: []
							)
							.map(action => this.compile_action(action))
						),
						"phony": true,
					}
				)
			);
			// logging
			if (log_begin) {
				rules_core.push(
					new lib_gnumake.class_rule(
						{
							"name": ("__logging_" + branch_.join("-")),
							"actions": [logging_begin].map(action => this.compile_action(action)),
							"phony": true,
						}
					)
				);
			}
			// actual rule
			if (task.outputs().length > 0) {
				rules_core.push(
					new lib_gnumake.class_rule(
						{
							"name": task.outputs().map(
								filepointer => {
									let filepointer_ : lib_path.class_filepointer = (
										(context == null)
										? filepointer
										: filepointer.relocate(context)
									);
									return filepointer_.as_string(globalvars.configuration.system);
								}
							).join(" "), // hacky!
							"dependencies": task.inputs().map(
								filepointer => {
									let filepointer_ : lib_path.class_filepointer = (
										(context == null)
										? filepointer
										: filepointer.relocate(context)
									);
									return filepointer_.as_string(globalvars.configuration.system);
								}
							),
							"actions": task.actions().map(
								action => {
									let x : string = this.compile_action(action);
									if (context == null) {
										return x;
									}
									else {
										return `cd ${context.as_string(globalvars.configuration.system)} > /dev/null && ${x} ; cd - > /dev/null`;
									}
								}
							),
							"phony": false,
						}
					)
				);
			}
		}
		let rules_sub : Array<lib_gnumake.class_rule> = [];
		{
			rules_sub = task.sub_get()
				.map(
					task_ => this.compile_task(
						{
							"task": task_,
							"branch": branch_,
							"depth": depth+1,
							"context": ((context == null) ? task_.context_get() : ((task_.context_get() == null) ? context : context.relocate(task_.context_get()))),
							"prefix": prefix,
						}
					)
				)
				.reduce(
					(x, y) => x.concat(y),
					[]
				)
			;
		}
		return [].concat(rules_core).concat(rules_sub);
	}
	
	
	/**
	 * @author fenris
	 */
	protected compile_project(project : class_project) : lib_gnumake.class_sheet {
		let comments : Array<string> = [
			`Project \"${project.name_get()}\"`,
			`This makefile was generated by Koralle ${globalvars.configuration.version}`,
		].map(x => x);
		let rules : Array<lib_gnumake.class_rule> = this.compile_task(
			{
				"task": project.roottask_get(),
				"prefix": project.name_get(),
			}
		);
		return (new lib_gnumake.class_sheet(rules, comments));
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public compile_project_string(project : class_project) : string {
		return (this.compile_project(project).compile(true));
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public execute(filepointer : lib_path.class_filepointer, workdir : string = process.cwd()) : lib_call.type_executor<void, Error> {
		return (
			(resolve, reject) => {
				let cp : any = nm_child_process.spawn(
					"make",
					[
						// `--directory=${workdir}`,
						// `--file=${filepointer.as_string(globalvars.configuration.system)}`,
						`-f`,
						`${filepointer.as_string(globalvars.configuration.system)}`,
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

