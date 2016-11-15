
///<reference path="../../../plankton/object/build/logic.d.ts"/>


/**
 * @author fenris
 */
module lib_ant {
	
	/**
	 * @author fenris
	 */
	export class class_comment {
		
		/**
		 * @author fenris
		 */
		protected content : string;
		
		
		/**
		 * @author fenris
		 */
		public constructor(content : string) {
			this.content = content;
		}
		
		
		/**
		 * @author fenris
		 */
		public compile() : lib_xml.class_node {
			return (new lib_xml.class_node_comment(this.content));
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_action {
		
		/**
		 * @author fenris
		 */
		protected representation : lib_xml.class_node_complex;
		
		
		/**
		 * @author fenris
		 */
		public constructor(representation : lib_xml.class_node_complex) {
			this.representation = representation;
		}
		
		
		/**
		 * @author fenris
		 */
		public compile() : lib_xml.class_node {
			return this.representation;
		}
		
		
		/**
		 * @author fenris
		 */
		public static macro_exec(
			{
				"interpreter": interpreter = null,
				"path": path,
				"args": args = [],
				"output": output = null,
			} : type_cmdparams
		) : class_action {
			let attributes : {[key : string] : string} = {};
			if (interpreter == null) {
				attributes["executable"] = path;
			}
			else {
				attributes["executable"] = interpreter;
				args.unshift(path);
			}
			if (output != null) {
				attributes["output"] = output;
			}
			return (
				new lib_ant.class_action(
					new lib_xml.class_node_complex(
						"exec",
						attributes,
						args.map(arg => new lib_xml.class_node_complex("arg", {"value": arg}))
					)
				)
			);
		}
		
		
		/**
		 * @author fenris
		 */
		public static macro_command(cmdparams : type_cmdparams) : class_action {return this.macro_exec(cmdparams);}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_target {
		
		/**
		 * @author fenris
		 */
		protected name : string;
		
		
		/**
		 * @author fenris
		 */
		protected dependencies : Array<string>;
		
		
		/**
		 * @author fenris
		 */
		protected actions : Array<class_action>;
		
		
		/**
		 * @author fenris
		 */
		public constructor(
			parameters : {
				name ?: string;
				dependencies ?: Array<string>;
				actions ?: Array<class_action>;
			} = {}
		) {
			this.name = object_fetch<string>(parameters, "name", null, 2);
			this.dependencies = object_fetch<Array<string>>(parameters, "dependencies", [], 1);
			this.actions = object_fetch<Array<class_action>>(parameters, "actions", [], 0);
		}
		
		
		/**
		 * @author fenris
		 */
		public actions_get() : Array<class_action> {
			return this.actions;
		}
		
		
		/**
		 * @author fenris
		 */
		public compile() : lib_xml.class_node {
			return (
				new lib_xml.class_node_complex(
					"target",
					{
						"name": this.name,
						"depends": this.dependencies.join(",")
					},
					this.actions.map(action => action.compile())
				)
			);
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_project {
		
		/**
		 * @author fenris
		 */
		protected name : string;
		
		
		/**
		 * @author fenris
		 */
		protected default_ : string;
		
		
		/**
		 * @author fenris
		 */
		protected comments : Array<class_comment>;
		
		
		/**
		 * @author fenris
		 */
		protected targets : Array<class_target>;
		
		
		/**
		 * @author fenris
		 */
		public constructor(
			parameters : {
				name ?: string;
				default ?: string;
				targets ?: Array<class_target>;
				comments ?: Array<class_comment>;
			} = {}
		) {
			this.name = object_fetch<string>(parameters, "name", null, 2);
			this.default_ = object_fetch<string>(parameters, "default", null, 2);
			this.targets = object_fetch<Array<class_target>>(parameters, "targets", [], 1);
			this.comments = object_fetch<Array<class_comment>>(parameters, "comments", [], 0);
		}
		
		
		/**
		 * @author fenris
		 */
		public compile() : lib_xml.class_node {
			return (
				new lib_xml.class_node_complex(
					"project",
					{
						"name": this.name,
						"default": this.default_,
					},
					(
						[]
						.concat(
							this.comments.map(comment => comment.compile())
						)
						.concat(
							[
								new lib_xml.class_node_complex(
									"property",
									{
										"environment": "env"
									}
								),
							]
						)
						.concat(
							this.targets.map(target => target.compile())
						)
					)
				)
			);
		}
		
	}
	
}

