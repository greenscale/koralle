
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
	
}


/**
 * @author fenris
 */
function topsort<type_node>(graph : class_graph<type_node>) : Array<type_node> {
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
			return [pivot].concat(topsort<type_node>(graph.without(pivot)));
		}
		else {
			throw (new Error("circular dependencies found"));
		}
	}
}

