
/**
 * @author fenris
 */
module lib_arguments {
	
	/**
	 * @author fenris
	 */
	abstract class class_argument<type_value> {
		
		/**
		 * @author fenris
		 */
		public name : string;
		
		
		/**
		 * @author fenris
		 */
		public type : string;
		
		
		/**
		 * @author fenris
		 */
		public extraction : (raw : string)=>type_value;
		
		
		/**
		 * @author fenris
		 */
		public default_ : type_value;
		
		
		/**
		 * @author fenris
		 */
		protected info : string;
		
		
		/**
		 * @author fenris
		 */
		public constructor(
			parameters : {
				type ?: string;
				extraction : (raw : string)=>type_value;
				default ?: type_value;
				info ?: string;
			} = {}
		) {
			this.type = object_fetch<string>(parameters, "type", "string", 1);
			this.default_ = object_fetch<string>(parameters, "default", null, 1);
			this.info = object_fetch<string>(parameters, "info", null, 1);
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	class class_argument_volatile_boolean extends class_argument<boolean> {
		
		/**
		 * @author fenris
		 */
		public constructor(
			parameters : {
				name ?: string;
				negative ?: boolean;
				ids_short ?: Array<string>;
				ids_long ?: Array<string>;
			}
		) {
			let negative : boolean = object_fetch<boolean>(parameters, "negative", false, 0);
			super(
				{
					"name": parameters.name,
					"default": negative,
					"extraction": function (raw : string) : boolean {
						return (! negative);
					},
					"ids_short": parameters.ids_short,
					"ids_long": parameters.ids_long,
				}
			);
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_argument_positional<type_value> extends class_argument<type_value> {
		
		/**
		 * @author fenris
		 */
		public constructor(
			parameters : {
				type ?: string;
				extraction : (raw : string)=>type_value;
				default ?: type_value;
				info ?: string;
			} = {}
		) {
			super(parameters);
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_argument_volatile<type_value> extends class_argument<type_value> {
		
		/**
		 * @author fenris
		 */
		protected prefixes : Array<string>;
		
		
		/**
		 * @author fenris
		 */
		protected hidden : boolean;
		
		
		/**
		 * @author fenris
		 */
		public constructor(
			parameters : {
				type ?: string;
				extraction : (raw : string)=>type_value;
				default ?: type_value;
				info ?: string;
				hidden ?: boolean;
			} = {}
		) {
			super(parameters);
			this.prefixes = object_fetch<Array<string>>(parameters, "prefixes", [], 2);
			this.hidden = object_fetch<boolean>(parameters, "hidden", false, 0);
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_parser {
		
		/**
		 * @author fenris
		 */
		protected arguments_volatile : Array<class_argument_volatile>;
		
		
		/**
		 * @author fenris
		 */
		protected arguments_positional : Array<class_argument_positional>;
		
		
		/**
		 * @author fenris
		 */
		constructor(
			arguments_volatile : Array<class_argument_volatile>,
			arguments_positional : Array<class_argument_positional>
		) {
			this.arguments_volatile = arguments_volatile;
			this.arguments_positional = arguments_positional;
		}
		
		
		/**
		 * @author fenris
		 */
		public find_short(indicator : string) : class_argument {
			return this.arguments_volatile.find(argument => argument.indicators_short.some(indicator_ => (indicator == indicator_)));
		}
		
		
		/**
		 * @author fenris
		 */
		public find_long(indicator : string) : class_argument {
			return this.arguments_volatile.find(argument => argument.indicators_long.some(indicator_ => (indicator == indicator_)));
		}
		
		
		/**
		 * @author fenris
		 */
		public make_help(indentation : int = 0) : string {
			throw (new Error("not implemented"));
		}
		
		
		/**
		 * @author fenris
		 */
		public parse(input : string, usage : (data : Object)=>void) : Object {
			throw (new Error("not implemented"));
			let parts : Array<string> = input.split(" ").filter(x => (x != ""));
			let data : Object = {};
			this.arguments_.forEach(
				function (argument : class_argument) : void {
					data[argument.name] = argument.default;
				}
			);
			parts.every(
				function (part : string) : boolean {
					promise_chain<Object>(
						[
							state => (resolve, reject) => {
								let matching : any = (new RegExp("^--(\\w+)(?:=(\\w+))?$")).exec(part);
								if (matching != null) {
									let indicator : string = matching[1];
									let raw : string = matching[2];
									let argument : class_argument = that.find_long(indicator);
									if (argument == undefined) {
										let value : any;
										try {
											state.data[argument.name] = argument.extracion(raw);
											state.found = true;
											resolve(state);
										}
										catch (exception) {
											reject(<Error>(exception));
										}
									}
								}
								else {
									state.found = false;
									resolve(state);
								}
							},
							state => (resolve, reject) => {
								let matching : any = (new RegExp("^-(\\w+)$")).exec(part);
								if (matching != null) {
								}
								else {
									state.found = false;
									resolve(state);
								}
							},
							state => (resolve, reject) => {
								if (state.index >= that.arguments_positional.length) {
									reject(new Error("no more positional arguments available"));
								}
								else {
									let argument : class_argument = that.arguments_positional[state.index];
									try {
										state.data[argument.name] = argument.extraction(part);
										state.index = (state.index+1);
										state.found = true;
										resolve(state);
									}
									catch (exception) {
										reject(<Error>(exception));
									}
								}
							},
						],
						{
							"data": data,
							"index": 0,
							"found": false,
							"name": null,
							"value": null,
						}
					);
				}
			);
			return result;
		}
		
	}
	
}

