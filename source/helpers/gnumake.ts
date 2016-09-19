
///<reference path="../../../plankton/object/build/logic.d.ts"/>


/**
 * @author fenris
 */
module lib_gnumake {
	
	/**
	 * @author fenris
	 */
	export class class_rule {
		
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
		protected actions : Array<string>;
		
		
		/**
		 * @author fenris
		 */
		protected phony : boolean;
		
		
		/**
		 * @author fenris
		 */
		// public constructor(name : string, dependencies : Array<string>, actions : Array<string>, phony : boolean = false) {
		public constructor(
			parameters : {
				name ?: string;
				dependencies ?: Array<string>;
				actions ?: Array<string>;
				phony ?: boolean;
			} = {}
		) {
			this.name = object_fetch<string>(parameters, "name", null, 2);
			this.dependencies = object_fetch<Array<string>>(parameters, "dependencies", [], 0);
			this.actions = object_fetch<Array<string>>(parameters, "actions", [], 0);
			this.phony = object_fetch<boolean>(parameters, "phony", false, 0);
		}
		
		
		/**
		 * @author fenris
		 */
		public actions_get() : Array<string> {
			return this.actions;
		}
		
		
		/**
		 * @author fenris
		 */
		public compile(silent : boolean = false) : string {
			let output : string = "";
			output += (this.name + ":" + this.dependencies.map(dependency => (" " + dependency)).join("") + "\n");
			this.actions.forEach(action => (output += "\t" + (silent ? "@ " : "") + action + "\n"));
			if (this.phony) output += (".PHONY: " + this.name + "\n");
			return output;
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_sheet {
		
		/**
		 * @author fenris
		 */
		protected rules : Array<class_rule>;
		
		
		/**
		 * @author fenris
		 */
		protected comments : Array<string>;
		
		
		/**
		 * @author fenris
		 */
		public constructor(rules : Array<class_rule>, comments : Array<string> = []) {
			this.rules = rules;
			this.comments = comments;
		}
		
		
		/**
		 * @author fenris
		 */
		public compile(silent : boolean = false) : string {
			return (
				[]
				.concat(this.comments.map(comment => ("# " + comment)))
				.concat([""])
				.concat(this.rules.map(rule => rule.compile(silent)))
				.join("\n")
			);
		}
		
	}
	
}

