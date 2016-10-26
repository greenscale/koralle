
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
	protected equality : (node1 : type_node, node2 : type_node)=>boolean = ((node1, node2) => (node1 == node2));
	
	
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
		equality : (node1 : type_node, node2 : type_node)=>boolean = ((node1, node2) => (node1 == node2)),
		nodes : Array<type_node> = [],
		edges : Array<type_edge<type_node>> = []
	) {
		this.equality = equality;
		this.nodes = nodes;
		this.edges = edges;
	}
	
	
	/**
	 * @author frac
	 */
	public has(node : type_node) : boolean {
		return this.nodes.some(node_ => this.equality(node, node_));
	}
	
	
	/**
	 * @author fenris
	 */
	public without(pivot : type_node) : class_graph<type_node> {
		return (
			new class_graph<type_node>(
				this.equality,
				this.nodes.filter(node => (! this.equality(node, pivot))),
				this.edges.filter(edge => ((! this.equality(edge.from, pivot)) && (! this.equality(edge.to, pivot))))
			)
		);
	}
	
	
	/**
	 * @author fenris
	 */
	public outgoing(node : type_node) : Array<type_edge<type_node>> {
		return this.edges.filter(edge => this.equality(edge.from, node));
	}
	
	
	/**
	 * @author fenris
	 */
	public incoming(node : type_node) : Array<type_edge<type_node>> {
		return this.edges.filter(edge => this.equality(edge.to, node));
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
				node => {
					let count : int = graph.edges.filter(edge => this.equality(edge.to, node)).length;
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
	public hasse() : class_graph<type_node> {
		return (
			new class_graph<type_node>(
				this.equality,
				this.nodes,
				this.edges.filter(
					edge => {
						let reachable : Array<type_node> = (
							this.outgoing(edge.from).map(edge_ => edge_.to)
							.map(node => this.outgoing(node).map(edge_ => edge_.to))
							.reduce((x, y) => x.concat(y), [])
						);
						return (! reachable.some(node => this.equality(node, edge.to)));
					}
				)
			)
		);
	}
	
	
	/**
	 * @author fenris
	 */
	public output_graphviz(
		extract_label : (node : type_node)=>string = (node => String(node))
	) : string {
		let that : class_graph<type_node> = this;
		function get_nodeindex(node : type_node) : int {
			// return that.nodes.findIndex(node_ => that.equality(node, node_));
			let index : int;
			for (let index : int = 0; index < that.nodes.length; ++index) {
				if (that.equality(node, that.nodes[index])) {
					return index;
				}
			}
			return undefined;
		}
		function nodeid(node : type_node) : string {
			return `x_${get_nodeindex(node).toString()}`;
		}
		function nodelist() : string {
			return (
				["\tnode [fontname=\"Monospace\", style=\"filled\", fillcolor=\"0.4+0.8+0.8\"];\n"]
				.concat(
					that.nodes
					.map(
						(node, index) => {
							return `\t${nodeid(node)} [label="${extract_label(node)}"];\n`;
						}
					)
				)
				.join("")
			);
		}
		function edgelist() : string {
			return (
				["\tedge [fontname=\"Monospace\"];\n"]
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
		let output : string = `digraph\n{\n\tgraph [fontname=\"Monospace\"];\n${nodelist()}\n${edgelist()}\n}\n`;
		return output;
	}
	
}

