
/**
 * @author fenris
 */
class class_target_ant extends class_target_regular<lib_ant.class_action> {
	
	/**
	 * @author fenris
	 */
	public constructor() {
		super("ant");
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
				return "${env.TEMP}\\";
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
	public compile_task(
		{
			"task": task,
			"path": path = [],
			"context": context = null,
		} : {
			task : class_task;
			path ?: Array<string>;
			context ?: lib_path.class_location;
		}
	) : Array<lib_ant.class_target> {
		let aggregate : boolean = false;
		let path_ : Array<string> = path_augment(path, task.name_get(), aggregate);
		let targets_core : Array<lib_ant.class_target> = [
			new lib_ant.class_target(
				{
					"name": path_dump(path_),
					"dependencies": (
						task.sub_get()
						.filter(task_ => task_.active_get())
						.map(task_ => path_dump(path_augment(path_, task_.name_get(), aggregate)))
					),
					"actions": (
						[]
						.concat(
							(context == null)
							? (
								[]
								.concat(
									task.actions()
									// .concat([new class_action_echo(task.name_get())])
									.map(action => this.compile_action(action))
								)
							)
							: [
								new lib_ant.class_action(
									new lib_xml.class_node_complex(
										"ant",
										{
											"antfile": "${ant.file}",
											"dir": context.as_string("linux"),
											"target": path_dump(path_augment(path_, name_mark("inner"))),
											"inheritAll": String(true),
											"inheritRefs": String(true),
										}
									)
								),
							]
						)
					)
				}
			)
		];
		let targets_sub : Array<lib_ant.class_target> = []
			.concat(
				(context == null)
				? []
				: [
					new lib_ant.class_target(
						{
							"name": path_dump(path_augment(path_, name_mark("inner"))),
							"dependencies": [],
							"actions": (
								task.actions()
								// .concat([new class_action_echo(task.name_get())])
								.map(action => this.compile_action(action))
							),
						}
					)
				]
			)
			.concat(
				task.sub_get()
				.map(
					task_ => this.compile_task(
						{
							"task": task_,
							"path": path_,
							"context": ((context == null) ? task_.context_get() : ((task_.context_get() == null) ? context : context.relocate(task_.context_get()))),
						}
					)
				)
				.reduce((x, y) => x.concat(y), [])
			)
		;
		return [].concat(targets_core).concat(targets_sub);
	}
	
	
	/**
	 * @author fenris
	 */
	protected compile_project(project : class_project) : lib_ant.class_project {
		let comments : Array<lib_ant.class_comment> = [
			`Project \"${project.name_get()}\"`,
			`This build script was generated by Koralle ${globalvars.configuration.version}`,
		].map(x => new lib_ant.class_comment(x));
		let targets : Array<lib_ant.class_target> = this.compile_task({"task": project.roottask_get()});
		return (
			new lib_ant.class_project(
				{
					"name": project.name_get(),
					"default": name_mark("root"),
					"comments": comments,
					"targets": targets,
				}
			)
		);
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public compile_project_string(project : class_project) : string {
		return this.compile_project(project).compile().compile();
	}
	
	
	/**
	 * @override
	 * @author fenris
	 */
	public execute(filepointer : lib_path.class_filepointer, workdir : string = ".") : lib_call.type_executor<void, Error> {
		return (
			(resolve, reject) => {
				let cp : any = nm_child_process.spawn(
					"ant",
					[
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

