var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// module lib_base {
// }
var lib_base;
(function (lib_base) {
    /**
     * @author frac
     */
    function environment() {
        var entries = [
            {
                "id": "web",
                "name": "Web",
                "predicate": function () { return (typeof (document) !== "undefined"); }
            },
            {
                "id": "node",
                "name": "Node.js",
                "predicate": function () { return (typeof (process) !== "undefined"); }
            },
            {
                "id": "rhino",
                "name": "Rhino",
                "predicate": function () { return (typeof (java) !== "undefined"); }
            },
        ];
        var id;
        var found = entries.some(function (entry) {
            if (entry.predicate()) {
                id = entry.id;
                return true;
            }
            else {
                return false;
            }
        });
        if (found) {
            return id;
        }
        else {
            throw (new Error("unknown environment"));
        }
    }
    lib_base.environment = environment;
})(lib_base || (lib_base = {}));
function hash(value) {
    if (typeof (value) === "object") {
        if ("hash" in value)
            return value.hash();
        else
            throw (new Error("[hash]" + " " + "object has no hash-method"));
    }
    else {
        return value.toString();
    }
}
function equals(value_x, value_y) {
    if (typeof (value_x) === "object") {
        if ("equals" in value_x)
            return value_x.equals(value_y);
        else
            throw (new Error("[equals]" + " " + "object has no equals-method"));
    }
    else {
        return (value_x === value_y);
    }
}
function show(value) {
    if (typeof (value) === "object") {
        if ("show" in value)
            return value.show();
        else
            throw (new Error("[show]" + " " + "object has no show-method"));
    }
    else {
        return value.toString();
    }
}
/**
 * @author frac
 */
var class_observer = (function () {
    /**
     * @author frac
     */
    function class_observer() {
        this.counter = 0;
        this.actions = {};
        this.buffer = [];
    }
    /**
     * @author frac
     */
    class_observer.prototype.empty = function () {
        return (Object.keys(this.actions).length == 0);
    };
    /**
     * @author frac
     */
    class_observer.prototype.flush = function () {
        this.actions = {};
    };
    /**
     * @author frac
     */
    class_observer.prototype.set = function (id, action) {
        this.actions[id] = action;
    };
    /**
     * @author frac
     */
    class_observer.prototype.del = function (id) {
        delete this.actions[id];
    };
    /**
     * @author frac
     */
    class_observer.prototype.add = function (action) {
        this.set((this.counter++).toString(), action);
    };
    /**
     * @author frac
     */
    class_observer.prototype.notify = function (information, delayed) {
        var _this = this;
        if (information === void 0) { information = {}; }
        if (delayed === void 0) { delayed = false; }
        if (delayed) {
            this.buffer.push(information);
        }
        else {
            Object.keys(this.actions).forEach(function (id) { return _this.actions[id](information); });
        }
    };
    /**
     * @author frac
     */
    class_observer.prototype.rollout = function () {
        var _this = this;
        this.buffer.forEach(function (information) { return _this.notify(information, false); });
        this.buffer = [];
    };
    return class_observer;
}());
/**
 * @author frac
 */
/*
export interface interface_readable<type_value> {

    |**
     * @author frac
     *|
    read() : type_executor<type_value, Error>;

}
 */
/**
 * @author frac
 */
/*
export interface interface_writeable<type_value> {

    |**
     * @author frac
     *|
    write(value : type_value) : type_executor<void, Error>;

}
 */
/**
 * @author frac
 */
/*export*/ var class_maybe = (function () {
    function class_maybe() {
    }
    /**
     * @desc whether the wrapper is nothing
     * @author frac
     */
    class_maybe.prototype.is_nothing = function () {
        throw (new Error("not implemented: class_maybe.is_nothing"));
    };
    /**
     * @desc whether the wrapper is just
     * @author frac
     */
    class_maybe.prototype.is_just = function () {
        throw (new Error("not implemented: class_maybe.is_just"));
    };
    /**
     * @desc return the value, stored in the maybe-wrapper
     * @author frac
     */
    class_maybe.prototype.cull = function () {
        throw (new Error("not implemented: class_maybe.cull"));
    };
    /**
     * @author frac
     */
    class_maybe.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        throw (new Error("not implemented: class_maybe.distinguish"));
    };
    /**
     * @author frac
     */
    class_maybe.prototype.propagate = function (action) {
        throw (new Error("not implemented: class_maybe.propagate"));
    };
    return class_maybe;
}());
/**
 * @author frac
 */
/*export*/ var class_nothing = (function (_super) {
    __extends(class_nothing, _super);
    /**
     * @author frac
     */
    function class_nothing(reason) {
        if (reason === void 0) { reason = null; }
        _super.call(this);
        this.reason = reason;
    }
    /**
     * @author frac
     */
    class_nothing.prototype.is_nothing = function () {
        return true;
    };
    /**
     * @author frac
     */
    class_nothing.prototype.is_just = function () {
        return false;
    };
    /**
     * @author frac
     */
    class_nothing.prototype.cull = function () {
        return null;
    };
    /**
     * @author frac
     */
    class_nothing.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        action_nothing(this.reason);
    };
    /**
     * @author frac
     */
    class_nothing.prototype.propagate = function (action) {
        return (new class_nothing(this.reason));
    };
    return class_nothing;
}(class_maybe));
/**
 * @author frac
 */
/*export*/ var class_just = (function (_super) {
    __extends(class_just, _super);
    /**
     * @author frac
     */
    function class_just(value) {
        _super.call(this);
        this.value = value;
    }
    /**
     * @author frac
     */
    class_just.prototype.is_nothing = function () {
        return false;
    };
    /**
     * @author frac
     */
    class_just.prototype.is_just = function () {
        return true;
    };
    /**
     * @author frac
     */
    class_just.prototype.cull = function () {
        return this.value;
    };
    /**
     * @author frac
     */
    class_just.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        action_just(this.value);
    };
    /**
     * @author frac
     */
    class_just.prototype.propagate = function (action) {
        return action(this.value);
    };
    return class_just;
}(class_maybe));
/**
 * @author frac
 */
var class_error = (function (_super) {
    __extends(class_error, _super);
    /**
     * @author frac
     */
    function class_error(message, suberrors) {
        if (suberrors === void 0) { suberrors = []; }
        _super.call(this, message);
        this.suberrors = suberrors;
        this.mess = message;
    }
    /**
     * @override
     * @author frac
     */
    class_error.prototype.toString = function () {
        return (this.mess + " " + ("[" + this.suberrors.map(function (x) { return x.toString(); }).join(",") + "]"));
    };
    return class_error;
}(Error));
// module lib_base {
// import _instances = require("instances");
// declare var hash;
// declare var equals;
/**
 * @author frac
 */
/*export*/ var Pair = (function () {
    function Pair(first, second) {
        this.first = first;
        this.second = second;
    }
    Pair.prototype.equals = function (pair) {
        var first_equals;
        var second_equals;
        var exceptions = new Array();
        try {
            first_equals = equals(this.first, pair.first);
        }
        catch (exception) {
            exceptions.push(exception);
        }
        try {
            second_equals = equals(this.second, pair.second);
        }
        catch (exception) {
            exceptions.push(exception);
        }
        if (exceptions.length == 0) {
            return (first_equals && second_equals);
        }
        else {
            throw (new Exception("Pair:equals:components", "Missing equality-implementation for components while trying to compute equality of pairs", exceptions));
        }
    };
    Pair.prototype.hash = function () {
        var first_hash;
        var second_hash;
        var exceptions = new Array();
        try {
            first_hash = hash(this.first);
        }
        catch (exception) {
            exceptions.push(exception);
        }
        try {
            second_hash = hash(this.second);
        }
        catch (exception) {
            exceptions.push(exception);
        }
        if (exceptions.length == 0) {
            return (first_hash + "_" + second_hash);
        }
        else {
            throw (new Exception("Pair:hash:components", "Missing hash for components while trying to retrieve hash of pair", exceptions));
        }
    };
    Pair.prototype.toString = function () {
        return ("(" + this.first.toString() + ", " + this.second.toString() + ")");
    };
    return Pair;
}());
/**
 * @author frac
 */
/*export*/ var AbstractMap = (function () {
    function AbstractMap() {
        this.size = 0;
    }
    AbstractMap.prototype.get = function (key) {
        throw (new ExceptionAbstract("Map:get"));
    };
    AbstractMap.prototype.get_fallback = function (key, fallback) {
        if (fallback === void 0) { fallback = null; }
        try {
            return this.get(key);
        }
        catch (exception) {
            if (exception_is(exception, "Map:get:not_found"))
                return fallback;
            else
                throw exception;
        }
    };
    AbstractMap.prototype.has = function (key) {
        throw (new ExceptionAbstract("Map:has"));
    };
    AbstractMap.prototype.set = function (key, value) {
        throw (new ExceptionAbstract("Map:set"));
    };
    AbstractMap.prototype.extend = function (map) {
        (function (this_) {
            map.forEach(function (value, key) {
                this_.set(key, value);
            });
        })(this);
    };
    AbstractMap.prototype.delete = function (key) {
        throw (new ExceptionAbstract("Map:delete"));
    };
    AbstractMap.prototype.clear = function () {
        throw (new ExceptionAbstract("Map:clear"));
    };
    AbstractMap.prototype.forEach = function (action) {
        throw (new ExceptionAbstract("Map:get"));
    };
    AbstractMap.prototype.pairs = function () {
        var pairs = new Array();
        this.forEach(function (value, key) {
            pairs.push(new Pair(key, value));
        });
        return pairs;
    };
    AbstractMap.prototype.toString = function () {
        return ("{" + this.pairs().map(function (pair) { return (pair.first.toString() + ": " + pair.second.toString()); }).join(", ") + "}");
    };
    return AbstractMap;
}());
/**
 * @author frac
 */
/*export*/ var EqualityMap = (function (_super) {
    __extends(EqualityMap, _super);
    function EqualityMap() {
        _super.call(this);
        this.clear();
    }
    EqualityMap.prototype.get_index = function (key) {
        var index = this.pairs_["findIndex"](function (pair) { return equals(pair.first, key); });
        return ((index < 0) ? null : index);
    };
    EqualityMap.prototype.get_pair = function (key) {
        var index = this.get_index(key);
        return ((index == null) ? null : this.pairs_[index]);
    };
    EqualityMap.prototype.get = function (key) {
        return this.get_pair(key).second;
    };
    EqualityMap.prototype.has = function (key) {
        try {
            this.get(key);
            return true;
        }
        catch (exception) {
            if (exception_is(exception, "Map:get:not_found"))
                return false;
            else
                throw exception;
        }
    };
    EqualityMap.prototype.set = function (key, value) {
        var pair = this.get_pair(key);
        if (pair != null) {
            console.warn("overwriting value for the following key: ", key);
            pair.second = value;
        }
        else {
            this.pairs_.push(new Pair(key, value));
            this.size += 1;
        }
        return this;
    };
    EqualityMap.prototype.delete = function (key) {
        var index;
        var present;
        try {
            index = this.get_index(key);
            present = true;
        }
        catch (exception) {
            if (exception_is(exception, "Map:get:not_found"))
                present = false;
            else
                throw exception;
        }
        if (present) {
            this.pairs_ = this.pairs_.splice(index, 1);
            this.size -= 1;
            return true;
        }
        else {
            return false;
        }
    };
    EqualityMap.prototype.clear = function () {
        this.pairs_ = new Array();
        this.size = 0;
    };
    EqualityMap.prototype.forEach = function (action) {
        (function (this_) {
            this_.pairs_.forEach(function (pair) {
                action(pair.second, pair.first, this_);
            });
        })(this);
    };
    return EqualityMap;
}(AbstractMap));
/**
 * @author frac
 */
/*export*/ var HashMap = (function (_super) {
    __extends(HashMap, _super);
    function HashMap() {
        _super.call(this);
        this.clear();
    }
    HashMap.prototype.get = function (key) {
        var hashvalue = hash(key);
        if (hashvalue in this.object)
            return this.object[hashvalue];
        else
            throw (new Exception("Map:get:not_found", "no entry for the given key (hashvalue: '" + hashvalue + "')"));
    };
    HashMap.prototype.has = function (key) {
        return (hash(key) in this.object);
    };
    HashMap.prototype.set = function (key, value) {
        var hashvalue = hash(key);
        if (hashvalue in this.object) {
            console.warn("overwriting value for key with hashvalue '" + hashvalue + "'");
            this.object[hashvalue] = value;
        }
        else {
            this.keys_original.push(key);
            this.object[hashvalue] = value;
            this.size += 1;
        }
        return this;
    };
    HashMap.prototype.delete = function (key) {
        var hashvalue = hash(key);
        if (hashvalue in this.object) {
            this.keys_original = this.keys_original.filter(function (key_) {
                return (hash(key_) != hashvalue);
            });
            delete this.object[hashvalue];
            this.size -= 1;
            return true;
        }
        else {
            return false;
        }
    };
    HashMap.prototype.clear = function () {
        this.keys_original = new Array();
        this.object = {};
        this.size = 0;
    };
    HashMap.prototype.forEach = function (action) {
        (function (this_) {
            this_.keys_original.forEach(function (key) {
                var hashvalue = hash(key);
                var value = this_.object[hashvalue];
                action(value, key, this_);
            });
        })(this);
    };
    return HashMap;
}(AbstractMap));
/**
 * @author frac
 */
/*exports*/ var SimpleMap = (function (_super) {
    __extends(SimpleMap, _super);
    function SimpleMap() {
        _super.call(this);
    }
    return SimpleMap;
}(HashMap));
/**
 * @author frac
 */
/*export*/ var Tree = (function () {
    // constructors
    function Tree(parent, value, children) {
        if (parent === void 0) { parent = null; }
        if (value === void 0) { value = null; }
        if (children === void 0) { children = new Array(); }
        this.parent = parent;
        this.value = value;
        this.children = children;
        var this_ = this;
        if (children != null)
            this.children.forEach(function (tree) { tree.parent = this_; });
    }
    // accessors
    Tree.prototype.value_get = function () {
        return this.value;
    };
    Tree.prototype.map = function (transformator, parent) {
        if (parent === void 0) { parent = null; }
        var tree = new Tree(parent, transformator(this.value));
        tree.children = this.children.map(function (tree_) { return tree_.map(transformator, tree); });
        return tree;
    };
    /*
    public children_iterate():void
    {
        this.children.forEach(function (tree:Tree<Value>) {yield tree;});
    }
    */
    Tree.prototype.flatten = function (postorder) {
        if (postorder === void 0) { postorder = false; }
        var reduce = postorder ? 'reduceRight' : 'reduce';
        return this.children[reduce](function (list, tree) { return list.concat(tree.flatten(postorder)); }, [this]);
    };
    Tree.prototype.traverse = function (postorder) {
        if (postorder === void 0) { postorder = false; }
        return this.flatten().map(function (tree) { return tree.value; });
    };
    Tree.prototype.graph = function (prefix) {
        if (prefix === void 0) { prefix = "x"; }
        var vertices = new Array();
        var edges = new Array();
        vertices.push(new Pair(prefix, this.value));
        this.children.forEach(function (tree, index) {
            var prefix_ = prefix + "_" + index.toString();
            edges.push(new Pair(new Pair(prefix, prefix_), null));
            var graph = tree.graph(prefix_);
            vertices = vertices.concat(graph.get_vertices());
            edges = edges.concat(graph.get_edges());
        });
        return new Graph(vertices, edges);
    };
    // mutators
    Tree.prototype.value_set = function (value) {
        this.value = value;
    };
    Tree.prototype.children_add = function (tree) {
        this.children.push(tree);
        tree.parent = this;
    };
    return Tree;
}());
/**
 * @author frac
 */
