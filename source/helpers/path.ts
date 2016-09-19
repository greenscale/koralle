
///<reference path="../../../plankton/object/build/logic.d.ts"/>


/**
 * @author fenris
 */
module lib_path {
	
	/**
	 * @author fenris
	 */
	abstract class class_step {
		
		/**
		 * @author fenris
		 */
		public abstract toString() : string;
		
	}
	
	
	/**
	 * @author fenris
	 */
	class class_step_stay extends class_step {
		
		/**
		 * @author fenris
		 */
		public toString() : string {
			return ".";
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	class class_step_back extends class_step {
		
		/**
		 * @author fenris
		 */
		public toString() : string {
			return "..";
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	class class_step_regular extends class_step {
		
		/**
		 * @author fenris
		 */
		protected name : string;
		
		
		/**
		 * @author fenris
		 */
		public constructor(name : string) {
			super();
			this.name = name;
		}
		
		
		/**
		 * @author fenris
		 */
		public toString() : string {
			return this.name;
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	function step_read(s : string) : class_step {
		switch (s) {
			case ".": {
				return (new class_step_stay());
				// break;
			}
			case "..": {
				return (new class_step_back());
				// break;
			}
			default: {
				return (new class_step_regular(s));
				// break;
			}
		}
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_path {
		
		/**
		 * @author fenris
		 */
		public static splitter(system : string = "unix") : string {
			return object_fetch<string>({"unix": "/", "win": "\\"}, system, "/", 2);
		}
		
		
		/**
		 * @author fenris
		 */
		public steps : Array<class_step>;
		
		
		/**
		 * @author fenris
		 */
		public constructor(steps : Array<class_step> = []) {
			this.steps = steps;
		}
		
		
		/**
		 * @author fenris
		 */
		protected add(step : class_step) : class_path {
			return (new class_path(this.steps.concat([step]))).normalize();
		}
		
		
		/**
		 * @author fenris
		 */
		public extend(path : class_path) : class_path {
			return (new class_path(this.steps.concat(path.steps))).normalize();
		}
		
		
		/**
		 * @author fenris
		 */
		public normalize() : class_path {
			let steps : Array<class_step> = this.steps;
			// filter "stay"
			{
				steps = steps.filter(step => (! (step instanceof class_step_stay)));
			}
			// filter "regular-back"
			{
				while (true) {
// console.info(new class_path(steps).toString());
					if (steps.length < 1) {
						break;
					}
					else {
						let last : class_step = steps[0];
						let found : boolean = steps.slice(1).some(
							function (step : class_step, index : int) : boolean {
// console.info("--", step.toString());
								if (step instanceof class_step_back) {
									if (last instanceof class_step_regular) {
										steps.splice(index, 2);
										return true;
									}
								}
								last = step;
								return false;
							}
						);
						if (! found) {
							break;
						}
					}
				}
			}
			return (new class_path(steps));
		}
		
		
		/**
		 * @author fenris
		 */
		public as_string(system : string = "unix") : string {
			let splitter : string = class_path.splitter(system);
			return ((this.steps.length == 0) ? ("." + splitter) : this.steps.map(step => (step.toString() + splitter)).join(""));
		}
		
	
		/**
		 * @author fenris
		 */
		public toString() : string {
			return this.as_string();
		}
		
		
		/**
		 * @author fenris
		 */
		public static read(chain : string, system : string = "unix") : class_path {
			let splitter : string = class_path.splitter(system);
			let parts : Array<string> = chain.split(splitter);
			if (parts[parts.length-1] == "") parts.pop();
			return (new class_path(parts.map(step_read)));
		}
	
	}
	
	
	/**
	 * @author fenris
	 */
	export function path_read(chain : string, system : string = "unix") : class_path {
		return class_path.read(chain, system);
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_location {
		
		public static anchorpattern(system : string = "unix") : RegExp {
			return object_fetch<RegExp>({"unix": new RegExp("/"), "win": new RegExp("[A-Z]:\\\\>")}, system, new RegExp("/"), 1);
		}
		
		/**
		 * @author fenris
		 */
		public anchor : string;
	
	
		/**
		 * @author fenris
		 */
		public path : class_path;
	
	
		/**
		 * @author fenris
		 */
		public constructor(anchor : string, path : class_path) {
			this.anchor = anchor;
			this.path = path;
		}
	
		
		/**
		 * @author fenris
		 */
		public extend(path : class_path) : class_location {
			return (new class_location(this.anchor, this.path.extend(path)));
		}
		
		
		/**
		 * @author fenris
		 */
		public go_thither() : void {
			// console.error(">>", this.toString());
			process.chdir(this.toString());
		}
	
	
		/**
		 * @author fenris
		 */
		public expedition(core : (finish : ()=>void)=>void) : void {
			let that : class_location = this;
			let current : class_location = location_read(process.cwd());
			function begin() : void {
				// (new class_message("changing directory to '" + that.toString() + "'")).stderr();
				that.go_thither();
			}
			function end() : void {
				// (new class_message("changing directory to '" + current.toString() + "'")).stderr();
				current.go_thither();
			}
			begin();
			core(end);
		}
	
		
		/**
		 * @author fenris
		 */
		public as_string(system : string = "unix") : string {
			return (((this.anchor != null) ? this.anchor : "") + this.path.as_string(system));
		}
		
	
		/**
		 * @author fenris
		 */
		public toString() : string {
			return this.as_string();
		}
		
		
		/**
		 * @author fenris
		 */
		public static read(chain : string, system : string = "unix") : class_location {
			let regexp : RegExp = class_location.anchorpattern(system);
			let match_ : any = regexp.exec(chain);
			if ((match_ != null) && (match_.index == 0)) {
				return (new class_location(match_[0], path_read(chain.slice(match_[0].length), system)));
			}
			else {
				return (new class_location(null, path_read(chain, system)));
			}
		}
		
		
		/**
		 * @author fenris
		 */
		public static current() : class_location {
			return class_location.read(process.cwd());
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export function location_read(chain : string, system : string = "unix") : class_location {
		return class_location.read(chain, system);
	}

	
	/**
	 * @author fenris
	 */
	export class class_filepointer {
	
		/**
		 * @author fenris
		 */
		public location : class_location;
	
	
		/**
		 * @author fenris
		 */
		public filename : string;
	
	
		/**
		 * @author fenris
		 */
		public constructor(location : class_location, filename : string) {
			this.location = location;
			this.filename = filename;
		}
		
		
		/**
		 * @author fenris
		 */
		public foo(filepointer : class_filepointer) : class_filepointer {
			return (
				new class_filepointer(
					this.location.extend(filepointer.location.path),
					filepointer.filename
				)
			);
		}
		
		
		/**
		 * @author fenris
		 */
		public as_string(system : string = "unix") : string {
			return (this.location.as_string(system)/* + "/"*/ + ((this.filename == null) ? "" : this.filename));
		}
		
		
		/**
		 * @author fenris
		 */
		public toString() : string {
			return this.as_string();
		}
		
		
		/**
		 * @author fenris
		 */
		public static read(chain : string, system : string = "unix") : class_filepointer {
			let splitter : string = class_path.splitter(system);
			let parts : Array<string> = chain.split(splitter);
			let last : string = parts[parts.length-1];
			if (last == "") {
				return (new class_filepointer(location_read(parts.join(splitter), system), null));
			}
			else {
				return (new class_filepointer(location_read(parts.slice(0, parts.length-1).join(splitter), system), last));
			}
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export function filepointer_read(chain : string, system : string = "unix") : class_filepointer {
		return class_filepointer.read(chain, system);
	}
	
}

