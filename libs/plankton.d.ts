declare type int = number;
declare type float = number;
declare var process: any;
declare var require: any;
declare class Buffer {
    constructor(x: string, modifier?: string);
    toString(modifier?: string): string;
}
declare var java: any;
declare module lib_base {
    /**
     * @author frac
     */
    function environment(): string;
}
/**
 * @author fenris
 */
declare var instance_verbosity: int;
/**
 * @desc the ability to check for equality with another element of the same domain
 * @author fenris
 */
interface interface_collatable<type_value> {
    /**
     * @author fenris
     */
    _collate(value: type_value): boolean;
}
/**
 * @author fenris
 */
declare function instance_collate<type_value>(value1: type_value, value2: type_value): boolean;
/**
 * @desc the ability to compare with another element of the same domain for determining if the first is "smaller than or equal to" the latter
 * @author fenris
 */
interface interface_comparable<type_value> {
    /**
     * @author fenris
     */
    _compare(value: type_value): boolean;
}
/**
 * @author fenris
 */
declare function instance_compare<type_value>(value1: type_value, value2: type_value): boolean;
/**
 * @desc the ability to create an exact copy
 * @author fenris
 */
interface interface_cloneable<type_value> {
    /**
     * @author fenris
     */
    _clone(): type_value;
}
/**
 * @author fenris
 */
declare function instance_clone<type_value>(value: type_value): type_value;
/**
 * @author fenris
 */
interface interface_hashable {
    /**
     * @author fenris
     */
    _hash(): string;
}
/**
 * @desc the ability to generate a string out of the element, which identifies it to a high degree
 * @author fenris
 */
declare function instance_hash<type_value>(value: type_value): string;
/**
 * @author fenris
 */
interface interface_showable {
    /**
     * @author fenris
     */
    _show(): string;
}
/**
 * @desc the ability to map the element to a textual representation (most likely not injective)
 * @author fenris
 */
declare function instance_show<type_value>(value: type_value): string;
/**
 * @todo outsource to dedicated plankton-lib
 */
declare module lib_log {
    /**
     * @author fenris
     */
    function log(...args: Array<any>): void;
    /**
     * @author fenris
     */
    function info(...args: Array<any>): void;
    /**
     * @author fenris
     */
    function warn(...args: Array<any>): void;
    /**
     * @author fenris
     */
    function error(...args: Array<any>): void;
}
/**
 * @author frac
 */
interface interface_decorator<type_core> {
    /**
     * @author frac
     */
    core: type_core;
}
/**
 * @author frac
 */
declare class class_observer {
    /**
     * @author frac
     */
    protected counter: int;
    /**
     * @author frac
     */
    protected actions: {
        [id: string]: (information: Object) => void;
    };
    /**
     * @author frac
     */
    protected buffer: Array<Object>;
    /**
     * @author frac
     */
    constructor();
    /**
     * @author frac
     */
    empty(): boolean;
    /**
     * @author frac
     */
    flush(): void;
    /**
     * @author frac
     */
    set(id: string, action: (information: Object) => void): void;
    /**
     * @author frac
     */
    del(id: string): void;
    /**
     * @author frac
     */
    add(action: (information: Object) => void): void;
    /**
     * @author frac
     */
    notify(information?: Object, delayed?: boolean): void;
    /**
     * @author frac
     */
    rollout(): void;
}
/**
 * @author fenris
 */
declare class class_maybe<type_value> implements interface_showable {
    /**
     * @desc whether the wrapper is nothing
     * @author fenris
     */
    is_nothing(): boolean;
    /**
     * @desc whether the wrapper is just
     * @author fenris
     */
    is_just(): boolean;
    /**
     * @desc return the value, stored in the maybe-wrapper
     * @author fenris
     */
    cull(): type_value;
    /**
     * @author fenris
     */
    toString(): string;
    /**
     * @author fenris
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author fenris
     */
    propagate<type_value_>(action: (value: type_value) => class_maybe<type_value_>): class_maybe<type_value_>;
    /**
     * @desc [implementation]
     * @author fenris
     */
    _show(): string;
}
/**
 * @author fenris
 */
declare class class_nothing<type_value> extends class_maybe<type_value> {
    /**
     * @author fenris
     */
    private reason;
    /**
     * @author fenris
     */
    constructor(reason?: string);
    /**
     * @author fenris
     */
    is_nothing(): boolean;
    /**
     * @author fenris
     */
    is_just(): boolean;
    /**
     * @author fenris
     */
    cull(): type_value;
    /**
     * @author fenris
     */
    toString(): string;
    /**
     * @author fenris
     */
    reason_get(): string;
    /**
     * @author fenris
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author fenris
     */
    propagate<type_value_>(action: (value: type_value) => class_maybe<type_value_>): class_maybe<type_value_>;
}
/**
 * @author fenris
 */
declare class class_just<type_value> extends class_maybe<type_value> {
    /**
     * @author fenris
     */
    private value;
    /**
     * @author fenris
     */
    constructor(value: type_value);
    /**
     * @author fenris
     */
    is_nothing(): boolean;
    /**
     * @author fenris
     */
    is_just(): boolean;
    /**
     * @author fenris
     */
    cull(): type_value;
    /**
     * @author fenris
     */
    toString(): string;
    /**
     * @author fenris
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author fenris
     */
    propagate<type_value_>(action: (value: type_value) => class_maybe<type_value_>): class_maybe<type_value_>;
}
/**
 * @author frac
 */