/*export*/ var Graph = (function () {
    function Graph(vertices, edges) {
        // [ToDo] check consistency
        this.vertices = vertices;
        this.edges = edges;
    }
    Graph.prototype.get_vertices = function () {
        return this.vertices;
    };
    Graph.prototype.get_edges = function () {
        return this.edges;
    };
    Graph.prototype.graphviz = function (name) {
        if (name === void 0) { name = "conversion"; }
        var script = "";
        script += ("digraph " + name + "\n");
        script += ("{\n");
        this.vertices.forEach(function (vertex) {
            var line = "";
            line += ("\t" + vertex.first);
            var parameters = new HashMap();
            parameters.set("shape", "circle");
            if (vertex.first != null)
                parameters.set("label", vertex.second.toString());
            line += (" [" + parameters.pairs().map(function (pair) { return (pair.first + "='" + pair.second + "'"); }).join(",") + "]");
            line += "\n";
            script += line;
        });
        script += ("\t\n");
        this.edges.forEach(function (edge) {
            var line = "";
            line += ("\t" + edge.first.first + " -> " + edge.first.second);
            var parameters = new HashMap();
            if (edge.second != null)
                parameters.set("label", edge.second.toString());
            line += (" [" + parameters.pairs().map(function (pair) { return (pair.first + "='" + pair.second + "'"); }).join(",") + "]");
            line += "\n";
            script += line;
        });
        script += ("}\n");
        return script;
    };
    return Graph;
}());
/*export*/ function tree_test() {
    var tree = new Tree(null, 3, [
        new Tree(null, 1, [
            new Tree(null, 0),
            new Tree(null, 2),
        ]),
        new Tree(null, 5, [
            new Tree(null, 4),
            new Tree(null, 6),
        ]),
    ]);
    return tree;
}
/*
*/
// }
/**
 * @author frac
 */
var class_set = (function () {
    /**
     * @author frac
     */
    function class_set(elements) {
        var _this = this;
        if (elements === void 0) { elements = []; }
        this.elements = [];
        elements.forEach(function (element) { return _this.add(element); });
    }
    /**
     * @author frac
     */
    class_set.prototype.elements_get = function () {
        return this.elements;
    };
    /**
     * @author frac
     */
    class_set.prototype.add = function (element) {
        if (this.elements.indexOf(element) < 0) {
            this.elements.push(element);
        }
    };
    /**
     * @author frac
     */
    class_set.prototype.forEach = function (action) {
        this.elements.forEach(action);
    };
    return class_set;
}());
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lib_call;
(function (lib_call) {
    /**
     * @desc this is kind of an ugly hack; the motivation is, that the JS-interpreter of many Gecko-based browsers
     *    (e.g. Firefox) won't accept a larger number of stack-frames, which come up when using executor-chains often.
     *    This can be circumvented by deferring inner calls, such that they are moved outside the own stack-frame. This
     *    is possible due to the asynchronous nature of executors. However this does also significantly increase the
     *    overall-time for a long executor-chain (or rather executor-tree) to finish. Therefore it is not recommended
     *    to do this by default.
     * @author frac
     */
    lib_call.default_deferred = ((typeof (navigator) === "undefined") ? false : (navigator.userAgent.indexOf("Firefox") >= 0));
    /**
     * @author fenris
     */
    function schedule(function_, deferred) {
        if (deferred === void 0) { deferred = lib_call.default_deferred; }
        if (!deferred) {
            function_();
        }
        else {
            setTimeout(function_, 0);
        }
    }
    lib_call.schedule = schedule;
})(lib_call || (lib_call = {}));
///<reference path="../../base/build/logic.d.ts"/>
var lib_call;
(function (lib_call) {
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    var class_wait = (function () {
        function class_wait() {
        }
        return class_wait;
    }());
    lib_call.class_wait = class_wait;
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    var class_wait_sequential = (function (_super) {
        __extends(class_wait_sequential, _super);
        /**
         * @author frac
         */
        function class_wait_sequential(dependencies, action) {
            if (action === void 0) { action = function () { console.log("all done"); }; }
            _super.call(this);
            this.dependencies = dependencies;
            this.action = action;
        }
        /**
         * @author frac
         */
        class_wait_sequential.prototype.run_ = function (dependencies) {
            var _this = this;
            if (dependencies.length > 0) {
                dependencies[0](function () { return _this.run_(dependencies.slice(1)); });
            }
            else {
                this.action();
            }
        };
        /**
         * @author frac
         */
        class_wait_sequential.prototype.run = function () {
            this.run_(this.dependencies);
        };
        return class_wait_sequential;
    }(class_wait));
    lib_call.class_wait_sequential = class_wait_sequential;
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    var class_wait_parallel = (function (_super) {
        __extends(class_wait_parallel, _super);
        /**
         * @author frac
         */
        function class_wait_parallel(dependencies, action) {
            var _this = this;
            if (action === void 0) { action = function () { console.log("all done"); }; }
            _super.call(this);
            this.index = 0;
            this.dependencies = {};
            this.action = action;
            dependencies.forEach(function (dependency) { return _this.add_dependency(dependency); });
        }
        /**
         * @author frac
         */
        class_wait_parallel.prototype.add_dependency = function (dependency) {
            this.dependencies["dependency_" + this.index.toString()] = dependency;
            this.index += 1;
        };
        /**
         * @author frac
         */
        class_wait_parallel.prototype.remove_dependency = function (id) {
            if (!(id in this.dependencies)) {
                throw (new Error("dependency does not exist"));
            }
            else {
                delete this.dependencies[id];
                if (Object.keys(this.dependencies).length == 0) {
                    this.action();
                }
            }
        };
        /**
         * @author frac
         */
        class_wait_parallel.prototype.run = function () {
            var that = this;
            if (Object.keys(this.dependencies).length == 0) {
                this.action();
            }
            else {
                Object.keys(this.dependencies).forEach(function (id) {
                    var dependency = that.dependencies[id];
                    dependency(function () {
                        that.remove_dependency(id);
                    });
                });
            }
        };
        return class_wait_parallel;
    }(class_wait));
    lib_call.class_wait_parallel = class_wait_parallel;
})(lib_call || (lib_call = {}));
///<reference path="../../base/build/logic.d.ts"/>
var lib_call;
(function (lib_call) {
    /**
     * @desc a definition for a value being "defined"
     * @author neuc
     */
    function is_def(obj, null_is_valid) {
        if (null_is_valid === void 0) { null_is_valid = false; }
        return (!((typeof (obj) === "undefined") || (!null_is_valid && (obj === null))));
    }
    lib_call.is_def = is_def;
    /**
     * @desc returns the value if set and, when a type is specified, if the type is corret, if not return default_value
     * @author neuc
     */
    function def_val(value, default_value, type, null_is_valid) {
        if (type === void 0) { type = null; }
        if (null_is_valid === void 0) { null_is_valid = false; }
        if (is_def(value, null_is_valid) && (is_def(type) ? ((typeof value === type) || ((value === null) && null_is_valid)) : true)) {
            return value;
        }
        else {
            return default_value;
        }
    }
    lib_call.def_val = def_val;
    ;
    /**
     * @desc just the empty function; useful for some callbacks etc.
     * @author frac
     */
    function nothing() {
    }
    lib_call.nothing = nothing;
    /**
     * @desc just the identity; useful for some callbacks etc.
     * @author frac
     */
    function id(x) {
        return x;
    }
    lib_call.id = id;
    /**
     * @author frac
     */
    function use(input, function_) {
        return function_(input);
    }
    lib_call.use = use;
    /**
     * @desc outputs
     * @author frac
     */
    function output(x) {
        console["_info"].apply(console, arguments);
    }
    lib_call.output = output;
    /**
     * @desc converts the "arguments"-map into an array
     * @param {Object} args
     * @author frac
     */
    function args2list(args) {
        return Object.keys(args).map(function (key) { return args[key]; });
    }
    lib_call.args2list = args2list;
    /**
     * @desc provides the call for an attribute of a class as a regular function
     * @param {string} name the name of the attribute
     * @return {*}
     * @author frac
     */
    function attribute(name) {
        return (function (object) { return object[name]; });
    }
    lib_call.attribute = attribute;
    /**
     * @desc provides a method of a class as a regular function
     * @param {string} name the name of the method
     * @return {function}
     * @author frac
     */
    function method(name) {
        return (function (object) { return object[name].apply(object, args2list(arguments).slice(1)); });
    }
    lib_call.method = method;
    /**
     * @desc composes two functions (i.e. returns a function that return the result of the successive execution of both input-functions)
     * @param {function} function_f
     * @param {function} function_g
     * @author frac
     */
    function compose(function_f, function_g) {
        return (function (x) {
            // return function_g(function_f(x));
            return function_g(function_f.apply(function_f, args2list(arguments)));
        });
    }
    lib_call.compose = compose;
    /**
     * @desc transforms a function with sequential input into a function with leveled input; example: add(2,3) = curryfy(add)(2)(3)
     * @param {function} f
     * @param {int} n (don't set manually)
     * @return {function} the currified version of the in put function
     * @author frac
     */
    function curryfy(f, n) {
        if (n === void 0) { n = f.length; }
        switch (n) {
            case 0: {
                throw (new Error("[curryfy] impossible"));
            }
            case 1: {
                return f;
            }
            default: {
                return (function (x) {
                    return (curryfy(function () { return f.apply(f, [x].concat(args2list(arguments))); }, n - 1));
                });
            }
        }
    }
    lib_call.curryfy = curryfy;
    /**
     * @desc adapter for old syntax
     * @author frac
     */
    function wait(dependencies, action, parallel) {
        if (action === void 0) { action = function () { console.log("all done"); }; }
        if (parallel === void 0) { parallel = true; }
        var wait = (parallel ? (new lib_call.class_wait_parallel(dependencies, action)) : (new lib_call.class_wait_sequential(dependencies, action)));
        wait.run();
    }
    lib_call.wait = wait;
    /**
     * returns a function which goes through a process step by step
     * a process is an array of objects like { func : {function}, state : {string}}
     * trigger the start of the process by calling the returned function with one argument
     * which represents the parameters of the first function which is in the process
     * @param {Array<object>} _process
     * @param {function} on_stateChange called before the next function is called
     * @returns {function}
     */
    function simple_process(_process, on_stateChange, on_progress) {
        if (on_stateChange === void 0) { on_stateChange = function (msg) { console.info("State changed " + msg); }; }
        if (on_progress === void 0) { on_progress = function (msg, pos, max) { console.info("Progress '" + msg + "' " + pos + "/" + max); }; }
        var data_hashmap = {};
        var _orchestrate = function (data, pos) {
            if (pos === void 0) { pos = 0; }
            if (is_def(data)) {
                // data_hashmap[pos] = object_merge_objects({}, data, ["parents", "parent", "children"]);
                data_hashmap[pos] = {};
                Object.keys(data).filter(function (key) { return (["parents", "parent", "children"].indexOf(key) < 0); }).forEach(function (key) { return (data_hashmap[pos][key] = data[key]); });
            }
            else {
                if (is_def(data_hashmap[pos]) && is_def(data_hashmap[pos].processed)) {
                    data = data_hashmap[pos];
                }
            }
            if (pos < _process.length) {
                var _func;
                if (typeof (_process[pos]) !== "undefined") {
                    _func = _process[pos].func;
                }
                if (pos === 0) {
                    data = { processed: data };
                }
                if (_process[pos]) {
                    on_stateChange(_process[pos].state);
                }
                return (_func(data, function (processed_data) {
                    setTimeout(_orchestrate({ "processed": processed_data }, pos + 1), 0);
                }, on_progress));
            }
            else {
                console.error("o.O.");
            }
        };
        return _orchestrate;
    }
    lib_call.simple_process = simple_process;
})(lib_call || (lib_call = {}));
///<reference path="../../base/build/logic.d.ts"/>
"use strict";
var lib_call;
(function (lib_call) {
    /**
     * @author frac
     */
    function executor_resolve(result) {
        return (function (resolve, reject) { return resolve(result); });
    }
    lib_call.executor_resolve = executor_resolve;
    /**
     * @author frac
     */
    function executor_reject(reason) {
        return (function (resolve, reject) { return reject(reason); });
    }
    lib_call.executor_reject = executor_reject;
    /**
     * @author frac
     */
    function executor_transform(executor, transform_result, transform_reason) {
        return (function (resolve, reject) {
            executor(function (result) { return resolve(transform_result(result)); }, function (reason) { return reject(transform_reason(reason)); });
        });
    }
    lib_call.executor_transform = executor_transform;
    /**
     * @author frac
     */
    function executor_transform_default(executor, transform_result, wrap_string) {
        if (wrap_string === void 0) { wrap_string = null; }
        var transform_reason = (function (error) { return ((wrap_string == null) ? error : new class_error(wrap_string, [error])); });
        return (executor_transform(executor, transform_result, transform_reason));
    }
    lib_call.executor_transform_default = executor_transform_default;
    /**
     * @author frac
     */
    function executor_compose_sequential(first, second, deferred) {
        if (deferred === void 0) { deferred = undefined; }
        return (function (resolve, reject) {
            first(function (result) {
                lib_call.schedule(function () { return second(result)(resolve, reject); }, deferred);
            }, function (reason) {
                reject(reason);
            });
        });
    }
    lib_call.executor_compose_sequential = executor_compose_sequential;
    /**
     * @author frac
     */
    function executor_chain(state, executors, deferred) {
        if (deferred === void 0) { deferred = lib_call.default_deferred; }
        return (function (resolve, reject) {
            if (executors.length == 0) {
                return resolve(state);
            }
            else {
                return executors[0](state)(function (result) {
                    lib_call.schedule(function () { return executor_chain(result, executors.slice(1))(resolve, reject); });
                }, reject);
            }
        });
        /*
         */
        /*
        if (executors.length == 0) {
            return executor_resolve<type_state, type_error>(state);
        }
        else if (executors.length == 1) {
            return executors[0](state);
        }
        else {
            return (
                executor_chain<type_state, type_error>(
                    state,
                    [
                        state => (resolve, reject) => executors[0](state)(result => executors[1](result)(resolve, reject), reject)
                    ].concat(executors.slice(2))
                )
            );
        }
         */
        /*
        return (
            executors.reduce(
                (chain, current) => executor_compose_sequential<type_state, type_state, type_error>(chain, current, deferred),
                executor_resolve<type_state, type_error>(state)
            )
        );
         */
    }
    lib_call.executor_chain = executor_chain;
    /**
     * @author frac
     */
    function executor_first(executors) {
        /*
        return (
            (resolve, reject) => {
                if (executors.length == 0) {
                    reject(new Error("all failed"));
                }
                else {
                    executors[0](
                        result => {
                            resolve(result);
                        },
                        reason => {
                            executor_first<type_result, type_reason>(executors.slice(1))(resolve, reject);
                        }
                    )
                }
            }
        );
         */
        return (function (resolve, reject) {
            executor_chain([], executors.map(function (executor) { return function (reasons) { return function (resolve_, reject_) {
                executor(function (result) { return reject_(result); }, function (reason) { return resolve_(reasons.concat([reason])); });
            }; }; }))(function (errors) { return reject(errors); }, function (result) { return resolve(result); });
        });
    }
    lib_call.executor_first = executor_first;
    /**
     * @author frac
     */
    function executor_condense(executors) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element) { return resolve(result.concat([element])); }, reject);
        }; }; })));
    }
    lib_call.executor_condense = executor_condense;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_filter(executors, predicate) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element) { return resolve(predicate(element) ? result.concat([element]) : result); }, reject);
        }; }; })));
    }
    lib_call.executor_filter = executor_filter;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_map(executors, transformator) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element1) { return resolve(result.concat([transformator(element1)])); }, reject);
        }; }; })));
    }
    lib_call.executor_map = executor_map;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_reduce(executors, initial, accumulator) {
        return (executor_chain(initial, executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element) { return resolve(accumulator(result, element)); }, reject);
        }; }; })));
    }
    lib_call.executor_reduce = executor_reduce;
})(lib_call || (lib_call = {}));
var lib_call;
(function (lib_call) {
    /**
     * @author fenris
     */
    var knot_loglevel_stack = [0];
    /**
     * @author fenris
     */
    function knot_loglevel_get() {
        return knot_loglevel_stack.slice(-1)[0];
    }
    lib_call.knot_loglevel_get = knot_loglevel_get;
    /**
     * @author fenris
     */
    function knot_loglevel_push(loglevel) {
        knot_loglevel_stack.push(loglevel);
    }
    lib_call.knot_loglevel_push = knot_loglevel_push;
    /**
     * @author fenris
     */
    function knot_loglevel_pop() {
        knot_loglevel_stack.pop();
    }
    lib_call.knot_loglevel_pop = knot_loglevel_pop;
    /**
     * @author fenris
     */
    function knot_resolver(output) {
        return (function (input) { return function (resolve, reject) { return resolve(output); }; });
    }
    lib_call.knot_resolver = knot_resolver;
    /**
     * @author fenris
     */
    function knot_id() {
        return (function (input) { return function (resolve, reject) { return resolve(input); }; });
    }
    lib_call.knot_id = knot_id;
    /**
     * @author fenris
     */
    function knot_rejector(error) {
        return (function (input) { return function (resolve, reject) { return reject(error); }; });
    }
    lib_call.knot_rejector = knot_rejector;
    /**
     * @author fenris
     */
    function knot_from_function(function_) {
        return (function (input) { return function (resolve, reject) {
            try {
                var output_1 = function_(input);
                resolve(output_1);
            }
            catch (exception) {
                reject((exception));
            }
        }; });
    }
    lib_call.knot_from_function = knot_from_function;
    /**
     * @author fenris
     */
    function knot_wrap(inner, convert_input, convert_output, convert_error) {
        return (function (input_outer) { return function (resolve, reject) {
            var input_inner = convert_input(input_outer);
            inner(input_inner)(function (output_inner) {
                var output_outer = convert_output(output_inner);
                return resolve(output_outer);
            }, function (error_inner) {
                var error_outer = convert_error(error_inner);
                return reject(error_outer);
            });
        }; });
    }
    lib_call.knot_wrap = knot_wrap;
    /**
     * @author fenris
     */
    function knot_wrap_log(inner) {
        return (knot_wrap(inner, function (input) {
            console.error("--", "input:", JSON.stringify(input));
            return input;
        }, function (output) {
            console.error("--", "output:", JSON.stringify(output));
            return output;
        }, function (error) {
            console.error("--", "error:", JSON.stringify(error));
            return error;
        }));
    }
    lib_call.knot_wrap_log = knot_wrap_log;
    /**
     * @author fenris
     */
    function knot_compose_sequential(first, second) {
        var second_ = ((knot_loglevel_get() >= 1)
            ? knot_wrap_log(second)
            : second);
        return (function (input) { return function (resolve, reject) {
            first(input)(function (between) { return lib_call.schedule(function () { return second_(between)(resolve, reject); }); }, reject);
        }; });
    }
    lib_call.knot_compose_sequential = knot_compose_sequential;
    /**
     * @author fenris
     */
    function knot_chain(knots) {
        return (knots.reduce(knot_compose_sequential, knot_id()));
    }
    lib_call.knot_chain = knot_chain;
    /**
     * @author frac
     */
    /*
    export function knot_compose_parallel<>(
        upper : type_knot<type_input, type_output_upper, type_error_upper>,
        lower : type_knot<type_input, type_output_lower, type_error_lower>
    ) {
        return (
            input => (resolve, reject) => {
                upper(input)(
                )
                lower(input)(
                )
            }
        );
    }
     */
    /**
     * @author fenris
     */
    function knot_bunch(knots) {
        return (function (input) { return function (resolve, reject) {
            var done = false;
            var master_output = {};
            var ready = {};
            var master_resolve = function (id, output) {
                if (!done) {
                    master_output[id] = output;
                    ready[id] = true;
                    if (Object.keys(knots).every(function (id) { return (id in ready); })) {
                        done = true;
                        resolve(master_output);
                    }
                    else {
                    }
                }
                else {
                }
            };
            var master_reject = function (id, error) {
                if (!done) {
                    done = true;
                    reject(error);
                }
                else {
                }
            };
            Object.keys(knots).forEach(function (id) {
                knots[id](input)(function (output) { return master_resolve(id, output); }, function (error) { return master_reject(id, error); });
            });
        }; });
    }
    lib_call.knot_bunch = knot_bunch;
    /**
     * @author frac
     */
    function knot_condense(knots) {
        return (function (input) { return knot_chain(knots.map(function (knot) { return function (list) { return function (resolve, reject) {
            knot(input)(function (element) { return resolve(list.concat([element])); }, reject);
        }; }; }))([]); });
    }
    lib_call.knot_condense = knot_condense;
})(lib_call || (lib_call = {}));
var plain_text_to_html = function (text) {
    var ret = text;
    ret = ret.replace(/  /g, "&nbsp;&nbsp;"); // convert multiple whitespace to forced ones
    ret = ret.split("\n").join("<br/>");
    return ret;
};
/**
 * @desc makes a valid
 */
