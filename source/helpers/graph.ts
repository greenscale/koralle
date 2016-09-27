
/**
 * @author fenris
 */
type type_edge<type_node> = {from : type_node; to : type_node;};


/**
 * @author fenris
 */
class class_graph<type_node> {
	
	/**
	 * @author fenris
	 */
	public nodes : Array<type_node>;
	
	
	/**
	 * @author fenris
	 */
	public edges : Array<type_edge<type_node>>;
	
	
	/**
	 * @author fenris
	 */
	public constructor(
		nodes : Array<type_node> = [],
		edges : Array<type_edge<type_node>> = []
	) {
		this.nodes = nodes;
		this.edges = edges;
	}
	
	
	/**
	 * @author fenris
	 */
	public without(pivot : type_node) : class_graph<type_node> {
		return (
			new class_graph<type_node>(
				this.nodes.filter(node => (node != pivot)),
				this.edges.filter(edge => ((edge.from != pivot) && (edge.to != pivot)))
			)
		);
	}
	

	/**
	 * @author fenris
	 */
	public topsort() : Array<type_node> {
		let graph : class_graph<type_node> = this;
		if (graph.nodes.length == 0) {
			return [];
		}
		else {
			let pivot : type_node;
			let found : boolean = graph.nodes.some(
				function (node : type_node) : boolean {
					let count : int = graph.edges.filter(edge => (edge.to == node)).length;
					if (count == 0) {
						pivot = node;
						return true;
					}
					else {
						// console.info("'" + String(node) + "' has " + count.toString() + " incoming edges");
						return false;
					}
				}
			);
			if (found) {
				return [pivot].concat(graph.without(pivot).topsort());
			}
			else {
				throw (new Error("circular dependencies found"));
			}
		}
	}
	
	
	/**
	 * @author fenris
	 */
	public output_graphviz() : string {
		let that : class_graph<type_node> = this;
		function get_nodeindex(node : type_node) : int {
			return that.nodes.indexOf(node);
		}
		function nodeid(node : type_node) : string {
			return `x_${get_nodeindex(node).toString()}`;
		}
		function nodelist() : string {
			return (
				["\tnode [];\n"]
				.concat(
					that.nodes
					.map(
						(node, index) => {
							return `\t${nodeid(node)} [label="${String(node)}"];\n`;
						}
					)
				)
				.join("")
			);
		}
		function edgelist() : string {
			return (
				["\tedge [];\n"]
				.concat(
					that.edges
					.map(
						(edge, index) => {
							return `\t${nodeid(edge.from)} -> ${nodeid(edge.to)} [];\n`;
						}
					)
				)
				.join("")
			);
		}
		let output : string = `digraph\n{\n${nodelist()}\n${edgelist()}\n}\n`;
		return output;
	}
	
}