declare class class_error extends Error {
    /**
     * @author frac
     */
    protected suberrors: Array<Error>;
    /**
     * @author frac
     */
    protected mess: string;
    /**
     * @author frac
     */
    constructor(message: string, suberrors?: Array<Error>);
    /**
     * @override
     * @author frac
     */
    toString(): string;
}
/// <reference path="../../base/build/logic-decl.d.ts" />
declare module lib_call {
    /**
     * @desc this is kind of an ugly hack; the motivation is, that the JS-interpreter of many Gecko-based browsers
     *    (e.g. Firefox) won't accept a larger number of stack-frames, which come up when using executor-chains often.
     *    This can be circumvented by deferring inner calls, such that they are moved outside the own stack-frame. This
     *    is possible due to the asynchronous nature of executors. However this does also significantly increase the
     *    overall-time for a long executor-chain (or rather executor-tree) to finish. Therefore it is not recommended
     *    to do this by default.
     * @author frac
     */
    var default_deferred: boolean;
    /**
     * @author fenris
     */
    function schedule(function_: () => void, deferred?: boolean): void;
}
declare module lib_call {
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    abstract class class_wait {
        /**
         * @author frac
         */
        abstract run(): void;
    }
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    class class_wait_sequential extends class_wait {
        /**
         * @author frac
         */
        protected dependencies: Array<(ready: () => void) => void>;
        /**
         * @author frac
         */
        protected action: () => void;
        /**
         * @author frac
         */
        constructor(dependencies: Array<(ready: () => void) => void>, action?: () => void);
        /**
         * @author frac
         */
        protected run_(dependencies: Array<(ready: () => void) => void>): void;
        /**
         * @author frac
         */
        run(): void;
    }
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    class class_wait_parallel extends class_wait {
        /**
         * @author frac
         */
        protected index: int;
        /**
         * @author frac
         */
        protected dependencies: {
            [id: string]: (ready: () => void) => void;
        };
        /**
         * @author frac
         */
        protected action: () => void;
        /**
         * @author frac
         */
        constructor(dependencies: Array<(ready: () => void) => void>, action?: () => void);
        /**
         * @author frac
         */
        protected add_dependency(dependency: (ready: () => void) => void): void;
        /**
         * @author frac
         */
        protected remove_dependency(id: string): void;
        /**
         * @author frac
         */
        run(): void;
    }
}
declare module lib_call {
    /**
     * @author fenris
     */
    function timeout(function_: () => void, delay: int, ...params: Array<any>): int;
    /**
     * @desc a definition for a value being "defined"
     * @author neuc
     */
    function is_def<type_value>(obj: type_value, null_is_valid?: boolean): boolean;
    /**
     * @desc returns the value if set and, when a type is specified, if the type is corret, if not return default_value
     * @author neuc
     */
    function def_val(value: any, default_value: any, type?: string, null_is_valid?: boolean): any;
    /**
     * @desc just the empty function; useful for some callbacks etc.
     * @author fenris
     */
    function nothing(): void;
    /**
     * @desc just the identity; useful for some callbacks etc.
     * @author fenris
     */
    function id<type_value>(x: type_value): type_value;
    /**
     * @author fenris
     */
    function use<type_input, type_output>(input: type_input, function_: (input: type_input) => type_output): type_output;
    /**
     * @desc outputs
     * @author fenris
     */
    function output(...args: Array<any>): void;
    /**
     * @desc converts the "arguments"-map into an array
     * @param {Object} args
     * @author fenris
     */
    function args2list(args: any): Array<any>;
    /**
     * @desc provides the call for an attribute of a class as a regular function
     * @param {string} name the name of the attribute
     * @return {*}
     * @author fenris
     */
    function attribute<type_object, type_attribute>(name: string): (object: type_object) => type_attribute;
    /**
     * @desc provides a method of a class as a regular function
     * @param {string} name the name of the method
     * @return {function}
     * @author fenris
     */
    function method<type_object, type_output>(name: string): (object: type_object) => type_output;
    /**
     * @desc composes two functions (i.e. returns a function that return the result of the successive execution of both input-functions)
     * @param {function} function_f
     * @param {function} function_g
     * @author fenris
     */
    function compose<type_x, type_y, type_z>(function_f: (type_x) => type_y, function_g: (type_y) => type_z): (value: type_x) => type_z;
    /**
     * @desc transforms a function with sequential input into a function with leveled input; example: add(2,3) = curryfy(add)(2)(3)
     * @param {function} f
     * @param {int} n (don't set manually)
     * @return {function} the currified version of the in put function
     * @author fenris
     */
    function curryfy(f: Function, n?: int): Function;
    /**
     * @desc adapter for old syntax
     * @author fenris
     */
    function wait(dependencies: Array<(ready: () => void) => void>, action?: () => void, parallel?: boolean): void;
    /**
     * returns a function which goes through a process step by step
     * a process is an array of objects like { func : {function}, state : {string}}
     * trigger the start of the process by calling the returned function with one argument
     * which represents the parameters of the first function which is in the process
     * @param {Array<object>} _process
     * @param {function} on_stateChange called before the next function is called
     * @returns {function}
     */
    function simple_process(_process: any, on_stateChange?: (msg: any) => void, on_progress?: (msg: any, pos: any, max: any) => void): Function;
}
declare module lib_call {
    /**
     * @author fenris
     */
    type type_executor<type_result, type_reason> = ((resolve: (result?: type_result) => any, reject?: (reason?: type_reason) => void) => void);
    /**
     * @author fenris
     */
    function executor_resolve<type_result, type_reason>(result: type_result): type_executor<type_result, type_reason>;
    /**
     * @author fenris
     */
    function executor_reject<type_result, type_reason>(reason: type_reason): type_executor<type_result, type_reason>;
    /**
     * @author fenris
     */
    function executor_transform<type_result_from, type_error_from, type_result_to, type_error_to>(executor: type_executor<type_result_from, type_error_from>, transform_result: (result_from: type_result_from) => type_result_to, transform_reason: (error_from: type_error_from) => type_error_to): type_executor<type_result_to, type_error_to>;
    /**
     * @author fenris
     */
    function executor_transform_default<type_result_from, type_result_to>(executor: type_executor<type_result_from, Error>, transform_result: (result_from: type_result_from) => type_result_to, wrap_string?: string): type_executor<type_result_to, Error>;
    /**
     * @author fenris
     */
    function executor_compose_sequential<type_result_first, type_result_second, type_reason>(first: type_executor<type_result_first, type_reason>, second: (result: type_result_first) => type_executor<type_result_second, type_reason>, deferred?: boolean): type_executor<type_result_second, type_reason>;
    /**
     * @author fenris
     */
    function executor_chain<type_state, type_error>(state: type_state, executors: Array<(state: type_state) => type_executor<type_state, type_error>>, deferred?: boolean): type_executor<type_state, type_error>;
    /**
     * @author fenris
     */
    function executor_first<type_result, type_reason>(executors: Array<type_executor<type_result, type_reason>>): type_executor<type_result, Array<type_reason>>;
    /**
     * @author fenris
     */
    function executor_condense<type_element>(executors: Array<type_executor<type_element, Error>>): type_executor<Array<type_element>, Error>;
    /**
     * @author fenris
     * @deprecated use condense
     */
    function executor_filter<type_element>(executors: Array<type_executor<type_element, Error>>, predicate: (element: type_element) => boolean): type_executor<Array<type_element>, Error>;
    /**
     * @author fenris
     * @deprecated use condense
     */
    function executor_map<type_element1, type_element2>(executors: Array<type_executor<type_element1, Error>>, transformator: (element1: type_element1) => type_element2): type_executor<Array<type_element2>, Error>;
    /**
     * @author fenris
     * @deprecated use condense
     */
    function executor_reduce<type_element, type_result>(executors: Array<type_executor<type_element, Error>>, initial: type_result, accumulator: (result: type_result, element: type_element) => type_result): type_executor<type_result, Error>;
}
declare module lib_call {
    /**
     * @author fenris
     */
    function knot_loglevel_get(): int;
    /**
     * @author fenris
     */
    function knot_loglevel_push(loglevel: int): void;
    /**
     * @author fenris
     */
    function knot_loglevel_pop(): void;
    /**
     * @author fenris
     */
    type type_knot<type_input, type_output, type_error> = ((input?: type_input) => (resolve: (output?: type_output) => void, reject?: (error?: type_error) => void) => void);
    /**
     * @author fenris
     */
    function knot_resolver<type_input, type_output, type_error>(output: type_output): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_id<type_input, type_error>(): type_knot<type_input, type_input, type_error>;
    /**
     * @author fenris
     */
    function knot_rejector<type_input, type_output, type_error>(error: type_error): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_from_function<type_input, type_output, type_error>(function_: (input: type_input) => type_output): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_wrap<type_input_inner, type_output_inner, type_error_inner, type_input_outer, type_output_outer, type_error_outer>(inner: type_knot<type_input_inner, type_output_inner, type_error_inner>, convert_input: (input_outer: type_input_outer) => type_input_inner, convert_output: (output_inner: type_output_inner) => type_output_outer, convert_error: (error_inner: type_error_inner) => type_error_outer): type_knot<type_input_outer, type_output_outer, type_error_outer>;
    /**
     * @author fenris
     */
    function knot_wrap_log<type_input, type_output, type_error>(inner: type_knot<type_input, type_output, type_error>): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_compose_sequential<type_input, type_between, type_output, type_error>(first: type_knot<type_input, type_between, type_error>, second: type_knot<type_between, type_output, type_error>): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_chain<type_error>(knots: Array<type_knot<any, any, type_error>>, logging?: boolean): type_knot<any, any, type_error>;
    /**
     * @author fenris
     */
    /**
     * @author fenris
     */
    function knot_bunch<type_input, type_error>(knots: {
        [id: string]: type_knot<type_input, any, type_error>;
    }): type_knot<type_input, {
        [id: string]: any;
    }, type_error>;
    /**
     * @author fenris
     */
    function knot_condense<type_input, type_output, type_error>(knots: Array<type_knot<type_input, type_output, type_error>>): type_knot<type_input, Array<type_output>, type_error>;
    /**
     * @author fenris
     */
    function knot_first<type_input, type_output, type_error>(knots: Array<type_knot<type_input, type_output, type_error>>): type_knot<type_input, type_output, Array<type_error>>;
    /**
     * @author fenris
     */
    function knot_repeat<type_input, type_output, type_error>(knot: type_knot<type_input, type_output, type_error>, attempts?: int, delay?: (attempt: int) => int): type_knot<type_input, type_output, Array<type_error>>;
    /**
     * @desc useful for e.g. asynchronous singletons
     * @author fenris
     */
    class class_knot_initializer<type_input, type_output, type_error> {
        /**
         * @desc the actual action to be performed
         * @author fenris
         */
        protected fetcher: type_knot<type_input, type_output, type_error>;
        /**
         * @author fenris
         * 0 : initial
         * 1 : waiting
         * 2 : done, successful
         * 3 : done, failed
         */
        protected state: int;
        /**
         * @author fenris
         */
        protected queue: Array<{
            resolve: (output?: type_output) => void;
            reject: (error?: type_error) => void;
        }>;
        /**
         * @author fenris
         */
        protected output: type_output;
        /**
         * @author fenris
         */
        protected error: type_error;
        /**
         * @author fenris
         */
        constructor(fetcher: type_knot<type_input, type_output, type_error>);
        /**
         * @author fenris
         */
        protected actuate(): void;
        /**
         * @author fenris
         */
        reset(): void;
        /**
         * @author fenris
         */
        get(input: type_input): type_knot<void, type_output, type_error>;
    }
}
declare module lib_call {
    /**
     * @author fenris
     */
    type type_promise<type_result, type_reason> = Promise<type_result>;
    /**
     * @author fenris
     */
    function promise_reject<type_result, type_reason>(reason: type_reason): type_promise<type_result, type_reason>;
    /**
     * @author fenris
     */
    function promise_resolve<type_result, type_reason>(result: type_result): type_promise<type_result, type_reason>;
    /**
     * @author fenris
     */
    function promise_make<type_result, type_reason>(executor: (resolve: (result?: type_result) => void, reject: (reason?: type_reason) => void) => void): type_promise<type_result, type_reason>;
    /**
     * @author fenris
     */
    function promise_all<type_result, type_reason>(promises: Array<type_promise<type_result, type_reason>>): type_promise<Array<type_result>, type_reason>;
}