var format_sentence = function (str, rtl, caseSense) {
    if (rtl === void 0) { rtl = false; }
    if (caseSense === void 0) { caseSense = true; }
    if (str === "") {
        return str;
    }
    else {
        var marks = {
            ".": true,
            "?": true,
            "!": true
        };
        var default_mark = ".";
        var ret = str.split("");
        if (!rtl) {
            ret[0] = ret[0].toLocaleUpperCase();
            if (!(ret[ret.length - 1] in marks)) {
                ret.push(default_mark);
            }
        }
        else {
            ret[ret.length - 1] = ret[ret.length - 1].toLocaleUpperCase();
            if (!(ret[0] in marks)) {
                ret.unshift(default_mark);
            }
        }
        return ret.join("");
    }
};
var fill_string_template = function (template_string, object, fabric, delimiter, default_string) {
    if (fabric === void 0) { fabric = function (object, key) { return object[key]; }; }
    if (delimiter === void 0) { delimiter = "%"; }
    if (default_string === void 0) { default_string = null; }
    function get_tags(str) {
        var r = new RegExp(delimiter + "[^\\s^" + delimiter + "]+" + delimiter, "gi");
        return ((str.match(r) || []).map(function (e) {
            return e.slice(delimiter.length, e.length - delimiter.length);
        }));
    }
    function replace_tag(str, tag, value) {
        var r = new RegExp(delimiter + tag + delimiter, "gi");
        return str.replace(r, value);
    }
    function replace_tags(str, obj) {
        return (get_tags(str).reduce(function (ret, key) {
            var value = "";
            try {
                value = fabric(obj, key);
                if (value === void 0) {
                    value = default_string;
                }
            }
            catch (e) {
                console.warn("invalid placeholder " + key);
                value = default_string;
            }
            return replace_tag(ret, key, value);
        }, str));
    }
    return replace_tags(template_string, object);
};
var make_string_template = function (_template, _fabrics) {
    if (_fabrics === void 0) { _fabrics = {}; }
    function replace_tag(str, tag, value) {
        var r = new RegExp("%" + tag + "%", "gi");
        return str.replace(r, value);
    }
    function replace_tags(str, obj) {
        return (Object.keys(obj).reduce(function (ret, key) {
            return replace_tag(ret, key, _fabrics[key] || obj[key]);
        }, str));
    }
    return (function (tags) {
        return replace_tags(_template, tags);
    });
};
var make_eml_header = (function () {
    var _template = "";
    _template += "From: %from%\n";
    _template += "To: %recipient%\n";
    _template += "Subject: %subject%\n";
    _template += "X-Mailer: greenscale-plankton.emlgen\n";
    return make_string_template(_template);
})();
var make_eml_body = (function () {
    var exports = {};
    exports["simple_body"] = make_string_template("Content-Type: %contenttype%\n\n%body%\n\n");
    // very basic implementation
    // parts = [{contenttype:"text/html; charset=UTF-8", body: "<h1>foo</h1>" }, {...}]
    exports["body_boundrary"] = function (parts, boundrary) {
        var _template = "";
        _template += "--%boundrary%\n";
        _template += "Content-Type: %contenttype%\n\n%body%\n\n";
        //_template += "--%boundrary%--\n\n";
        var maker = make_string_template(_template);
        return (parts.reduce(function (prev, curr) {
            curr.boundrary = boundrary;
            return [prev, maker(curr)].join("");
        }, ""));
    };
    // body must be base64 encoded!
    exports["attachment_boundrary"] = function (parts, boundrary) {
        var _template = "";
        _template += "--%boundrary%\n";
        _template += "Content-Type: %contenttype%\n";
        _template += "Content-Transfer-Encoding: base64\n";
        _template += "Content-Disposition: %disposition%; filename=\"%name%\"\n\n";
        _template += "%body%\n\n";
        //_template += "--%boundrary%--\n\n";
        var maker = make_string_template(_template);
        return (parts.reduce(function (prev, curr) {
            curr.boundrary = boundrary;
            if (curr.disposition === void 0)
                curr.disposition = "inline";
            return [prev, maker(curr)].join("");
        }, ""));
    };
    exports["gen_boundrary"] = function () {
        return ("xxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }));
    };
    // simple implementation without alternatives (old rfc)
    exports["complete_boundrary"] = function (bodyparts, attachments) {
        var ret = "";
        var boundrary = exports["gen_boundrary"]();
        ret += exports["body_boundrary"](bodyparts, boundrary);
        ret += exports["attachment_boundrary"](attachments, boundrary);
        ret += "--" + boundrary + "--\n\nINVISIBLE!!!!";
        return (exports["simple_body"]({
            "contenttype": sprintf("multipart/mixed; boundary=%s", [boundrary]),
            "body": ret
        }));
    };
    return exports;
})();
///<reference path="../../base/build/logic.d.ts"/>
var lib_string;
(function (lib_string) {
    /**
     * @author frac
     */
    var hexdigits = 4;
    /**
     * @author frac
     */
    var index_max = 1 << (4 * hexdigits);
    /**
     * @author frac
     */
    var index_is = 0;
    /**
     * @author neuc,frac
     */
    function empty(str) {
        var tmp = str.trim();
        return (tmp === "");
    }
    lib_string.empty = empty;
    /**
     * @desc returns a unique string
     * @param {string} prefix an optional prefix for the generated string
     * @return {string}
     * @author frac
     */
    function generate(prefix) {
        if (prefix === void 0) { prefix = "string_"; }
        if (index_is > index_max) {
            throw (new Error("[string_generate] out of valid indices"));
        }
        else {
            return sprintf(prefix + "%0" + hexdigits.toString() + "X", [index_is++]);
        }
    }
    lib_string.generate = generate;
    /**
     * @desc splits a string, but returns an empty list, if the string is empty
     * @param {string} chain
     * @param {string} separator
     * @return {Array<string>}
     * @author frac
     */
    function split(chain, separator) {
        if (separator === void 0) { separator = " "; }
        if (chain.length == 0) {
            return [];
        }
        else {
            return chain.split(separator);
        }
    }
    lib_string.split = split;
    /**
     * @desc concats a given word with itself n times
     * @param {string} word
     * @param {int}
     * @return {string}
     * @author frac
     */
    function repeat(word, count) {
        return ((count == 0) ? "" : (word + repeat(word, count - 1)));
    }
    lib_string.repeat = repeat;
    /**
     * @desc lengthens a string by repeatedly appending or prepending another string
     * @param {string} word the string to pad
     * @param {int} length the length, which the result shall have
     * @param {string} symbol the string, which will be added (multiple times)
     * @param {boolean} [prepend]; whether to prepend (~true) or append (~false); default: false
     * @return {string} the padded string
     * @author frac
     */
    function pad(word, length, symbol, prepend) {
        if (prepend === void 0) { prepend = false; }
        if (prepend) {
            while (word.length < length)
                word = symbol + word;
            return word.substring(word.length - length);
        }
        else {
            while (word.length < length)
                word = word + symbol;
            return word.substring(0, length);
        }
    }
    lib_string.pad = pad;
    /**
     * @desc checks if a given string conttains a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function contains(chain, part) {
        if (typeof (chain) !== "string")
            return false;
        return (chain.indexOf(part) >= 0);
    }
    lib_string.contains = contains;
    /**
     * @desc checks if a given string starts with a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function startsWith(chain, part) {
        if (typeof (chain) !== "string")
            return false;
        // return (string.indexOf(part) === 0);
        return ((function (m, n) {
            if (n == 0) {
                return true;
            }
            else {
                if (m == 0) {
                    return false;
                }
                else {
                    return ((chain[0] == part[0]) && startsWith(chain.substring(1), part.substring(1)));
                }
            }
        })(chain.length, part.length));
    }
    lib_string.startsWith = startsWith;
    /**
     * @desc checks if a given string ends with a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function endsWith(chain, part) {
        if (typeof (chain) !== "string")
            return false;
        // return (string.lastIndexOf(part) === string.length-part.length);
        return ((function (m, n) {
            if (n == 0) {
                return true;
            }
            else {
                if (m == 0) {
                    return false;
                }
                else {
                    // console.info(("(" + string[m-1] + " == " + part[n-1] + ")") + " = " + String(string[m-1] == part[n-1]));
                    return ((chain[m - 1] == part[n - 1]) && endsWith(chain.substring(0, m - 1), part.substring(0, n - 1)));
                }
            }
        })(chain.length, part.length));
    }
    lib_string.endsWith = endsWith;
    /**
     * @desc count the occourrences of a string in a string
     * @param string haystack_string the string wich should be examined
     * @param string needle_string the string which should be counted
     * @author neuc
     */
    function count_occourrences(haystack_string, needle_string, check_escape) {
        var cnt = 0;
        var pos = -1;
        do {
            pos = haystack_string.indexOf(needle_string, pos + 1);
            if ((!check_escape) || (haystack_string[pos - 1] != "\\")) {
                cnt++;
            }
        } while (pos >= 0);
        return cnt - 1;
    }
    lib_string.count_occourrences = count_occourrences;
    ;
})(lib_string || (lib_string = {}));
/**
 * @desc adapters for old syntax
 */
var string_generate = lib_string.generate;
var string_split = lib_string.split;
var string_repeat = lib_string.repeat;
var string_pad = lib_string.pad;
var string_contains = lib_string.contains;
var string_startsWith = lib_string.startsWith;
var string_endsWith = lib_string.endsWith;
var string_count_occourrences = lib_string.count_occourrences;
// module lib_base {
var pattern = /%([-+#0 ]*)([0-9]*)[\.]{0,1}([0-9]*)([\w]{1})/;
var gpattern = /%([-+#0 ]*)([0-9]*)[\.]{0,1}([0-9]*)([\w]{1})/g;
function split_format(format) {
    var tmp = format.match(pattern);
    if (tmp === null)
        return null;
    return {
        'flags': tmp[1].split(""),
        'width': Number(tmp[2]),
        'precision': tmp[3] === '' ? null : Number(tmp[3]),
        'specifier': tmp[4],
        'string': format
    };
}
function make_err(format, arg, should) {
    return ("[sprintf]" + " " + "argument for '" + format.string + "' has to be '" + should + "' but '" + arg + "' is '" + typeof arg + "'!");
}
function test_arg(format, arg, should) {
    if (typeof arg !== should) {
        console.warn(make_err(format, arg, should));
        return false;
    }
    return true;
}
function string_fill(str, char, len, left) {
    while (str.length < len) {
        if (left) {
            str += char;
        }
        else {
            str = char + str;
        }
    }
    return str;
}
/**
 * the known_parameters are used to parse the different identifiers for the welln known syntax:
 *          flag   width   precision   identifier
 *      %{[0#+- ]}{[0-9]*}.{[0-9]*}[fFdiueEgGsoxXaAsn]
 * flags:
 * 0    -   fill with '0' instead of ' ' if the string length < width
 * #    -   not implemented
 * -    -   left-justified -> fill on the right side to reach width
 * +    -   force using '+' on positive numbers
 * ' '  -   add a single space before positive numbers
 *
 * identifiers
 * %f, %F       -   interpret given number as float, width: the minimal total width (fill with ' ' or '0' if the
 *                  resulting string is too short, precision: cut more then given decimal places
 * %d, %i, %u   -   interpret number as integer, decimal places will be cut. width: like float, precision:
 *                  fill with '0' on right side until length given in precision is reached
 * %e           -   interpret as float and write as scientifical number, width & precision like in float
 * %E           -   same es %e but uppercase 'E'
 * %g           -   use the shortest string of %f or %e
 * %G           -   use the shortest string of %E or %E
 * %s           -   simply print a string
 * %o           -   print the given number in octal notation
 * %x           -   print the given number in hex notation
 * %X           -   same as %x but with uppercase characters
 * %a           -   alias to %x
 * %A           -   alias to %X
 * %n           -   just print nothing
 * @type {{}}
 */
var known_params = {};
known_params["f"] = function (format, arg) {
    if (!test_arg(format, arg, "number"))
        return "Ø";
    var tmp = Math.abs(arg);
    var sign = (arg < 0) ? -1 : 1;
    var tmp_result = null;
    if (format.precision !== null) {
        tmp = Math.floor(Math.pow(10, format.precision) * tmp) / Math.pow(10, format.precision);
        var tmp_ = (tmp * sign).toString().split(".");
        if (tmp_.length === 1)
            tmp_.push("");
        tmp_[1] = string_fill(tmp_[1], "0", format.precision, true);
        tmp_result = tmp_.join(".");
    }
    else {
        tmp_result = (sign * tmp).toString();
    }
    if ((format.flags.indexOf(" ") >= 0) && (arg >= 0)) {
        tmp_result = " " + tmp;
    }
    else if ((format.flags.indexOf("+") >= 0) && (arg >= 0)) {
        tmp_result = "+" + tmp;
    }
    tmp_result = string_fill(tmp, (format.flags.indexOf("0") >= 0) ? "0" : " ", format.width, (format.flags.indexOf("-") >= 0));
    return tmp_result;
};
known_params["F"] = known_params["f"];
known_params["d"] = function (format, arg) {
    if (!test_arg(format, arg, 'number'))
        return 'Ø';
    var tmp = (((arg < 0 && format.specifier !== 'u') ? -1 : 1) * Math.floor(Math.abs(arg))).toString();
    if ((format.specifier === 'd' || format.specifier === 'i') && format.flags.indexOf(' ') >= 0 && arg >= 0) {
        tmp = ' ' + tmp;
    }
    else if ((format.specifier === 'd' || format.specifier === 'i') && format.flags.indexOf('+') >= 0 && arg >= 0) {
        tmp = '+' + tmp;
    }
    tmp = string_fill(tmp, format.flags.indexOf('0') >= 0 ? '0' : ' ', format.width, format.flags.indexOf('-') >= 0);
    tmp = string_fill(tmp, '0', format.precision === null ? 0 : format.precision, false);
    return tmp;
};
known_params["i"] = known_params["d"];
known_params["u"] = known_params["d"];
known_params["e"] = function (format, arg) {
    if (!test_arg(format, arg, 'number'))
        return 'Ø';
    var tmp = arg.toExponential(format.precision === null ? undefined : format.precision).toString();
    if (format.flags.indexOf(' ') >= 0 && arg >= 0) {
        tmp = ' ' + tmp;
    }
    else if (format.flags.indexOf('+') >= 0 && arg >= 0) {
        tmp = '+' + tmp;
    }
    tmp = string_fill(tmp, format.flags.indexOf('0') >= 0 ? '0' : ' ', format.width, format.flags.indexOf('-') >= 0);
    return tmp;
};
known_params["E"] = function (format, arg) {
    return known_params["e"](format, arg).toUpperCase();
};
known_params["g"] = function (format, arg) {
    if (!test_arg(format, arg, 'number'))
        return 'Ø';
    var tmpf = known_params["f"](format, arg);
    var tmpe = known_params["e"](format, arg);
    if (tmpf.length < tmpe.length) {
        return tmpf;
    }
    else {
        return tmpe;
    }
};
known_params["G"] = function (format, arg) {
    return known_params["g"](format, arg).toUpperCase();
};
known_params["s"] = function (format, arg) {
    if (!test_arg(format, arg, 'string'))
        return 'o.O';
    var tmp = format.precision !== null ? arg.substr(0, format.precision) : arg;
    tmp = string_fill(tmp, format.flags.indexOf('0') >= 0 ? '0' : ' ', format.width, format.flags.indexOf('-') >= 0);
    return tmp;
};
known_params["o"] = function (format, arg) {
    if (!test_arg(format, arg, 'number'))
        return 'Ø';
    var tmp = Math.floor(Math.round(Math.abs(arg))) * ((arg < 0) ? -1 : 1);
    return known_params["s"](format, tmp.toString(8));
};
known_params["x"] = function (format, arg) {
    if (!test_arg(format, arg, 'number'))
        return 'Ø';
    var tmp = Math.floor(Math.round(Math.abs(arg))) * ((arg < 0) ? -1 : 1);
    return known_params["s"](format, tmp.toString(16));
};
known_params["a"] = known_params["x"];
known_params["X"] = function (format, arg) {
    if (!test_arg(format, arg, 'number'))
        return 'Ø';
    return known_params["x"](format, arg).toUpperCase();
};
known_params["A"] = known_params["X"];
known_params["c"] = function (format, arg) {
    var tmp = "";
    if (typeof arg === "number") {
        tmp = String.fromCharCode(arg);
    }
    else if ((typeof arg === "string") && (arg.length === 1)) {
        tmp = arg[0];
    }
    else {
        console.warn(make_err(format, arg, "number|string") + " and if string it needs to have the length of 1!");
    }
    return known_params["s"](format, tmp);
};
known_params["n"] = function () {
    return "";
};
var decompose = function (chain, regexp) {
    var result = regexp.exec(chain);
    if (result == null) {
        return null;
    }
    else {
        var front = chain.substring(0, result.index);
        var back = chain.substring(result.index + result[0].length);
        return { "front": front, "match": result[0], "back": back };
    }
};
/**
 * an implementation of c sprintf
 * @param {string} string format string
 * @param {array} args arguments which should be filled into
 * @returns {string}
 */
/*export*/ var sprintf = function (input, args, original) {
    if (args === void 0) { args = []; }
    if (original === void 0) { original = null; }
    if (original == null)
        original = input;
    var components = decompose(input, pattern);
    if (components == null) {
        if (args.length > 0) {
            console.warn("[sprintf] superfluous arguments while formatting '" + original + "': ", args);
        }
        return input;
    }
    else {
        var arg;
        var rest;
        if (args.length > 0) {
            arg = args[0];
            rest = args.slice(1);
        }
        else {
            console.warn("[sprintf] out of arguments while formatting '" + original + "'");
            arg = null;
            rest = [];
            return input;
        }
        var fmt = split_format(components["match"]);
        return (components["front"]
            + known_params[fmt.specifier](fmt, arg)
            + sprintf(components["back"], rest, original));
    }
};
/**
 * an implementation of c printf
 * @param {string} string format string
 * @param {array} args arguments which should be filled into
 * @returns {string}
 */
/*export*/ function printf(format, args) {
    console.log(sprintf(format, args));
}
// }
/**
 * @author neuc
 */
var strftime;
(function (strftime) {
    var currentDate = new Date();
    var days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    var months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];
    function set_days(day_names) {
        days = day_names;
    }
    strftime.set_days = set_days;
    function set_months(month_names) {
        months = month_names;
    }
    strftime.set_months = set_months;
    // source: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    function helper_dayOfYear(date) {
        var start = new Date(date.getFullYear(), 0, 0);
        var diff = date - start;
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
    // source: http://weeknumber.net/how-to/javascript
    function helper_weekOfYear(date_) {
        var date = new Date(date_.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    }
    function helper_englishWeekOfYear(date) {
        var nr = helper_weekOfYear(date);
        if (date.getDay() === 0) {
            nr = nr - 1;
        }
        return nr;
    }
    function set_currentDate(date) {
        currentDate = date;
    }
    strftime.set_currentDate = set_currentDate;
    function parse(format, date) {
        if (!date) {
            date = currentDate;
        }
        var ret = format;
        var re = new RegExp("%[a-z]", "gi");
        var match;
        while (match = re.exec(format)) {
            ret = ret.replace(match[0], parse_segment(match[0], date));
        }
        return ret;
    }
    strftime.parse = parse;
    function parse_segment(segment, date) {
        if (!date) {
            date = currentDate;
        }
        var hm_segments = {
            "%a": function () { return days[date.getDay()].slice(0, 3); },
            "%A": function () { return days[date.getDay()]; },
            "%b": function () { return days[date.getMonth()].slice(0, 3); },
            "%B": function () { return days[date.getMonth()]; },
            "%c": function () { return date.toLocaleString(); },
            "%C": function () { return Math.floor((date.getFullYear()) / 100).toString(); },
            "%d": function () { return sprintf("%02d", [date.getDate()]); },
            "%D": function () { return parse("%m/%d/%y", date); },
            "%e": function () { return sprintf("%2d", [date.getDate()]); },
            "%F": function () { return parse("%Y-%m-%d", date); },
            "%g": function () { return sprintf("%02d", [date.getFullYear() % 1000]); },
            "%G": function () { return date.getFullYear().toString(); },
            "%h": function () { return parse("%b", date); },
            "%H": function () { return sprintf("%02d", [date.getHours()]); },
            "%I": function () {
                return sprintf("%02d", [
                    (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())
                ]);
            },
            "%j": function () { return sprintf("%03d", [helper_dayOfYear(date)]); },
            "%m": function () { return sprintf("%02d", [date.getMonth() + 1]); },
            "%M": function () { return sprintf("%02d", [date.getMinutes()]); },
            "%n": function () { return "\n"; },
            "%p": function () { return (date.getHours() > 12 ? "PM" : "AM"); },
            "%r": function () { return parse("%I:%M:%S %p", date); },
            "%R": function () { return parse("%H:%M", date); },
            "%S": function () { return date.getSeconds().toString(); },
            "%t": function () { return "\t"; },
            "%T": function () { return parse("%H:%M:%S", date); },
            "%u": function () { return sprintf("%02d", [(date.getDay() === 0 ? 7 : date.getDay())]); },
            "%U": function () { return sprintf("%02d", [helper_englishWeekOfYear(date)]); },
            "%V": function () { return sprintf("%02d", [helper_weekOfYear(date)]); },
            "%w": function () { return sprintf("%02d", [date.getDay().toString()]); },
            "%W": function () { return parse("%w", date); },
            "%x": function () { return parse("%m/%d/%G", date); },
            "%X": function () { return parse("%T", date); },
            "%y": function () { return parse("%g", date); },
            "%Y": function () { return parse("%G", date); },
            "%z": function () { return date.getTimezoneOffset().toString(); },
            "%Z": function () { return date.toUTCString().split(' ').pop(); },
            "%%": function () { return "%"; }
        };
        if (!(segment in hm_segments)) {
            throw "unknown format argument '" + segment + "'";
        }
        return hm_segments[segment]();
    }
})(strftime || (strftime = {}));
function locale_date(date, ignore_error) {
    if (date === void 0) { date = new Date(); }
    if (ignore_error === void 0) { ignore_error = false; }
    if (!(date instanceof Date)) {
        if (!ignore_error) {
            throw new SyntaxError("date must be instance of Date");
        }
        else {
            console.warn("'" + date + "' seems not to be instance of Date try to force convert.");
            var tmp = date;
            date = new Date(tmp);
            if ((date.toString() === "Invalid Date") ||
                (!(date < new Date(0)) && !(date > new Date(0)))) {
                console.warn("conversion didn't work, returning default value");
                return "Ø";
            }
        }
    }
    var conf = global_config.get_value("date") || {
        "use_locale_date": true,
        "format_string": "%d.%m.%Y"
    };
    if (conf.use_locale_date) {
        return date.toLocaleDateString();
    }
    else {
        return strftime.parse(conf.format_string, date);
    }
}
;
///<reference path="../../call/build/logic.d.ts"/>
var make_logger = (function () {
    var _loggers = {};
    var make_logger = function (prefix, current_loglevel) {
        var log = [];
        var level = [
            "LOG", "INFO", "WARNING", "DEBUG"
        ];
        var logger = function (obj, lvl) {
            var txt = obj.txt || obj;
            if (!lib_call.is_def(lvl))
                lvl = 0;
            var date = new Date();
            log.push({
                "message": sprintf("%s [%s:%s] %s", [date.toString(), level[lvl], prefix, txt]),
                "timeStamp": +(date)
            });
            if (lvl <= current_loglevel) {
                var msg = ["[" + prefix + "]", txt];
                if (obj.arg)
                    msg = ["[" + prefix + "]"].concat(Array.prototype.slice.call(obj.arg));
                if (lvl === 0)
                    console["_log"].apply(console, msg);
                else if (lvl === 1)
                    console["_info"].apply(console, msg);
                else if (lvl === 2)
                    console["_warn"].apply(console, msg);
                else if (lvl >= 3)
                    console["_log"].apply(console, msg);
            }
        };
        _loggers[prefix] = {
            "logger": logger,
            "log": log
        };
        return logger;
    };
    make_logger["loggers"] = _loggers;
    make_logger["complete_log"] = function () {
        var logs = Object.keys(_loggers)
            .reduce(function (p, c) {
            return [].concat(p, _loggers[c].log);
        }, []);
        logs.sort(function (x, y) {
            return ((x.timeStamp > y.timeStamp) ? -1 : +1);
        });
        return logs.map(function (x, i, a) {
            return x.message;
        });
    };
    if (true) {
        var _log_all = function (log, lvl, next) {
            if (next === void 0) { next = function () { }; }
            return function () {
                var msg = [];
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] === "string") {
                        msg.push(arguments[i]);
                    }
                    else {
                        msg.push(JSON.stringify(arguments[i]));
                    }
                }
                var obj = {
                    txt: msg.join("\t"),
                    arg: arguments
                };
                log(obj, lvl);
                next();
            };
        };
        {
            var __warn = make_logger("deprecated console.warn", 99);
            var __error = make_logger("deprecated console.error", 99);
            var __log = make_logger("deprecated console.log", 99);
            var __info = make_logger("deprecated console.info", 99);
            // bad ass
            console["_log"] = console.log;
            console["_error"] = console.error;
            console["_warn"] = console.warn;
            console["_info"] = console.info;
        }
    }
    return make_logger;
})();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../base/build/logic.d.ts"/>
///<reference path="../../string/build/logic.d.ts"/>
/**
 * @author fenris
 */
var lib_xml;
(function (lib_xml) {
    /**
     * @author fenris
     */
    var class_node = (function () {
        function class_node() {
        }
        return class_node;
    }());
    lib_xml.class_node = class_node;
    /**
     * @author fenris
     */
    var class_node_text = (function (_super) {
        __extends(class_node_text, _super);
        /**
         * @author fenris
         */
        function class_node_text(content) {
            _super.call(this);
            this.content = content;
        }
        /**
         * @author fenris
         */
        class_node_text.prototype.compile = function (depth) {
            if (depth === void 0) { depth = 0; }
            return (lib_string.repeat("\t", depth) + this.content + "\n");
        };
        return class_node_text;
    }(class_node));
    lib_xml.class_node_text = class_node_text;
    /**
     * @author fenris
     */
    var class_node_comment = (function (_super) {
        __extends(class_node_comment, _super);
        /**
         * @author fenris
         */
        function class_node_comment(content) {
            _super.call(this);
            this.content = content;
        }
        /**
         * @author fenris
         */
        class_node_comment.prototype.compile = function (depth) {
            if (depth === void 0) { depth = 0; }
            return (lib_string.repeat("\t", depth) + "<!-- " + this.content + " -->" + "\n");
        };
        return class_node_comment;
    }(class_node));
    lib_xml.class_node_comment = class_node_comment;
    /**
     * @author fenris
     */
    var class_node_complex = (function (_super) {
        __extends(class_node_complex, _super);
        /**
         * @author fenris
         */
        function class_node_complex(name, attributes, children) {
            if (attributes === void 0) { attributes = {}; }
            if (children === void 0) { children = []; }
            _super.call(this);
            this.name = name;
            this.attributes = attributes;
            this.children = children;
        }
        /**
         * @author fenris
         */
        class_node_complex.prototype.compile = function (depth) {
            var _this = this;
            if (depth === void 0) { depth = 0; }
            var output = "";
            var attributes = Object.keys(this.attributes).map(function (key) { return (" " + key + "=" + ("\"" + _this.attributes[key] + "\"")); }).join("");
            output += (lib_string.repeat("\t", depth) + "<" + this.name + attributes + ">" + "\n");
            this.children.forEach(function (child) { return (output += child.compile(depth + 1)); });
            output += (lib_string.repeat("\t", depth) + "</" + this.name + ">" + "\n");
            return output;
        };
        return class_node_complex;
    }(class_node));
    lib_xml.class_node_complex = class_node_complex;
})(lib_xml || (lib_xml = {}));
///<reference path="../../base/build/logic.d.ts"/>
var lib_object;
(function (lib_object) {
    /**
     * @author fenris
     */
    function fetch(object, fieldname, fallback, escalation) {
        if (fallback === void 0) { fallback = null; }
        if (escalation === void 0) { escalation = 1; }
        if ((fieldname in object) && (object[fieldname] !== undefined)) {
            return object[fieldname];
        }
        else {
            switch (escalation) {
                case 0: {
                    return fallback;
                }
                case 1: {
                    var message = ("field '" + fieldname + "' not in structure");
                    message += ("; using fallback value '" + String(fallback) + "'");
                    // console.warn(message);
                    return fallback;
                }
                case 2: {
                    var message = ("field '" + fieldname + "' not in structure");
                    throw (new Error(message));
                }
                default: {
                    throw (new Error("invalid escalation level " + escalation));
                }
            }
        }
    }
    lib_object.fetch = fetch;
    /**
     * @author fenris
     */
    function map(object_from, transformator) {
        var object_to = {};
        Object.keys(object_from).forEach(function (key) { return (object_to[key] = transformator(object_from[key], key)); });
        return object_to;
    }
    lib_object.map = map;
    /**
     * @author fenris
     */
    function from_array(array) {
        var object = {};
        array.forEach(function (entry) { return (object[entry.key] = entry.value); });
        return object;
    }
    lib_object.from_array = from_array;
    /**
     * @author fenris
     */
    function to_array(object) {
        var array = [];
        Object.keys(object).forEach(function (key) { return array.push({ "key": key, "value": object[key] }); });
        return array;
    }
    lib_object.to_array = to_array;
    /**
     * @author fenris
     */
    function values(object) {
        return to_array(object).map(function (entry) { return entry.value; });
    }
    lib_object.values = values;
    /**
     * @author fenris
     */
    function path_read(object, path, fallback, escalation) {
        if (fallback === void 0) { fallback = null; }
        if (escalation === void 0) { escalation = 1; }
        var steps = ((path.length == 0) ? [] : path.split("."));
        if (steps.length == 0) {
            throw (new Error("empty path"));
        }
        else {
            var position_1 = object;
            var reachable = steps.slice(0, steps.length - 1).every(function (step) {
                position_1 = object_fetch(position_1, step, null, 0);
                return (position_1 != null);
            });
            if (reachable) {
                return object_fetch(position_1, steps[steps.length - 1], fallback, escalation);
            }
            else {
                return object_fetch({}, "_dummy_", fallback, escalation);
            }
        }
    }
    lib_object.path_read = path_read;
    /**
     * @author fenris
     */
    function path_write(object, path, value, construct) {
        if (construct === void 0) { construct = true; }
        var steps = ((path.length == 0) ? [] : path.split("."));
        if (steps.length == 0) {
            throw (new Error("empty path"));
        }
        else {
            var position_2 = object;
            var reachable = steps.slice(0, steps.length - 1).every(function (step) {
                var position_ = object_fetch(position_2, step, null, 0);
                if (position_ == null) {
                    if (construct) {
                        position_2[step] = {};
                        position_2 = position_2[step];
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    position_2 = position_;
                    return true;
                }
            });
            if (reachable) {
                position_2[steps[steps.length - 1]] = value;
            }
            else {
                throw (new Error("path " + path + " does not exist and may not be constructed"));
            }
        }
    }
    lib_object.path_write = path_write;
    /**
     * @author fenris
     */
    function matches(object, pattern) {
        return Object.keys(pattern).every(function (key) { return (pattern[key] == object[key]); });
    }
    lib_object.matches = matches;
})(lib_object || (lib_object = {}));
/**
 * @desc adapters for old syntax
 * @author fenris
 */
var object_fetch = lib_object.fetch;
var object_map = lib_object.map;
var object_a2o = lib_object.from_array;
var object_o2a = lib_object.to_array;
var object_matches = lib_object.matches;
///<reference path="../../base/build/logic.d.ts"/>
///<reference path="../../string/build/logic.d.ts"/>
/**
 * @param {Object} map
 * @return {string}
 * @author frac
 */
/*export*/ var object_map2string = function (map) {
    return (" " + Object.keys(map)
        .filter(function (key) { return (key != "isMapped"); })
        .map(function (key) { return ("" + ((map[key] == null) ? "-" : map[key].toString()) + ""); })
        .join(" ")
        + "");
};
/**
 * @param {Array} array
 * @return {string}
 * @author frac
 */
/*export*/ var object_array2string = function (array) {
    return ("" + array.map(function (element, index) {
        switch (typeof (element)) {
            case "object": return object_map2string(element);
            default: return String(element);
        }
    }).join(",") + "");
};
/**
 * @desc follows a path in an object-tree
 * @param {Object} object the object in which the path lies
 * @param {string} path the steps
 * @param {boolean} [create] whether to create not yet existing branches
 * @return {Object} {'successful': successful, 'position': position} where the branch or leaf at the end of the path
 * @author frac
 */
var object_path_walk = function (object, path, create, null_on_missing) {
    if (create === void 0) { create = true; }
    if (null_on_missing === void 0) { null_on_missing = false; }
    var steps = ((path == "") ? [] : path.split("."));
    if (steps.length == 0) {
        return object;
    }
    else {
        var head = steps[0];
        // create
        {
            if (!(head in object)) {
                if (create) {
                    var value = null;
                    if (steps.length >= 2) {
                        var next = steps[1];
                        var index = parseInt(next);
                        if (!isNaN(index)) {
                            value = [];
                        }
                        else {
                            value = {};
                        }
                    }
                    else {
                        value = {};
                    }
                    object[head] = value;
                }
                else {
                    // console.info("[object_path_walk] object is ", object);
                    var message = "[object_path_walk] can not walk step \u00BB" + head + "\u00AB in path \u00BB" + path + "\u00AB on object";
                    if (null_on_missing) {
                        console.warn(message);
                        return null;
                    }
                    else {
                        throw (new Error(message));
                    }
                }
            }
        }
        // execute rest
        {
            var object_ = object[head];
            var path_ = steps.slice(1).join(".");
            return object_path_walk(object_, path_, create, null_on_missing);
        }
    }
    /*
    return (
        string_split(path, ".").reduce(
            function (position : any, step : string) : any {
                if (! lib_call.is_def(position[step], true)) {
                    if (create) {
                        position[step] = {};
                    }
                    else {
                        // console.info("[object_path_walk] object is ", object);
                        let message : string = sprintf("[object_path_walk] can not walk step »%s« in path »%s« on object", [step, path]);
                        if (null_on_missing) {
                            console.warn(message);
                            return null;
                        }
                        else {
                            throw (new Error(message));
                        }
                    }
                }
                return position[step];
            },
            object
        )
    );
     */
};
/**
 * @desc reads a branch/leaf from an object-tree
 * @author frac
 */
/*export*/ var object_path_read = function (object, path, null_on_missing) {
    if (null_on_missing === void 0) { null_on_missing = false; }
    return object_path_walk(object, path, false, null_on_missing);
};
/**
 * @desc writes a branch/leaf to an object-tree
 * @author frac
 */
/*export*/ var object_path_write = function (object, path, value) {
    // for "initializing" the object (important if the value to write is an entry in a yet not existing array)
    /*let old : any = */ object_path_walk(object, path, true, true);
    var steps = ((path == "") ? [] : path.split("."));
    var position = object_path_walk(object, steps.slice(0, steps.length - 1).join("."), true);
    if (position == undefined) {
        console.warn("can't set \u00BB" + steps[steps.length - 1] + "\u00AB in undefined");
    }
    else {
        position[steps[steps.length - 1]] = value;
    }
};
/*export*/ var object_object_path_write_ex = function (obj, path, val) {
    var ref = obj;
    var paths = path.split(".");
    var i;
    for (i = 0; i < paths.length - 1; i++) {
        if (ref[paths[i]] === void 0) {
            if (/^(0|[1-9][0-9]*)$/.test(paths[i + 1])) {
                ref[paths[i]] = [];
            }
            else {
                ref[paths[i]] = {};
            }
        }
        ref = ref[paths[i]];
    }
    ref[paths[i]] = val;
};
/**
 * @desc filters branches from an object
 * @param {Object} object the object to read from
 * @param {Array} paths a list of string-lists, that are the paths to be propagated
 * @return {Object} the object with only the selected branches
 * @author frac
 */
/*export*/ var object_path_filter = function (object, paths) {
    var result = {};
    paths.forEach(function (path) {
        var value = null;
        try {
            value = object_path_read(object, path);
        }
        catch (exception) {
            console.warn(exception);
        }
        if (value != null) {
            object_path_write(result, path, value);
        }
        else {
            console.warn("skipped path \"" + path + "\" while filtering");
        }
    });
    return result;
};
/**
 * @desc dunno… returns a list of object-paths?
 * @param {Object} object
 * @param {string} p
 * @todo can probably be merged with getLeafg
 */
/*export*/ var object_path_list = function (object, path, visited) {
    if (path === void 0) { path = null; }
    if (visited === void 0) { visited = []; }
    var result = [];
    visited.push(object);
    for (var key in object) {
        var value = object[key];
        if (visited.indexOf(value) === -1) {
            var key_ = (path == null) ? key : (path + "." + key);
            if (typeof (value) === "object") {
                result = result.concat(object_path_list(value, key_, visited));
            }
            else {
                result.push({ "key": key_, "value": value });
            }
        }
    }
    return result;
};
/**
 * theroreticaly loop prof walk through all elements and subelements of an object
 * and call a callback for each entry
 * @param {object} obj object to iterate through
 * @param {function} callback
 */
/*export*/ var object_iterate = function (obj, callback, leafs_only, path, visited) {
    if (leafs_only === void 0) { leafs_only = false; }
    if (visited === void 0) { visited = []; }
    var have_seen = function (ob) {
        return visited.some(function (e) { return ((typeof ob === "Object") && (ob !== null) && (e === ob)); });
    };
    var next = [];
    Object.keys(obj).forEach(function (key) {
        var elem = obj[key];
        if (!have_seen(elem)) {
            visited.push(elem);
            var _path = "";
            if (typeof path === "undefined") {
                _path = key;
            }
            else {
                _path += [path, key].join(".");
            }
            if (!leafs_only)
                callback(_path, elem, key);
            if (typeof (elem) === "object") {
                (function (elem_, callback_, _path_, visited_) {
                    next.push(function () { object_iterate(elem_, callback_, leafs_only, _path_, visited_); });
                })(elem, callback, _path, visited);
            }
            else {
                if (leafs_only)
                    callback(_path, elem, key);
            }
        }
    });
    var func;
    while (func = next.shift()) {
        func();
    }
};
/**
 * @desc get the leaf-nodes of an object
 * @param {object} object
 * @return {Array<string>} a list containing all leaf-nodes
 * @author frac
 */
/*export*/ var getLeafs = function (object) {
    var skip = {
        "className": true,
        "timeStamp": true,
        "parentId": true,
        "transactionID": true,
        "guid": true,
        "_id": true,
        "parents": true,
        "children": true
    };
    return (Object.keys(object).reduce(function (leafs, key) {
        try {
            var value = object[key];
            if (key in skip) {
                console.warn("skipping field \"" + key + "\"");
                return leafs;
            }
            else {
                if ((typeof (value) === "object") && (value != null)) {
                    return leafs.concat(getLeafs(value).map(function (leaf) { return (key + "." + leaf); }));
                }
                else {
                    return leafs.concat([key]);
                }
            }
        }
        catch (exception) {
            console.warn(exception);
            console.info("key: ", key);
            return null;
        }
    }, new Array()));
};
/**
 *
 * @desc merges two arrays by probing
 * @param {Array} core
 * @param {Array} mantle
 * @param {function} match
 */
/*export*/ var merge_array = function (core, mantle, match) {
    if (match === void 0) { match = (function (x, y) { return (x === y); }); }
    if ((core == undefined) || (mantle == undefined)) {
        throw (new Error("Error: "
            + ((core == undefined) ? " core must be an array and not '" + typeof (core) + "'" : "")
            + ((mantle == undefined) ? " mantle must be an array and not '" + typeof (mantle) + "'" : "")));
    }
    var ret = core;
    for (var i = 0; i < mantle.length; i++) {
        var entry = mantle[i];
        try {
            var matching_index = core.find(function (element) { return match(element, entry); });
            ret[matching_index] = object_merge_objects(core[matching_index], entry);
        }
        catch (e) {
            ret.push(entry);
        }
    }
    return ret;
};
/**
 * @author frac
 */
function object_clash(x, y) {
    var z = {};
    Object.keys(x).forEach(function (key) { return (z[key] = x[key]); });
    Object.keys(y).forEach(function (key) { return (z[key] = y[key]); });
    return z;
}
/**
 * @desc merges two objects recursivly
 * @param {Object} object1 core
 * @param {Object} object2 mantle
 * @param {Array} [ignore_keys]
 * @param [do_not_overwrite_existing_values]
 * @returns {Object} a clone of object1 will be returned
 */
/*export*/ var object_merge_objects = function (object1, object2, ignore_keys, do_not_overwrite_existing_values, ignore_null, path) {
    if (object1 === void 0) { object1 = null; }
    if (object2 === void 0) { object2 = null; }
    if (ignore_keys === void 0) { ignore_keys = ["parents"]; }
    if (do_not_overwrite_existing_values === void 0) { do_not_overwrite_existing_values = false; }
    if (ignore_null === void 0) { ignore_null = false; }
    if (path === void 0) { path = []; }
    if (object1 == null) {
        if (object2 instanceof Array) {
            object1 = [];
        }
        else {
            object1 = {};
        }
    }
    var iteration_keys = Object.keys(object2);
    if (ignore_keys === []) {
        if (path.indexOf(object2) >= 0)
            return undefined;
        path.push(object2);
    }
    //
    for (var i = 0; i < iteration_keys.length; i += 1) {
        var key = iteration_keys[i];
        if (ignore_keys.some(function (k) {
            return key == k;
        })) {
        }
        else if (object2[key] === null) {
            if (!ignore_null)
                object1[key] = null;
        }
        else if ((typeof (object2[key]) === "object") && ((typeof (object1[key]) === "object") || (typeof (object1[key]) === "undefined"))) {
            object1[key] = object_merge_objects(object1[key], object2[key], ignore_keys, do_not_overwrite_existing_values, ignore_null, path);
        }
        else {
            if ((do_not_overwrite_existing_values === false) || (typeof (object1[key]) === "undefined")) {
                object1[key] = object2[key];
            }
        }
    }
    return object1;
};
/*
 * @param {object} recipie  ex: { "name" : { extract : function(o) { return o["name"]; }}}
 * */
var flatten_object = function (obj, recipie, drop_key) {
    if (drop_key === void 0) { drop_key = (function (k) { return ["parents", "parent", "children"].indexOf(k) > -1; }); }
    var ret = {};
    for (var key in recipie) {
        if (!drop_key(key)) {
            var prefix = (recipie[key].prefix || "");
            var recursive = (recipie[key].recursive || -1);
            var extract = (recipie[key].extract || (function (x) { return x; }));
            var _obj = extract(obj[key]);
            if ((_obj !== null) && ((typeof _obj == "object") || (obj[key] instanceof Array)) && (!(recursive == 0))) {
                var tmp = {};
                var _recipie = {};
                for (var _i = 0, _a = Object.keys(_obj); _i < _a.length; _i++) {
                    var k = _a[_i];
                    _recipie[k] = {
                        "prefix": (prefix + key + "."),
                        "recursive": (recursive - 1),
                        "extract": (function (x) { return x; })
                    };
                }
                tmp = flatten_object(_obj, _recipie, drop_key);
                ret = object_merge_objects(ret, tmp);
            }
            else {
                ret[prefix + key] = _obj;
            }
        }
    }
    return ret;
};
/**
 * use the complete path of an objects entry as key to make an one dimensional object
 * @param {object} object the object which should be moade flat
 * @param {string} [path] for the recursive call the current path
 */
/*export*/ var object_make_flat = function (object, path, filter, split_char, objects) {
    if (path === void 0) { path = null; }
    if (filter === void 0) { filter = ["parent", "children"]; }
    if (split_char === void 0) { split_char = "."; }
    if (objects === void 0) { objects = []; }
    if (object.toFlat != undefined) {
        return object.toFlat();
    }
    else {
        var ret = {};
        var default_visited_key = "___visited_path___";
        var visited_key;
        if (object != void 0) {
            var iterate = function (key) {
                var newkey = key;
                if ((path != undefined) && (path !== "")) {
                    newkey = path + split_char + newkey;
                }
                // do not touch objects we alrdy know
                if ((obj_ref[key] != undefined) && (!objects.some(function (e) { return (e === obj_ref); }))) {
                    //if (lib_call.is_def(obj_ref[key]) && (! obj_ref[key].hasOwnProperty(visited_key)) && (key !== visited_key)) {
                    if (typeof obj_ref[key] === "object") {
                        ret = object_merge_objects(ret, object_make_flat(obj_ref[key], newkey, filter, split_char, objects.concat(object)));
                    }
                    else if (typeof obj_ref[key] === "function") {
                    }
                    else {
                        var value = obj_ref[key];
                        ret[newkey] = value;
                    }
                }
            };
            visited_key = default_visited_key;
            //object[visited_key] = true;
            var obj_ref = object;
            Object.keys(object).filter(function (key) { return (filter.indexOf(key) < 0); }).forEach(iterate);
            if (typeof object.getComputedValues == "function") {
                visited_key = default_visited_key + "_" + Math.random().toString();
                obj_ref = object.getComputedValues();
                obj_ref[visited_key] = true;
                Object.keys(obj_ref).filter(function (key) { return (filter.indexOf(key) < 0); }).forEach(iterate);
            }
        }
        else {
        }
        return ret;
    }
};
/**
 * splits a flat oject into an array of objects if there are paths containing numbers, which indicates
 * that there might be an array
 * used for normalisation of imports
 * @param entry
 * @param number_replace_string
 * @param {function} [match_function] how to test key if it causes a split
 * @returns {Array}
 */
var object_split_flat_object = function (entry, number_replace_string, fab_function, match_function) {
    if (typeof (match_function) === "undefined") {
        match_function = function (key) {
            return (!key.match(/^custom/)) && key.match(/\.[0-9]+\./);
        };
    }
    if (typeof (fab_function) === "undefined") {
        fab_function = function (obj, e) {
            return obj;
        };
    }
    if (typeof (number_replace_string) === "undefined") {
        number_replace_string = "%d";
    }
    var ret = {};
    var _ret = [];
    var keys = Object.keys(entry);
    var group_keys = keys.filter(match_function);
    keys.forEach(function (key) {
        var index = 0;
        var nkey = key;
        if (match_function(key)) {
            index = Number(key.match(/[0-9]+/)[0]).valueOf();
            nkey = key.replace(/\.[0-9]+\./, "." + number_replace_string + ".");
        }
        if (!ret[index]) {
            ret[index] = {};
        }
        ret[index][nkey] = entry[key];
    });
    keys = Object.keys(ret).sort();
    _ret.push(ret[0]);
    for (var index = 1; index < keys.length; index++) {
        _ret.push(fab_function(ret[keys[index]], entry));
    }
    _ret[0] = object_merge_objects(_ret[0], ret[0]);
    return _ret;
};
// TODO: move to exporter, it's to specific
// to normalize the objects convert paths of a tree-like structure to a
// key-value list with complete paths as key
// the info object is passed to the next function as it is
// and a flat_object (key : value)
/*export*/ var object_make_flat_async = function (data, callback, on_progress) {
    setTimeout((function (_obj, _cb, _info) {
        return (function () {
            var ret = _obj.map(function (o) { return object_make_flat(o); });
            _cb({ "flat_object": ret, "objects": ret, "info": _info });
        });
    })((typeof (data.processed.objects) === "undefined") ? data.processed.source_object : data.processed.objects, callback, data.processed.info), 0);
};
var object_flatten = function (object, paths, prefix) {
    if (prefix === void 0) { prefix = ""; }
    var ret = {};
    var paths_ = paths.reduce(function (prev, current) {
        if (current.split(".").some(function (x) { return (x === "%d"); })) {
            var path = current.split(".%d").shift();
            var len = object_path_read(object, path).length;
            for (var i = 0; i < len; i++) {
                prev.push(sprintf(current, [i]));
            }
        }
        else {
            prev.push(current);
        }
        return prev;
    }, []);
    for (var _i = 0, paths_1 = paths_; _i < paths_1.length; _i++) {
        var path = paths_1[_i];
        var tmp = object_path_read(object, path, true);
        if ((tmp != undefined) && (tmp.toFlat != undefined)) {
            var tmp_ = tmp.toFlat([path, "."].join(""));
            for (var key in tmp_) {
                ret[key] = tmp_[key];
            }
        }
        else {
            ret[prefix + path] = tmp;
        }
    }
    return ret;
};
/**
 * parse
 * @param {String} value
 * @returns {Object}
 */
var object_parse = function (value) {
    var content = JSON.parse(value);
    var m = { "root": content };
    (new Mapper()).mapClasses(m);
    return m["root"];
};
/**
 * stringify
 *
 * @description stringify object as JSON
 */
var object_stringify = function (object, readable) {
    if (readable === void 0) { readable = false; }
    return (JSON.stringify(object, function (key, value) {
        if ((key == "parents") && (value !== null)) {
            return null;
        }
        if (key == "changeActions") {
            return undefined;
        }
        if (key == "observer") {
            return undefined;
        }
        if (key == "isMapped") {
            return undefined;
        }
        /*
        if (value === null) {
            return undefined;
        }
        */
        return value;
    }, readable ? 1 : 0));
};
var lib_object;
(function (lib_object) {
    /**
     * @author frac
     */
    var class_relation = (function () {
        /**
         * @author frac
         */
        /*protected*/ function class_relation(id, parameters) {
            this.id = id;
            this.symbol = lib_object.fetch(parameters, "symbol", null, 1);
            this.name = lib_object.fetch(parameters, "name", null, 1);
            this.predicate = lib_object.fetch(parameters, "predicate", null, 2);
        }
        /**
         * @author frac
         */
        class_relation.prototype.check = function (value, reference) {
            return this.predicate(value, reference);
        };
        /**
         * @author frac
         */
        class_relation.prototype.id_get = function () {
            return this.id;
        };
        /**
         * @author frac
         */
        class_relation.prototype.symbol_get = function () {
            return this.symbol;
        };
        /**
         * @author frac
         */
        class_relation.prototype.name_get = function () {
            return this.name;
        };
        /**
         * @author frac
         */
        class_relation.pool = function () {
            return {
                "eq": {
                    "symbol": "=",
                    "name": "gleich",
                    "predicate": function (value, reference) { return (value == reference); }
                },
                "ne": {
                    "symbol": "≠",
                    "name": "ungleich",
                    "predicate": function (value, reference) { return (value != reference); }
                },
                "gt": {
                    "symbol": ">",
                    "name": "größer",
                    "predicate": function (value, reference) { return (value > reference); }
                },
                "ge": {
                    "symbol": "≥",
                    "name": "größer oder gleich",
                    "predicate": function (value, reference) { return (value >= reference); }
                },
                "lt": {
                    "symbol": "<",
                    "name": "kleiner",
                    "predicate": function (value, reference) { return (value < reference); }
                },
                "le": {
                    "symbol": "≤",
                    "name": "kleiner oder gleich",
                    "predicate": function (value, reference) { return (value <= reference); }
                }
            };
        };
        /**
         * @author frac
         */
        class_relation.get = function (id) {
            var parameters = lib_object.fetch(this.pool(), id, null, 2);
            return (new class_relation(id, parameters));
        };
        /**
         * @author frac
         */
        class_relation.available = function () {
            return Object.keys(this.pool());
        };
        return class_relation;
    }());
    lib_object.class_relation = class_relation;
    /**
     * @author frac
     */
    var class_filtrationitem = (function () {
        /**
         * @author frac
         */
        function class_filtrationitem(parameters) {
            this.extract = lib_object.fetch(parameters, "extract", null, 2);
            this.relation = lib_object.fetch(parameters, "relation", null, 2);
            this.reference = lib_object.fetch(parameters, "reference", null, 2);
        }
        /**
         * @author frac
         */
        class_filtrationitem.prototype.check = function (dataset) {
            var value = this.extract(dataset);
            return this.relation.check(value, this.reference);
        };
        return class_filtrationitem;
    }());
    lib_object.class_filtrationitem = class_filtrationitem;
    /**
     * @author frac
     */
    var class_filtration = (function () {
        /**
         * @author frac
         */
        function class_filtration(clauses) {
            this.clauses = clauses;
        }
        /**
         * @author frac
         */
        class_filtration.prototype.check = function (dataset) {
            return (this.clauses.some(function (clause) { return clause.every(function (literal) { return literal.check(dataset); }); }));
        };
        /**
         * @author frac
         */
        class_filtration.prototype.use = function (datasets) {
            var _this = this;
            return datasets.filter(function (dataset) { return _this.check(dataset); });
        };
        /**
         * @author frac
         */
        class_filtration.test = function () {
            var filtration = new class_filtration([
                [
                    new class_filtrationitem({
                        "extract": function (dataset) { return dataset["qux"]; },
                        "relation": class_relation.get("eq"),
                        "reference": "a"
                    }),
                ],
                [
                    new class_filtrationitem({
                        "extract": function (dataset) { return dataset["qux"]; },
                        "relation": class_relation.get("eq"),
                        "reference": "c"
                    }),
                ],
            ]);
            var datasets = pivot_demo_data0;
            var datasets_ = filtration.use(datasets);
            console.info(datasets);
            console.info(datasets_);
        };
        return class_filtration;
    }());
    lib_object.class_filtration = class_filtration;
})(lib_object || (lib_object = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lib_path;
(function (lib_path) {
    /**
     * @author fenris
     */
    var class_step = (function () {
        function class_step() {
        }
        return class_step;
    }());
    lib_path.class_step = class_step;
    /**
     * @author fenris
     */
    var class_step_stay = (function (_super) {
        __extends(class_step_stay, _super);
        function class_step_stay() {
            _super.apply(this, arguments);
        }
        /**
         * @author fenris
         */
        class_step_stay.prototype.invert = function () {
            return (new class_step_stay());
        };
        /**
         * @author fenris
         */
        class_step_stay.prototype.toString = function () {
            return ".";
        };
        return class_step_stay;
    }(class_step));
    lib_path.class_step_stay = class_step_stay;
    /**
     * @author fenris
     */
    var class_step_back = (function (_super) {
        __extends(class_step_back, _super);
        function class_step_back() {
            _super.apply(this, arguments);
        }
        /**
         * @author fenris
         */
        class_step_back.prototype.invert = function () {
            throw (new Error("impossible"));
        };
        /**
         * @author fenris
         */
        class_step_back.prototype.toString = function () {
            return "..";
        };
        return class_step_back;
    }(class_step));
    lib_path.class_step_back = class_step_back;
    /**
     * @author fenris
     */
    var class_step_regular = (function (_super) {
        __extends(class_step_regular, _super);
        /**
         * @author fenris
         */
        function class_step_regular(name) {
            _super.call(this);
            this.name = name;
        }
        /**
         * @author fenris
         */
        class_step_regular.prototype.invert = function () {
            return (new class_step_back());
        };
        /**
         * @author fenris
         */
        class_step_regular.prototype.toString = function () {
            return this.name;
        };
        return class_step_regular;
    }(class_step));
    lib_path.class_step_regular = class_step_regular;
    /**
     * @author fenris
     */
    function step_read(s) {
        switch (s) {
            case ".": {
                return (new class_step_stay());
            }
            case "..": {
                return (new class_step_back());
            }
            default: {
                return (new class_step_regular(s));
            }
        }
    }
    lib_path.step_read = step_read;
})(lib_path || (lib_path = {}));
///<reference path="../../../plankton/object/build/logic.d.ts"/>
var lib_path;
(function (lib_path) {
    /**
     * @author fenris
     */
    var class_chain = (function () {
        /**
         * @author fenris
         */
        function class_chain(steps) {
            if (steps === void 0) { steps = []; }
            this.steps = steps;
        }
        /**
         * @author fenris
         */
        class_chain.splitter = function (system) {
            if (system === void 0) { system = "unix"; }
            return (object_fetch({
                "unix": "/",
                "win": "\\"
            }, system, "/", 2));
        };
        /**
         * @desc removes superfluent steps from the chain, e.g. infix ".."
         * @author fenris
         */
        class_chain.prototype.normalize = function () {
            var steps = this.steps;
            // filter "stay"
            {
                steps = steps.filter(function (step) { return (!(step instanceof lib_path.class_step_stay)); });
            }
            // filter "regular-back"
            {
                var _loop_1 = function() {
                    if (steps.length < 1) {
                        return "break";
                    }
                    else {
                        var last_1 = steps[0];
                        var found = steps.slice(1).some(function (step, index) {
                            if (step instanceof lib_path.class_step_back) {
                                if (last_1 instanceof lib_path.class_step_regular) {
                                    steps.splice(index, 2);
                                    return true;
                                }
                            }
                            last_1 = step;
                            return false;
                        });
                        if (!found) {
                            return "break";
                        }
                    }
                };
                while (true) {
                    var state_1 = _loop_1();
                    if (state_1 === "break") break;
                }
            }
            return (new class_chain(steps));
        };
        /**
         * @author fenris
         */
        class_chain.prototype.invert = function () {
            return (new class_chain(this.steps.map(function (step) { return step.invert(); })));
        };
        /**
         * @author fenris
         */
        class_chain.prototype.add = function (step) {
            return (new class_chain(this.steps.concat([step]))).normalize();
        };
        /**
         * @author fenris
         */
        class_chain.prototype.extend = function (chain) {
            return (new class_chain(this.steps.concat(chain.steps))).normalize();
        };
        /**
         * @author fenris
         */
        class_chain.prototype.as_string = function (system) {
            if (system === void 0) { system = "unix"; }
            var splitter = class_chain.splitter(system);
            return ((this.steps.length == 0) ? ("." + splitter) : this.steps.map(function (step) { return (step.toString() + splitter); }).join(""));
        };
        /**
         * @author fenris
         */
        class_chain.prototype.toString = function () {
            return this.as_string();
        };
        return class_chain;
    }());
    lib_path.class_chain = class_chain;
    /**
     * @author fenris
     */
    function chain_read(str, system) {
        if (system === void 0) { system = "unix"; }
        var splitter = class_chain.splitter(system);
        var parts = str.split(splitter);
        if (parts[parts.length - 1] == "")
            parts.pop();
        return (new class_chain(parts.map(lib_path.step_read)));
    }
    lib_path.chain_read = chain_read;
})(lib_path || (lib_path = {}));
///<reference path="../../../plankton/object/build/logic.d.ts"/>
var lib_path;
(function (lib_path) {
    /**
     * @author fenris
     */
    var class_location = (function () {
        /**
         * @author fenris
         */
        function class_location(anchor, chain) {
            this.anchor = anchor;
            this.chain = chain;
        }
        /**
         * @author fenris
         */
        class_location.anchorpattern = function (system) {
            if (system === void 0) { system = "unix"; }
            return (object_fetch({
                "unix": new RegExp("/"),
                "win": new RegExp("[A-Z]:\\\\>")
            }, system, new RegExp("/"), 1));
        };
        /**
         * @author fenris
         */
        class_location.prototype.normalize = function () {
            return (new class_location(this.anchor, this.chain.normalize()));
        };
        /**
         * @author fenris
         */
        class_location.prototype.extend = function (chain) {
            return (new class_location(this.anchor, this.chain.extend(chain)));
        };
        /**
         * @author fenris
         */
        class_location.prototype.go_thither = function () {
            // console.error(">>", this.toString());
            process.chdir(this.toString());
        };
        /**
         * @author fenris
         */
        class_location.prototype.expedition = function (core) {
            var that = this;
            var current = location_read(process.cwd());
            function begin() {
                // (new class_message("changing directory to '" + that.toString() + "'")).stderr();
                that.go_thither();
            }
            function end() {
                // (new class_message("changing directory to '" + current.toString() + "'")).stderr();
                current.go_thither();
            }
            begin();
            core(end);
        };
        /**
         * @author fenris
         */
        class_location.prototype.as_string = function (system) {
            if (system === void 0) { system = "unix"; }
            return (((this.anchor != null) ? this.anchor : "") + this.chain.as_string(system));
        };
        /**
         * @author fenris
         */
        class_location.prototype.toString = function () {
            return this.as_string();
        };
        /**
         * @author fenris
         */
        class_location.current = function () {
            // return class_location.read(process.cwd());
            return location_read(process.cwd());
        };
        /**
         * @author fenris
         */
        class_location.tempfolder = function (system) {
            if (system === void 0) { system = "unix"; }
            return (object_fetch({
                "unix": new class_location("/", new lib_path.class_chain([new lib_path.class_step_regular("tmp")])),
                "win": new class_location(null, new lib_path.class_chain([new lib_path.class_step_regular("%TEMP%")]))
            }, system, null, 2));
        };
        return class_location;
    }());
    lib_path.class_location = class_location;
    /**
     * @author fenris
     */
    function location_read(str, system) {
        if (system === void 0) { system = "unix"; }
        var regexp = class_location.anchorpattern(system);
        var matching = regexp.exec(str);
        if ((matching == null) || (matching.index > 0)) {
            return (new class_location(null, lib_path.chain_read(str, system)));
        }
        else {
            return (new class_location(matching[0], lib_path.chain_read(str.slice(matching[0].length), system)));
        }
    }
    lib_path.location_read = location_read;
})(lib_path || (lib_path = {}));
var lib_path;
(function (lib_path) {
    /**
     * @author fenris
     */
    var class_filepointer = (function () {
        /**
         * @author fenris
         */
        function class_filepointer(location, filename) {
            this.location = location;
            this.filename = filename;
        }
        /**
         * @author fenris
         */
        class_filepointer.prototype.normalize = function () {
            return (new class_filepointer(this.location.normalize(), this.filename));
        };
        /**
         * @author fenris
         */
        class_filepointer.prototype.foo = function (filepointer) {
            return (new class_filepointer(this.location.extend(filepointer.location.chain), filepointer.filename));
        };
        /**
         * @author fenris
         */
        class_filepointer.prototype.as_string = function (system) {
            if (system === void 0) { system = "unix"; }
            return (this.location.as_string(system) /* + "/"*/ + ((this.filename == null) ? "" : this.filename));
        };
        /**
         * @author fenris
         */
        class_filepointer.prototype.toString = function () {
            return this.as_string();
        };
        return class_filepointer;
    }());
    lib_path.class_filepointer = class_filepointer;
    /**
     * @author fenris
     */
    function filepointer_read(str, system) {
        if (system === void 0) { system = "unix"; }
        var splitter = lib_path.class_chain.splitter(system);
        var parts = str.split(splitter);
        var last = parts[parts.length - 1];
        if (last == "") {
            return (new class_filepointer(lib_path.location_read(parts.join(splitter), system), null));
        }
        else {
            return (new class_filepointer(lib_path.location_read(parts.slice(0, parts.length - 1).join(splitter), system), last));
        }
    }
    lib_path.filepointer_read = filepointer_read;
})(lib_path || (lib_path = {}));
///<reference path="../../base/build/logic.d.ts"/>
///<reference path="../../call/build/logic.d.ts"/>
var lib_file;
(function (lib_file) {
    /**
     * @author fenris
     * @todo move to a dedicated lib (e.g. "http", "transport", etc.)
     */
    function ajax(_a) {
        var target = _a["target"], _b = _a["data"], data /*: {[key : string] : string}*/ = _b === void 0 ? null : _b, _c = _a["method"], method /* : string*/ = _c === void 0 ? "GET" : _c;
        method = method.toLowerCase();
        return (function (resolve, reject) {
            var datastring = ((data == null) ? null : Object.keys(data).map(function (key) { return (key + "=" + data[key]); }).join("&"));
            var suffix = ((method == "get") ? ("?" + datastring) : "");
            var sending = ((method == "get") ? null : datastring);
            var request = new XMLHttpRequest();
            request.open(method.toUpperCase(), target + suffix, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.responseText);
                    }
                    else {
                        reject(new Error("XMLHttpRequest failed"));
                    }
                }
            };
            request.send(sending);
        });
    }
    lib_file.ajax = ajax;
    /**
     * @author maspr
     */
    function determine_handler(path) {
        if (/^https?:\/\//.test(path)) {
            return "http";
        }
        else {
            return "file";
        }
    }
    /**
     * @desc reads a file
     * @author fenris
     */
    function read(path, skip_error) {
        if (skip_error === void 0) { skip_error = false; }
        var environment = lib_base.environment();
        switch (environment) {
            case "web": {
                return (function (resolve, reject) {
                    ajax({
                        "target": path,
                        "method": "GET",
                    })(resolve, function (reason) { return (skip_error ? resolve(null) : reject(reason)); });
                });
                break;
            }
            case "node": {
                switch (determine_handler(path)) {
                    case "file":
                        {
                            var _fs_1 = require("fs");
                            return (function (resolve, reject) {
                                _fs_1.readFile(path, {
                                    "encoding": "utf8",
                                    "flag": "r",
                                }, function (error, content) {
                                    if (error == null) {
                                        resolve(content);
                                    }
                                    else {
                                        reject(error);
                                    }
                                });
                            });
                        }
                        break;
                    case "http":
                        {
                            return function (resolve, reject) {
                                var _http = require("http");
                                var _https = require("https");
                                var _url = require("url");
                                var parsed_url = _url.parse(path, false, true);
                                var client = (parsed_url.protocol == "https:") ? _https : _http;
                                var default_port = (parsed_url.protocol == "https:") ? 443 : 80;
                                var options = {
                                    hostname: parsed_url.hostname,
                                    port: parsed_url.port || default_port,
                                    path: parsed_url.path,
                                    method: "GET"
                                };
                                var req = client.request(options, function (res) {
                                    var data = ""; // @todo
                                    res.on("data", function (chunk) {
                                        data += chunk;
                                    });
                                    res.on("end", function () {
                                        resolve(data);
                                    });
                                });
                                req.end();
                                req.on("error", function (error) {
                                    reject(error);
                                });
                            };
                        }
                        break;
                    default: {
                        return (function (resolve, reject) { return reject(new Error("unhandled protocol")); });
                    }
                }
                break;
            }
            default: {
                return (function (resolve, reject) { return reject(new Error("unhandled environment")); });
                break;
            }
        }
    }
    lib_file.read = read;
    /**
     * @desc reads a json file
     * @author fenris
     */
    function read_json(path) {
        return (function (resolve, reject) {
            lib_call.executor_chain({}, [
                function (state) { return function (resolve_, reject_) {
                    read(path)(function (content) {
                        state.content = content;
                        resolve_(state);
                    }, reject_);
                }; },
                function (state) { return function (resolve_, reject_) {
                    var error;
                    try {
                        state.data = JSON.parse(state.content);
                        error = null;
                    }
                    catch (exception) {
                        error = new class_error("invalid json", [exception]);
                    }
                    if (error == null) {
                        resolve_(state);
                    }
                    else {
                        reject_(error);
                    }
                }; },
            ])(function (state) { return resolve(state.data); }, reject);
        });
    }
    lib_file.read_json = read_json;
    /**
     * @desc writes a file
     * @author fenris
     */
    function write(path, content) {
        var environment = lib_base.environment();
        switch (environment) {
            case "web": {
                return (function (resolve, reject) {
                    reject(new Error("not implemented / not possible"));
                });
                break;
            }
            case "node": {
                var _fs_2 = require("fs");
                return (function (resolve, reject) {
                    _fs_2.writeFile(path, content, {
                        "encoding": "utf8",
                        "flag": "w",
                    }, function (error) {
                        if (error == null) {
                            resolve(undefined);
                        }
                        else {
                            reject(error);
                        }
                    });
                });
                break;
            }
            default: {
                return (function (resolve, reject) { return reject(new Error("unhandled environment")); });
                break;
            }
        }
    }
    lib_file.write = write;
    /**
     * @desc writes a json file
     * @author fenris
     */
    function write_json(path, data) {
        return write(path, JSON.stringify(data, undefined, "\t"));
    }
    lib_file.write_json = write_json;
})(lib_file || (lib_file = {}));
var lib_args;
(function (lib_args) {
    /**
     * @author fenris
     */
    var class_argument = (function () {
        /**
         * @author fenris
         */
        function class_argument(_a) {
            var name = _a["name"], _b = _a["type"], type = _b === void 0 ? "string" : _b, _c = _a["default"], default_ = _c === void 0 ? null : _c, _d = _a["info"], info = _d === void 0 ? null : _d, _e = _a["mode"], mode = _e === void 0 ? "replace" : _e, _f = _a["kind"], kind = _f === void 0 ? "positional" : _f, _g = _a["parameters"], parameters = _g === void 0 ? {} : _g, _h = _a["hidden"], hidden = _h === void 0 ? false : _h;
            this.name = name;
            this.type = type;
            this.default_ = default_;
            this.info = info;
            this.mode = mode;
            this.kind = kind;
            this.parameters = parameters;
            this.hidden = hidden;
            if (!this.check()) {
                throw (new Error("invalid argument-setup"));
            }
        }
        /**
         * @author fenris
         */
        class_argument.prototype.check = function () {
            var _this = this;
            return [
                function () { return ((!(_this.kind == "volatile")) || (("indicators_long" in _this.parameters) && (_this.parameters["indicators_long"].length >= 0))); },
            ].every(function (condition) { return condition(); });
        };
        /**
         * @author fenris
         */
        class_argument.prototype.name_get = function () {
            return this.name;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.type_get = function () {
            return this.type;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.default_get = function () {
            return this.default_;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.kind_get = function () {
            return this.kind;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.parameters_get = function () {
            return this.parameters;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.hidden_get = function () {
            return this.hidden;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.toString = function () {
            return "<" + this.name + ">";
        };
        /**
         * @author fenris
         */
        class_argument.prototype.indicator_main = function () {
            if (this.kind == "volatile") {
                return this.parameters["indicators_long"][0];
            }
            else {
                return null;
            }
        };
        /**
         * @author fenris
         */
        class_argument.prototype.pattern_value = function () {
            switch (this.type) {
                case "boolean": {
                    return "false|true";
                    break;
                }
                case "int": {
                    return "[0-9]+";
                    break;
                }
                case "float": {
                    return "\\d*(?:\\.\\d+)?";
                    break;
                }
                case "string": {
                    return "\\S+";
                    break;
                }
                default: {
                    throw (new Error("unhandled type " + this.type));
                    break;
                }
            }
        };
        /**
         * @author fenris
         */
        class_argument.prototype.extract = function (raw) {
            switch (this.type) {
                case "boolean": {
                    return (raw != "false");
                    break;
                }
                case "int": {
                    return parseInt(raw);
                    break;
                }
                case "float": {
                    return parseFloat(raw);
                    break;
                }
                case "string": {
                    return raw;
                    break;
                }
                default: {
                    throw (new Error("unhandled type " + this.type));
                    break;
                }
            }
        };
        /**
         * @author fenris
         */
        class_argument.prototype.assign = function (data, raw) {
            var value = this.extract(raw);
            switch (this.mode) {
                case "replace": {
                    data[this.name] = value;
                    break;
                }
                case "accumulate": {
                    /*
                    if (! (this.name in data)) {
                        data[this.name] = [];
                    }
                     */
                    data[this.name].push(value);
                    break;
                }
                default: {
                    throw (new Error("unhandled mode " + this.mode));
                }
            }
        };
        /**
         * @author fenris
         */
        class_argument.prototype.make = function (data) {
            var value = data[this.name];
            return value.toString();
        };
        /**
         * @author fenris
         */
        class_argument.prototype.generate_help = function () {
            var output = "";
            {
                var line = "";
                line += "\t";
                line += "<" + this.name + ">";
                line += "\n";
                output += line;
            }
            {
                var line = "";
                line += "\t\t";
                var infotext = ((this.info == null) ? "(no info available)" : this.info);
                line += infotext;
                if ((this.type != "boolean") && (this.default_ != null)) {
                    line += "; default: " + this.default_.toString();
                }
                line += "\n";
                output += line;
            }
            return output;
        };
        return class_argument;
    }());
    lib_args.class_argument = class_argument;
})(lib_args || (lib_args = {}));
///<reference path="../../base/build/logic.d.ts"/>
var lib_args;
(function (lib_args) {
    /**
     * @author fenris
     */
    var settings = {
        "environment": {
            "cli": {
                "symbols": {
                    "delimiter": " ",
                    "prefix": "--",
                    "assignment": "="
                }
            },
            "url": {
                "symbols": {
                    "delimiter": "&",
                    "prefix": "",
                    "assignment": "="
                }
            }
        }
    };
    /**
     * @author fenris
     */
    lib_args.verbosity = 0;
    /**
     * @author fenris
     * @todo check validity
     */
    var class_handler = (function () {
        /**
         * @author fenris
         */
        function class_handler(arguments_) {
            this.arguments_ = arguments_;
        }
        /**
         * @author fenris
         */
        class_handler.prototype.filter = function (kind) {
            return this.arguments_.filter(function (argument) { return (argument.kind_get() == kind); });
        };
        /**
         * @author fenris
         */
        class_handler.prototype.read = function (environment, input, data) {
            var _this = this;
            if (data === void 0) { data = {}; }
            switch (environment) {
                case "cli":
                case "url": {
                    // default values
                    {
                        this.arguments_.forEach(function (argument) {
                            data[argument.name_get()] = argument.default_get();
                        });
                    }
                    // preprocessing
                    {
                        // short indicators (lil hacky ...)
                        {
                            if (environment == "cli") {
                                this.filter("volatile").forEach(function (argument) {
                                    // console.info(argument.parameters_get()["indicators_short"].join("|"));
                                    var pattern_from = "";
                                    {
                                        pattern_from += "(?:^|" + settings["environment"][environment]["symbols"]["delimiter"] + ")";
                                        pattern_from += "-" + argument.parameters_get()["indicators_short"].join("|");
                                        pattern_from += "(?:$|" + settings["environment"][environment]["symbols"]["delimiter"] + ")";
                                    }
                                    var pattern_to = "";
                                    {
                                        pattern_to += settings["environment"][environment]["symbols"]["delimiter"];
                                        pattern_to += settings["environment"][environment]["symbols"]["prefix"];
                                        pattern_to += argument.indicator_main();
                                        if (argument.type_get() != "boolean") {
                                            pattern_to += settings["environment"][environment]["symbols"]["assignment"];
                                        }
                                    }
                                    var result = input.replace(new RegExp(pattern_from, "g"), pattern_to);
                                    if (lib_args.verbosity >= 3)
                                        console.info("--", "replacing \"" + pattern_from + "\" by \"" + pattern_to + "\" in \"" + input + "\" to \"" + result + "\"");
                                    input = result;
                                });
                            }
                        }
                        if (lib_args.verbosity >= 3)
                            console.info("--", "input is now \"" + input + "\"");
                    }
                    // parsing
                    {
                        var parts = input
                            .split(settings["environment"][environment]["symbols"]["delimiter"])
                            .filter(function (x) { return (x != ""); });
                        var index_expected_1 = 0;
                        parts.forEach(function (part) {
                            if (lib_args.verbosity >= 2)
                                console.info("--", "analyzing \"" + part + "\"");
                            var found = [
                                function () {
                                    if (lib_args.verbosity >= 3)
                                        console.info("--", "probing as volatile");
                                    return (_this.filter("volatile")
                                        .some(function (argument) {
                                        if (lib_args.verbosity >= 4)
                                            console.info("--", "trying as " + argument.toString());
                                        var pattern = "";
                                        {
                                            var pattern_front = "";
                                            pattern_front += "" + settings["environment"][environment]["symbols"]["prefix"];
                                            pattern_front += "(?:" + argument.parameters_get()["indicators_long"].join("|") + ")";
                                            pattern += pattern_front;
                                        }
                                        {
                                            var pattern_back = "";
                                            pattern_back += "" + settings["environment"][environment]["symbols"]["assignment"];
                                            pattern_back += "(" + argument.pattern_value() + ")";
                                            if (argument.type_get() == "boolean") {
                                                pattern_back = "(?:" + pattern_back + ")?";
                                            }
                                            pattern += pattern_back;
                                        }
                                        if (lib_args.verbosity >= 5)
                                            console.info("--", "pattern: \"" + pattern + "\"");
                                        var regexp = new RegExp(pattern);
                                        var matching = regexp.exec(part);
                                        if (lib_args.verbosity >= 5)
                                            console.info("--", "matching:", matching);
                                        if (matching == null) {
                                            return false;
                                        }
                                        else {
                                            argument.assign(data, matching[1]);
                                            return true;
                                        }
                                    }));
                                },
                                function () {
                                    if (lib_args.verbosity >= 3)
                                        console.info("--", "probing as positional");
                                    var positional = _this.filter("positional");
                                    if (index_expected_1 >= positional.length) {
                                        if (lib_args.verbosity >= 4)
                                            console.info("--", "no positional arguments left");
                                        return false;
                                    }
                                    else {
                                        var argument = positional[index_expected_1];
                                        if (lib_args.verbosity >= 4)
                                            console.info("--", "trying as " + argument.toString());
                                        var pattern = "";
                                        {
                                            var pattern_back = "";
                                            pattern_back += "(" + argument.pattern_value() + ")";
                                            pattern += pattern_back;
                                        }
                                        if (lib_args.verbosity >= 5)
                                            console.info("--", "pattern: \"" + pattern + "\"");
                                        var regexp = new RegExp(pattern);
                                        var matching = regexp.exec(part);
                                        if (lib_args.verbosity >= 5)
                                            console.info("--", "matching:", matching);
                                        if (matching == null) {
                                            return false;
                                        }
                                        else {
                                            argument.assign(data, matching[1]);
                                            index_expected_1 += 1;
                                            return true;
                                        }
                                    }
                                },
                            ].some(function (x) { return x(); });
                            if (!found) {
                                if (lib_args.verbosity >= 1)
                                    console.warn("--", "couldn't parse \"" + part + "\"");
                            }
                        });
                    }
                    return data;
                    break;
                }
                default: {
                    throw (new Error("unhandled environment " + environment));
                    break;
                }
            }
        };
        /**
         * @author fenris
         * @todo handle if the data object doesn't have the required field or the type is wrong or sth.
         */
        class_handler.prototype.write = function (environment, data) {
            switch (environment) {
                case "cli":
                case "url": {
                    return (([]
                        .concat(this.filter("volatile").map(function (argument) {
                        var raw = "";
                        {
                            var raw_front = "";
                            raw_front += settings["environment"][environment]["symbols"]["prefix"];
                            raw_front += argument.parameters_get()["indicators_long"][0];
                            raw += raw_front;
                        }
                        {
                            var raw_back = "";
                            raw_back += settings["environment"][environment]["symbols"]["assignment"];
                            raw_back += argument.make(data);
                            raw += raw_back;
                        }
                        return raw;
                    }))
                        .concat(this.filter("positional").map(function (argument) {
                        var raw = "";
                        {
                            var raw_back = "";
                            raw_back += argument.make(data);
                            raw += raw_back;
                        }
                        return raw;
                    })))
                        .join(settings["environment"][environment]["symbols"]["delimiter"]));
                    break;
                }
                default: {
                    throw (new Error("unhandled environment " + environment));
                    break;
                }
            }
        };
        /**
         * @desc manpage-like info-sheet
         * @author fenris
         */
        class_handler.prototype.generate_help = function (_a) {
            var _b = _a["programname"], programname = _b === void 0 ? null : _b, _c = _a["author"], author = _c === void 0 ? null : _c, _d = _a["description"], description = _d === void 0 ? null : _d, _e = _a["executable"], executable = _e === void 0 ? null : _e;
            var environment = "cli";
            var output = "";
            {
                var section = "";
                {
                    var line = "";
                    line += "";
                    line += "INFO";
                    line += "\n";
                    section += line;
                }
                {
                    var line = "";
                    line += "\t";
                    line += programname + " -- " + description;
                    line += "\n";
                    section += line;
                }
                section += "\n";
                output += section;
            }
            {
                if (author != null) {
                    var section = "";
                    {
                        var line = "";
                        line += "";
                        line += "AUTHOR";
                        line += "\n";
                        section += line;
                    }
                    {
                        var line = "";
                        line += "\t";
                        line += "" + author;
                        line += "\n";
                        section += line;
                    }
                    section += "\n";
                    output += section;
                }
            }
            {
                var section = "";
                {
                    var line = "";
                    line += "";
                    line += "SYNOPSIS";
                    line += "\n";
                    section += line;
                }
                {
                    var line = "";
                    line += "\t";
                    line += executable;
                    line += settings["environment"][environment]["symbols"]["delimiter"];
                    line += this.filter("positional")
                        .map(function (argument) {
                        var part = "";
                        part += "<" + argument.name_get() + ">";
                        return part;
                    })
                        .join(settings["environment"][environment]["symbols"]["delimiter"]);
                    line += settings["environment"][environment]["symbols"]["delimiter"];
                    line += this.filter("volatile")
                        .filter(function (argument) { return (!argument.hidden_get()); })
                        .map(function (argument) {
                        var part = "";
                        part += settings["environment"][environment]["symbols"]["prefix"];
                        part += argument.parameters_get()["indicators_long"][0];
                        if (argument.type_get() != "boolean") {
                            part += settings["environment"][environment]["symbols"]["assignment"];
                            part += "<" + argument.name_get() + ">";
                        }
                        part = "[" + part + "]";
                        return part;
                    })
                        .join(settings["environment"][environment]["symbols"]["delimiter"]);
                    line += "\n";
                    section += line;
                }
                section += "\n";
                output += section;
            }
            {
                var section = "";
                {
                    var line = "";
                    line += "";
                    line += "OPTIONS";
                    line += "\n";
                    section += line;
                }
                {
                    section += (this.arguments_
                        .filter(function (argument) { return (!argument.hidden_get()); })
                        .map(function (argument) { return argument.generate_help(); })
                        .join("\n"));
                }
                section += "\n";
                output += section;
            }
            return output;
        };
        return class_handler;
    }());
    lib_args.class_handler = class_handler;
})(lib_args || (lib_args = {}));
