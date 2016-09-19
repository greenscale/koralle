
/**
 * @author fenris
 */
module lib_xml
{
	
	/**
	 * @author fenris
	 */
	export abstract class class_node {
		
		/**
		 * @author fenris
		 */
		public abstract compile(depth ?: int) : string;
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_node_text extends class_node {
		
		/**
		 * @author fenris
		 */
		protected content : string;
		
		
		/**
		 * @author fenris
		 */
		public constructor(content : string) {
			super();
			this.content = content;
		}
		
		
		/**
		 * @author fenris
		 */
		public compile(depth : int = 0) : string {
		 	return (indentation(depth) + this.content + "\n");
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_node_comment extends class_node {
		
		/**
		 * @author fenris
		 */
		protected content : string;
		
		
		/**
		 * @author fenris
		 */
		public constructor(content : string) {
			super();
			this.content = content;
		}
		
		
		/**
		 * @author fenris
		 */
		public compile(depth : int = 0) : string {
		 	return (indentation(depth) + "<!-- " + this.content + " -->" + "\n");
		}
		
	}
	
	
	/**
	 * @author fenris
	 */
	export class class_node_complex extends class_node {
		
		/**
		 * @author fenris
		 */
		protected name : string;
		
		
		/**
		 * @author fenris
		 */
		protected attributes : {[key : string] : string};
		
		
		/**
		 * @author fenris
		 */
		protected children : Array<class_node>;
		
		
		/**
		 * @author fenris
		 */
		public constructor(name : string, attributes : {[key : string] : string} = {}, children = []) {
			super();
			this.name = name;
			this.attributes = attributes;
			this.children = children;
		}
		
		
		/**
		 * @author fenris
		 */
		public compile(depth : int = 0) : string {
			let output : string = "";
			let attributes = Object.keys(this.attributes).map(key => (" " + key + "=" + ("\"" + this.attributes[key] + "\""))).join("");
			output += (indentation(depth) + "<" + this.name + attributes + ">" + "\n");
			this.children.forEach(child => (output += child.compile(depth+1)));
			output += (indentation(depth) + "</" + this.name + ">" + "\n");
			return output;
		}
		
	}
	
}