declare module lib_call {
	
	function promise_log<type_state>(state : type_state) : Promise<type_state>;
	
	function promise_attach<type_value, type_reason>(
		state : {[key : string] : any},
		promise : Promise<type_value>,
		name : string
	) : Promise<{[key : string] : any}>;
	
}

/// <reference path="../../base/build/logic-decl.d.ts" />
declare module lib_object {
    /**
     * @author fenris
     */
    function fetch<type_value>(object: Object, fieldname: string, fallback?: type_value, escalation?: int): type_value;
    /**
     * @author fenris
     */
    function map<type_from, type_to>(object_from: {
        [key: string]: type_from;
    }, transformator: (value_from: type_from, key?: string) => type_to): {
        [key: string]: type_to;
    };
    /**
     * @author fenris
     */
    function filter<type_value>(object_from: {
        [key: string]: type_value;
    }, predicate: (value_from: type_value, key?: string) => boolean): {
        [key: string]: type_value;
    };
    /**
     * @author fenris
     */
    function from_array<type_value>(array: Array<{
        key: string;
        value: type_value;
    }>): {
        [key: string]: type_value;
    };
    /**
     * @author fenris
     */
    function to_array<type_value>(object: {
        [key: string]: type_value;
    }): Array<{
        key: string;
        value: type_value;
    }>;
    /**
     * @author fenris
     */
    function keys(object: {
        [key: string]: any;
    }): Array<string>;
    /**
     * @author fenris
     */
    function values<type_value>(object: {
        [key: string]: type_value;
    }): Array<type_value>;
    /**
     * @author fenris
     */
    function path_read<type_value>(object: Object, path: string, fallback?: type_value, escalation?: int): type_value;
    /**
     * @author fenris
     */
    function path_write<type_value>(object: Object, path: string, value: type_value, construct?: boolean): void;
    /**
     * @author fenris
     */
    function matches(object: Object, pattern: Object, collate?: typeof instance_collate): boolean;
    /**
     * @author fenris
     */
    function flatten(value: any): Object;
    /**
     * @author fenris
     */
    function clash(x: {
        [key: string]: any;
    }, y: {
        [key: string]: any;
    }, {"overwrite": overwrite, "hooks": {"existing": hook_existing}}?: {
        overwrite?: boolean;
        hooks?: {
            existing?: (key?: string, value_old?: any, value_new?: any) => void;
        };
    }): {
        [key: string]: any;
    };
    /**
     * @author fenris
     */
    function patch(core: Object, mantle: Object, deep?: boolean, path?: string): void;
    /**
     * @author fenris
     */
    function patched(core: Object, mantle: Object, deep?: boolean): Object;
    /**
     * @author fenris
     */
    function attached(object: Object, key: string, value: any): Object;
    /**
     * @author fenris
     */
    function copy(object: Object): Object;
}
/**
 * @desc adapters for old syntax
 * @author fenris
 */
declare var object_fetch: typeof lib_object.fetch;
declare var object_map: typeof lib_object.map;
declare var object_a2o: typeof lib_object.from_array;
declare var object_o2a: typeof lib_object.to_array;
declare var object_matches: typeof lib_object.matches;
declare var object_clash: typeof lib_object.clash;
declare var Mapper: any;
/**
 * @param {Object} map
 * @return {string}
 * @author frac
 */
declare var object_map2string: (map: Object) => string;
/**
 * @param {Array} array
 * @return {string}
 * @author frac
 */
declare var object_array2string: (array: any[]) => string;
/**
 * @desc follows a path in an object-tree
 * @param {Object} object the object in which the path lies
 * @param {string} path the steps
 * @param {boolean} [create] whether to create not yet existing branches
 * @return {Object} {'successful': successful, 'position': position} where the branch or leaf at the end of the path
 * @author frac
 */
declare var object_path_walk: (object: Object, path: string, create?: boolean, null_on_missing?: boolean) => any;
/**
 * @desc reads a branch/leaf from an object-tree
 * @author frac
 */
declare var object_path_read: (object: Object, path: string, null_on_missing?: boolean) => any;
/**
 * @desc writes a branch/leaf to an object-tree
 * @author frac
 */
declare var object_path_write: (object: Object, path: string, value: any) => void;
declare var object_object_path_write_ex: (obj: Object, path: string, val: any) => void;
/**
 * @desc filters branches from an object
 * @param {Object} object the object to read from
 * @param {Array} paths a list of string-lists, that are the paths to be propagated
 * @return {Object} the object with only the selected branches
 * @author frac
 */
declare var object_path_filter: (object: any, paths: any) => {};
/**
 * @desc dunno… returns a list of object-paths?
 * @param {Object} object
 * @param {string} p
 * @todo can probably be merged with getLeafg
 */
declare var object_path_list: (object: Object, path?: string, visited?: any[]) => any[];
/**
 * theroreticaly loop prof walk through all elements and subelements of an object
 * and call a callback for each entry
 * @param {object} obj object to iterate through
 * @param {function} callback
 */
declare var object_iterate: (obj: any, callback: any, leafs_only: boolean, path: any, visited?: any[]) => void;
/**
 * @desc get the leaf-nodes of an object
 * @param {object} object
 * @return {Array<string>} a list containing all leaf-nodes
 * @author frac
 */
declare var getLeafs: (object: any) => any;
/**
 *
 * @desc merges two arrays by probing
 * @param {Array} core
 * @param {Array} mantle
 * @param {function} match
 */
declare var merge_array: (core: any, mantle: any, match?: (x: any, y: any) => boolean) => any;
/**
 * @desc merges two objects recursivly
 * @param {Object} object1 core
 * @param {Object} object2 mantle
 * @param {Array} [ignore_keys]
 * @param [do_not_overwrite_existing_values]
 * @returns {Object} a clone of object1 will be returned
 */
declare var object_merge_objects: (object1?: any, object2?: any, ignore_keys?: string[], do_not_overwrite_existing_values?: boolean, ignore_null?: boolean, path?: any[]) => any;
declare var flatten_object: (obj: any, recipie: any, drop_key?: (k: any) => boolean) => {};
/**
 * use the complete path of an objects entry as key to make an one dimensional object
 * @param {object} object the object which should be moade flat
 * @param {string} [path] for the recursive call the current path
 */
declare var object_make_flat: (object: any, path?: any, filter?: string[], split_char?: string, objects?: any[]) => any;
/**
 * splits a flat oject into an array of objects if there are paths containing numbers, which indicates
 * that there might be an array
 * used for normalisation of imports
 * @param entry
 * @param number_replace_string
 * @param {function} [match_function] how to test key if it causes a split
 * @returns {Array}
 */
declare var object_split_flat_object: (entry: any, number_replace_string: any, fab_function: any, match_function: any) => any[];
declare var object_make_flat_async: (data: any, callback: any, on_progress: any) => void;
/**
 */
declare type key_value_list = {
    [key: string]: any;
};
declare var object_flatten: (object: any, paths: string[], prefix?: string) => key_value_list;
/**
 * parse
 * @param {String} value
 * @returns {Object}
 */
declare var object_parse: (value: string) => Object;
/**
 * stringify
 *
 * @description stringify object as JSON
 */
declare var object_stringify: (object: Object, readable?: boolean) => string;
/// <reference path="../../base/build/logic-decl.d.ts" />
/// <reference path="../../object/build/logic-decl.d.ts" />
declare module lib_meta {
    /**
     * @author frac
     */
    type type_type = {
        id: string;
        parameters?: Object;
    };
    /**
     * @author frac
     */
    function type_toString(type: type_type): string;
    /**
     * @author frac
     */
    type type_field = {
        path: string;
        type: type_type;
        display?: boolean;
        label?: string;
        description?: string;
    };
    /**
     * @author frac
     */
    type type_class = {
        fields: Array<type_field>;
        title?: string;
        description?: string;
        groups?: Array<{
            label?: string;
            fields: Array<number>;
        }>;
    };
    /**
     * @author frac
     */
    function class_set(name: string, class_: type_class): void;
    /**
     * @author frac
     */
    function class_get(name: string): type_class;
    /**
     * @author frac
     */
    type type_group = {
        label?: string;
        fields: Array<type_field>;
    };
    /**
     * @author frac
     */
    type type_class_grouped = {
        label?: string;
        groups: Array<type_group>;
    };
    /**
     * @author frac
     */
    function transform_field(name: string, attributes: Object): type_field;
    /**
     * @author frac
     */
    function transform_description(label: string, description: Object, groups_raw?: Array<Object>): type_class;
    /**
     * @author frac
     */
    function transform_description_groups(label: string, description_model: Object, description_groups: Array<Object>): type_class_grouped;
}
declare module lib_meta {
    /**
     * @author fenris
     */
    var _logprefix: string;
    /**
     * @author fenris
     */
    var _verbosity: int;
}
declare module lib_meta {
    /**
     * @author fenris
     */
    type type_shape_raw = {
        id: string;
        parameters?: Object;
    };
    /**
     * @author fenris
     */
    abstract class class_shape implements interface_showable {
        /**
         * @author fenris
         */
        protected primitive: boolean;
        /**
         * @desc whether 'undefined' is a valid value
         * @author fenris
         */
        protected soft: boolean;
        /**
         * @author fenris
         */
        protected defaultvalue: any;
        /**
         * @desc [constructor]
         * @author fenris
         */
        constructor({"primitive": primitive, "soft": soft, "defaultvalue": defaultvalue}: {
            primitive?: boolean;
            soft?: boolean;
            defaultvalue?: any;
        });
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        primitive_get(): boolean;
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        soft_get(): boolean;
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        defaultvalue_get(): any;
        /**
         * @desc [accessor]
         * @author fenris
         */
        inspect(value: any): Array<string>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        check(value: any): boolean;
        /**
         * @desc [accessor]
         * @author fenris
         */
        abstract to_raw(): type_shape_raw;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        abstract _show(): string;
    }
    /**
     * @author fenris
     */
    abstract class class_shape_buildin extends class_shape {
        /**
         * @author fenris
         */
        protected typename: string;
        /**
         * @author fenris
         */
        constructor({"typename": typename, "primitive": primitive, "soft": soft, "defaultvalue": defaultvalue}: {
            typename: string;
            primitive?: boolean;
            soft?: boolean;
            defaultvalue?: any;
        });
        /**
         * @override
         * @author fenris
         */
        inspect(value: any): Array<string>;
        /**
         * @desc [implementation]
         * @author fenris
         */
        _show(): string;
    }
    /**
     * @author fenris
     */
    function register(id: string, factory: (parameters: Object) => class_shape): void;
    /**
     * @author fenris
     */
    function construct(id: string, parameters?: Object): class_shape;
    /**
     * @author fenris
     */
    function from_raw(shape_raw: type_shape_raw): class_shape;
    /**
     * @author fenris
     */
    function define(id: string, shape_raw: type_shape_raw): void;
    /**
     * @author fenris
     */
    function retrieve(id: string): class_shape;
}
declare module lib_meta {
    /**
     * @author fenris
     */
    class class_shape_boolean extends class_shape_buildin {
        /**
         * @author fenris
         */
        constructor({"soft": soft, "defaultvalue": defaultvalue}: {
            soft?: boolean;
            defaultvalue?: any;
        });
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    class class_shape_integer extends class_shape_buildin {
        /**
         * @author fenris
         */
        protected min: int;
        /**
         * @author fenris
         */
        protected max: int;
        /**
         * @author fenris
         */
        constructor({"soft": soft, "defaultvalue": defaultvalue, "min": min, "max": max}: {
            soft?: boolean;
            defaultvalue?: any;
            min?: int;
            max?: int;
        });
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        min_get(): int;
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        max_get(): int;
        /**
         * @override
         * @author fenris
         */
        inspect(value: any): Array<string>;
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    class class_shape_float extends class_shape_buildin {
        /**
         * @author fenris
         */
        protected min: float;
        /**
         * @author fenris
         */
        protected max: float;
        /**
         * @author fenris
         */
        constructor({"soft": soft, "defaultvalue": defaultvalue, "min": min, "max": max}: {
            soft?: boolean;
            defaultvalue?: any;
            min?: float;
            max?: float;
        });
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        min_get(): float;
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        max_get(): float;
        /**
         * @override
         * @author fenris
         */
        inspect(value: any): Array<string>;
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    class class_shape_string extends class_shape_buildin {
        /**
         * @author fenris
         */
        constructor({"soft": soft, "defaultvalue": defaultvalue}: {
            soft?: boolean;
            defaultvalue?: string;
        });
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    class class_shape_email extends class_shape {
        /**
         * @author fenris
         */
        constructor({"soft": soft, "defaultvalue": defaultvalue}: {
            soft?: boolean;
            defaultvalue?: string;
        });
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
        /**
         * @desc [implementation]
         * @author fenris
         */
        _show(): string;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    class class_shape_array extends class_shape {
        /**
         * @author fenris
         */
        protected shape_element: class_shape;
        /**
         * @author fenris
         */
        constructor({"shape_element": shape_element, "soft": soft, "defaultvalue": defaultvalue}: {
            shape_element: class_shape;
            soft?: boolean;
            defaultvalue?: any;
        });
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        shape_element_get(): class_shape;
        /**
         * @override
         * @author fenris
         */
        inspect(value: any): Array<string>;
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
        /**
         * @desc [implementation]
         * @author fenris
         */
        _show(): string;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    type type_objectfield = {
        name: string;
        shape: class_shape;
        label: string;
    };
    /**
     * @author fenris
     */
    class class_shape_object extends class_shape_buildin {
        /**
         * @author fenris
         */
        protected fields: Array<type_objectfield>;
        /**
         * @author fenris
         */
        constructor({"fields": fields, "soft": soft, "defaultvalue": defaultvalue}: {
            fields: Array<type_objectfield>;
            soft?: boolean;
            defaultvalue?: any;
        });
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        fields_get(): Array<type_objectfield>;
        /**
         * @override
         * @author fenris
         * @todo check for superfluous fields?
         */
        inspect(value: any): Array<string>;
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
        /**
         * @desc [implementation]
         * @author fenris
         */
        _show(): string;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    class class_shape_date extends class_shape {
        /**
         * @author fenris
         */
        constructor({"soft": soft, "defaultvalue": defaultvalue}: {
            soft?: boolean;
            defaultvalue?: any;
        });
        /**
         * @override
         * @author fenris
         */
        inspect(value: any): Array<string>;
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
        /**
         * @desc [implementation]
         * @author fenris
         */
        _show(): string;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    type type_enumerationoption = {
        value: any;
        label: string;
    };
    /**
     * @author fenris
     */
    class class_shape_enumeration extends class_shape {
        /**
         * @author fenris
         */
        protected shape_option: class_shape;
        /**
         * @author fenris
         */
        protected options: Array<type_enumerationoption>;
        /**
         * @author fenris
         */
        constructor({"shape_option": shape_option, "options": options, "soft": soft, "defaultvalue": defaultvalue}: {
            shape_option: class_shape;
            options: Array<type_enumerationoption>;
            soft?: boolean;
            defaultvalue?: any;
        });
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        shape_option_get(): class_shape;
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        options_get(): Array<type_enumerationoption>;
        /**
         * @override
         * @author fenris
         */
        inspect(value: any): Array<string>;
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
        /**
         * @desc [implementation]
         * @author fenris
         */
        _show(): string;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     */
    class class_shape_map extends class_shape {
        /**
         * @author fenris
         */
        protected shape_key: class_shape;
        /**
         * @author fenris
         */
        protected shape_value: class_shape;
        /**
         * @author fenris
         */
        constructor({"shape_key": shape_key, "shape_value": shape_value, "soft": soft, "defaultvalue": defaultvalue}: {
            shape_key: class_shape;
            shape_value: class_shape;
            soft?: boolean;
            defaultvalue?: any;
        });
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        shape_key_get(): class_shape;
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        shape_value_get(): class_shape;
        /**
         * @override
         * @author fenris
         */
        inspect(value: any): Array<string>;
        /**
         * @override
         * @author fenris
         */
        to_raw(): type_shape_raw;
        /**
         * @desc [implementation]
         * @author fenris
         */
        _show(): string;
    }
}
declare module lib_meta {
    /**
     * @author fenris
     * @todo use a treemap-function (but first make one :P)
     */
    function adjust_labels(shape: class_shape, transformator: (label_old: string) => string): class_shape;
}
/// <reference path="../../base/build/logic-decl.d.ts" />
declare var plain_text_to_html: (text: string) => string;
/**
 * @desc makes a valid
 */
declare var format_sentence: (str: string, rtl?: boolean, caseSense?: boolean) => string;
declare var fill_string_template: (template_string: string, object: any, fabric: Function, delimiter: string, default_string: string, sloppy: boolean) => string;
declare var make_string_template: (_template: string, _fabrics?: Object) => (object: {
    [key: string]: string;
}) => string;
declare var make_eml_header: (object: {
    [key: string]: string;
}) => string;
declare var make_eml_body: Object;
declare module lib_string {
    /**
     * @author neuc,frac
     */
    function empty(str: string): boolean;
    /**
     * @desc returns a unique string
     * @param {string} prefix an optional prefix for the generated string
     * @return {string}
     * @author frac
     */
    function generate(prefix?: string): string;
    /**
     * @desc splits a string, but returns an empty list, if the string is empty
     * @param {string} chain
     * @param {string} separator
     * @return {Array<string>}
     * @author frac
     */
    function split(chain: string, separator?: string): Array<string>;
    /**
     * @desc concats a given word with itself n times
     * @param {string} word
     * @param {int}
     * @return {string}
     * @author frac
     */
    function repeat(word: string, count: int): string;
    /**
     * @desc lengthens a string by repeatedly appending or prepending another string
     * @param {string} word the string to pad
     * @param {int} length the length, which the result shall have
     * @param {string} symbol the string, which will be added (multiple times)
     * @param {boolean} [prepend]; whether to prepend (~true) or append (~false); default: false
     * @return {string} the padded string
     * @author frac
     */
    function pad(word: string, length: int, symbol: string, prepend?: boolean): string;
    /**
     * @desc checks if a given string conttains a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function contains(chain: string, part: string): boolean;
    /**
     * @desc checks if a given string starts with a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function startsWith(chain: string, part: string): boolean;
    /**
     * @desc checks if a given string ends with a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function endsWith(chain: string, part: string): boolean;
    /**
     * @desc count the occourrences of a string in a string
     * @param string haystack_string the string wich should be examined
     * @param string needle_string the string which should be counted
     * @author neuc
     */
    function count_occourrences(haystack_string: string, needle_string: string, check_escape: boolean): int;
    /**
     * @author fenris
     */
    function stance(str: string, args: {
        [id: string]: string;
    }): string;
}
/**
 * @desc adapters for old syntax
 */
declare var string_generate: typeof lib_string.generate;
declare var string_split: typeof lib_string.split;
declare var string_repeat: typeof lib_string.repeat;
declare var string_pad: typeof lib_string.pad;
declare var string_contains: typeof lib_string.contains;
declare var string_startsWith: typeof lib_string.startsWith;
declare var string_endsWith: typeof lib_string.endsWith;
declare var string_count_occourrences: typeof lib_string.count_occourrences;
declare module lib_string {
    /**
     * an implementation of c sprintf
     * @param {string} string format string
     * @param {array} args arguments which should be filled into
     * @returns {string}
     */
    var sprintf: (input: string, args?: any[], original?: any) => string;
    /**
     * an implementation of c printf
     * @param {string} string format string
     * @param {array} args arguments which should be filled into
     * @returns {string}
     */
    function printf(format: any, args: any): void;
}
declare var sprintf: (input: string, args?: any[], original?: any) => string;
declare var printf: typeof lib_string.printf;
declare var global_config: any;
/**
 * @author neuc
 */
declare module strftime {
    function set_days(day_names: Array<string>): void;
    function set_months(month_names: Array<string>): void;
    function set_currentDate(date: Date): void;
    function parse(format: string, date?: Date): string;
}
declare function locale_date(date?: Date, ignore_error?: boolean): string;
declare var eml_log: any;
declare var track_exports: any;
declare var make_logger: (prefix: any, current_loglevel: any) => (obj: any, lvl: any) => void;
/// <reference path="../../base/build/logic-decl.d.ts" />
/// <reference path="../../string/build/logic-decl.d.ts" />
/**
 * @author fenris
 */
declare module lib_xml {
    /**
     * @author fenris
     */
    abstract class class_node {
        /**
         * @author fenris
         */
        abstract compile(depth?: int): string;
    }
    /**
     * @author fenris
     */
    class class_node_text extends class_node {
        /**
         * @author fenris
         */
        protected content: string;
        /**
         * @author fenris
         */
        constructor(content: string);
        /**
         * @author fenris
         */
        compile(depth?: int): string;
    }
    /**
     * @author fenris
     */
    class class_node_comment extends class_node {
        /**
         * @author fenris
         */
        protected content: string;
        /**
         * @author fenris
         */
        constructor(content: string);
        /**
         * @author fenris
         */
        compile(depth?: int): string;
    }
    /**
     * @author fenris
     */
    class class_node_complex extends class_node {
        /**
         * @author fenris
         */
        protected name: string;
        /**
         * @author fenris
         */
        protected attributes: {
            [key: string]: string;
        };
        /**
         * @author fenris
         */
        protected children: Array<class_node>;
        /**
         * @author fenris
         */
        constructor(name: string, attributes?: {
            [key: string]: string;
        }, children?: any[]);
        /**
         * @author fenris
         */
        compile(depth?: int): string;
    }
}
/// <reference path="../../object/build/logic-decl.d.ts" />
declare module lib_path {
    /**
     * @author fenris
     */
    abstract class class_step {
        /**
         * @author fenris
         */
        abstract invert(): class_step;
        /**
         * @author fenris
         */
        abstract toString(): string;
    }
    /**
     * @author fenris
     */
    class class_step_stay extends class_step {
        /**
         * @author fenris
         */
        invert(): class_step;
        /**
         * @author fenris
         */
        toString(): string;
    }
    /**
     * @author fenris
     */
    class class_step_back extends class_step {
        /**
         * @author fenris
         */
        invert(): class_step;
        /**
         * @author fenris
         */
        toString(): string;
    }
    /**
     * @author fenris
     */
    class class_step_regular extends class_step {
        /**
         * @author fenris
         */
        protected name: string;
        /**
         * @author fenris
         */
        constructor(name: string);
        /**
         * @author fenris
         */
        invert(): class_step;
        /**
         * @author fenris
         */
        toString(): string;
    }
    /**
     * @author fenris
     */
    function step_read(s: string): class_step;
}
declare module lib_path {
    /**
     * @author fenris
     */
    class class_chain {
        /**
         * @author fenris
         */
        static splitter(system?: string): string;
        /**
         * @author fenris
         */
        steps: Array<class_step>;
        /**
         * @author fenris
         */
        constructor(steps?: Array<class_step>);
        /**
         * @desc removes superfluent steps from the chain, e.g. infix ".."
         * @author fenris
         */
        normalize(): class_chain;
        /**
         * @author fenris
         */
        invert(): class_chain;
        /**
         * @author fenris
         */
        protected add(step: class_step): class_chain;
        /**
         * @author fenris
         */
        extend(chain: class_chain): class_chain;
        /**
         * @author fenris
         */
        as_string(system?: string): string;
        /**
         * @author fenris
         */
        toString(): string;
    }
    /**
     * @author fenris
     */
    function chain_read(str: string, system?: string): class_chain;
}
declare var process: any;
declare module lib_path {
    /**
     * @author fenris
     */
    class class_location {
        /**
         * @author fenris
         */
        static anchorpattern(system?: string): RegExp;
        /**
         * @author fenris
         */
        anchor: string;
        /**
         * @author fenris
         */
        chain: class_chain;
        /**
         * @author fenris
         */
        constructor(anchor: string, chain: class_chain);
        /**
         * @desc [accessor]
         * @author fenris
         */
        is_absolute(): boolean;
        /**
         * @author fenris
         */
        normalize(): class_location;
        /**
         * @author fenris
         */
        extend(chain: class_chain): class_location;
        /**
         * @desc [accessor]
         * @author fenris
         */
        relocate(location: class_location): class_location;
        /**
         * @author fenris
         */
        go_thither(): void;
        /**
         * @author fenris
         */
        expedition(core: (finish: () => void) => void): void;
        /**
         * @author fenris
         */
        as_string(system?: string): string;
        /**
         * @author fenris
         */
        toString(): string;
        /**
         * @author fenris
         */
        static current(): class_location;
        /**
         * @author fenris
         */
        static tempfolder(system?: string): class_location;
    }
    /**
     * @author fenris
     */
    function location_read(str: string, system?: string): class_location;
}
declare module lib_path {
    /**
     * @author fenris
     */
    class class_filepointer {
        /**
         * @author fenris
         */
        location: class_location;
        /**
         * @author fenris
         */
        filename: string;
        /**
         * @author fenris
         */
        constructor(location: class_location, filename: string);
        /**
         * @author fenris
         */
        normalize(): class_filepointer;
        /**
         * @author fenris
         */
        foo(filepointer: class_filepointer): class_filepointer;
        /**
         * @desc [accessor]
         * @author fenris
         */
        relocate(location: class_location): class_filepointer;
        /**
         * @author fenris
         */
        as_string(system?: string): string;
        /**
         * @author fenris
         */
        toString(): string;
    }
    /**
     * @author fenris
     */
    function filepointer_read(str: string, system?: string): class_filepointer;
}
/// <reference path="../../call/build/logic-decl.d.ts" />
/// <reference path="../../base/build/logic-decl.d.ts" />
declare module lib_file {
    /**
     * @author fenris
     */
    abstract class class_file_abstract {
        /**
         * @desc reads a file
         * @author fenris
         */
        abstract read(path: string, skip_error?: boolean): lib_call.type_executor<string, Error>;
        /**
         * @desc writes a file
         * @author fenris
         */
        abstract write(path: string, content: string): lib_call.type_executor<void, Error>;
        /**
         * @desc reads a json file
         * @author fenris
         */
        read_json(path: string): lib_call.type_executor<any, Error>;
        /**
         * @desc writes a json file
         * @author fenris
         */
        write_json(path: string, data: any): lib_call.type_executor<void, Error>;
    }
}
declare module lib_file {
    /**
     * @author fenris
     */
    class class_file_node extends class_file_abstract {
        /**
         * @author maspr
         */
        private determine_handler(path);
        /**
         * @override
         * @author fenris,maspr
         * @todo clear up if http(s)-handling belongs here or not
         */
        read(path: string, skip_error?: boolean): lib_call.type_executor<string, Error>;
        /**
         * @override
         * @author fenris
         */
        write(path: string, content: string): lib_call.type_executor<void, Error>;
    }
}
declare module lib_file {
    /**
     * @author fenris
     */
    class class_file_web extends class_file_abstract {
        /**
         * @override
         * @author fenris
         */
        read(path: string, skip_error?: boolean): lib_call.type_executor<string, Error>;
        /**
         * @override
         * @author fenris
         */
        write(path: string, content: string): lib_call.type_executor<void, Error>;
    }
}
declare module lib_file {
    /**
     * @desc selects the implementation which fits for the detected environment
     * @author fenris
     */
    function auto(): class_file_abstract;
    /**
     * @author fenris
     */
    class class_file extends class_file_abstract {
        /**
         * @author fenris
         */
        protected core: class_file_abstract;
        /**
         * @author fenris
         */
        constructor();
        /**
         * @override
         * @author fenris
         */
        read(path: string, skip_error?: boolean): lib_call.type_executor<string, Error>;
        /**
         * @override
         * @author fenris
         */
        write(path: string, content: string): lib_call.type_executor<void, Error>;
    }
    /**
     * @author fenris
     */
    function read(path: string, skip_error?: boolean): lib_call.type_executor<string, Error>;
    /**
     * @author fenris
     */
    function write(path: string, content: string): lib_call.type_executor<void, Error>;
    /**
     * @author fenris
     */
    function read_json(path: string): lib_call.type_executor<any, Error>;
    /**
     * @author fenris
     */
    function write_json(path: string, data: any): lib_call.type_executor<void, Error>;
}
/// <reference path="../../base/build/logic-decl.d.ts" />
declare module lib_args {
    /**
     * @author fenris
     */
    class class_argument {
        /**
         * @author fenris
         */
        protected name: string;
        /**
         * @author fenris
         */
        protected type: string;
        /**
         * @desc {"replace"|"accumulate"}
         * @author fenris
         */
        protected mode: string;
        /**
         * @author fenris
         */
        protected default_: any;
        /**
         * @author fenris
         */
        protected info: string;
        /**
         * @desc {"positional"|"volatile"}
         * @author fenris
         */
        protected kind: string;
        /**
         * @author fenris
         */
        protected parameters: Object;
        /**
         * @author fenris
         */
        protected hidden: boolean;
        /**
         * @author fenris
         */
        constructor({"name": name, "type": type, "default": default_, "info": info, "mode": mode, "kind": kind, "parameters": parameters, "hidden": hidden}: {
            name: string;
            type?: string;
            default?: any;
            info?: string;
            mode?: string;
            kind?: string;
            parameters?: Object;
            hidden?: boolean;
        });
        /**
         * @author fenris
         */
        check(): boolean;
        /**
         * @author fenris
         */
        name_get(): string;
        /**
         * @author fenris
         */
        type_get(): string;
        /**
         * @author fenris
         */
        default_get(): any;
        /**
         * @author fenris
         */
        kind_get(): string;
        /**
         * @author fenris
         */
        parameters_get(): Object;
        /**
         * @author fenris
         */
        hidden_get(): boolean;
        /**
         * @author fenris
         */
        toString(): string;
        /**
         * @author fenris
         */
        indicator_main(): string;
        /**
         * @author fenris
         */
        pattern_value(): string;
        /**
         * @author fenris
         */
        extract(raw: string): any;
        /**
         * @author fenris
         */
        assign(data: Object, raw: string): void;
        /**
         * @author fenris
         */
        make(data: Object): string;
        /**
         * @author fenris
         */
        generate_help(): string;
    }
}
declare module lib_args {
    /**
     * @author fenris
     */
    var verbosity: int;
    /**
     * @author fenris
     * @todo check validity
     */
    class class_handler {
        /**
         * @author fenris
         */
        protected arguments_: Array<class_argument>;
        /**
         * @author fenris
         */
        constructor(arguments_: Array<class_argument>);
        /**
         * @author fenris
         */
        filter(kind: string): Array<class_argument>;
        /**
         * @author fenris
         */
        read(environment: string, input: string, data?: Object): Object;
        /**
         * @author fenris
         * @todo handle if the data object doesn't have the required field or the type is wrong or sth.
         */
        write(environment: string, data: Object): string;
        /**
         * @desc manpage-like info-sheet
         * @author fenris
         */
        generate_help({"programname": programname, "author": author, "description": description, "executable": executable}: {
            programname?: string;
            author?: string;
            description?: string;
            executable?: string;
        }): string;
    }
}

