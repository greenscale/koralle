declare type int = number;
declare type float = number;
declare var process: any;
declare var require: any;
declare var java: any;
declare module lib_base {
    /**
     * @author frac
     */
    function environment(): string;
}
declare function hash(value: any): string;
declare function equals(value_x: any, value_y: any): boolean;
declare function show(value: any): string;
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
declare var ExceptionAbstract: any;
/**
 * @author frac
 */
declare class class_maybe<type_value> {
    /**
     * @desc whether the wrapper is nothing
     * @author frac
     */
    is_nothing(): boolean;
    /**
     * @desc whether the wrapper is just
     * @author frac
     */
    is_just(): boolean;
    /**
     * @desc return the value, stored in the maybe-wrapper
     * @author frac
     */
    cull(): type_value;
    /**
     * @author frac
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author frac
     */
    propagate<type_value_>(action: (value: type_value) => class_maybe<type_value_>): class_maybe<type_value_>;
}
/**
 * @author frac
 */
declare class class_nothing<type_value> extends class_maybe<type_value> {
    /**
     * @author frac
     */
    private reason;
    /**
     * @author frac
     */
    constructor(reason?: string);
    /**
     * @author frac
     */
    is_nothing(): boolean;
    /**
     * @author frac
     */
    is_just(): boolean;
    /**
     * @author frac
     */
    cull(): type_value;
    /**
     * @author frac
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author frac
     */
    propagate<type_value_>(action: (value: type_value) => class_maybe<type_value_>): class_maybe<type_value_>;
}
/**
 * @author frac
 */
declare class class_just<type_value> extends class_maybe<type_value> {
    /**
     * @author frac
     */
    private value;
    /**
     * @author frac
     */
    constructor(value: type_value);
    /**
     * @author frac
     */
    is_nothing(): boolean;
    /**
     * @author frac
     */
    is_just(): boolean;
    /**
     * @author frac
     */
    cull(): type_value;
    /**
     * @author frac
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author frac
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
declare var Exception: any;
declare var ExceptionAbstract: any;
declare var exception_is: any;
/**
 * @author frac
 */
declare class Pair<First, Second> {
    first: First;
    second: Second;
    constructor(first: First, second: Second);
    equals(pair: Pair<First, Second>): boolean;
    hash(): string;
    toString(): string;
}
/**
 * @author frac
 */
declare class AbstractMap<Key, Value> {
    size: int;
    constructor();
    get(key: Key): Value;
    get_fallback(key: Key, fallback?: Value): Value;
    has(key: Key): boolean;
    set(key: Key, value: Value): AbstractMap<Key, Value>;
    extend(map: AbstractMap<Key, Value>): void;
    delete(key: Key): boolean;
    clear(): void;
    forEach(action: (value: Value, key: Key, self: AbstractMap<Key, Value>) => void): void;
    pairs(): Array<Pair<Key, Value>>;
    toString(): string;
}
/**
 * @author frac
 */
declare class EqualityMap<Key, Value> extends AbstractMap<Key, Value> {
    private pairs_;
    constructor();
    private get_index(key);
    private get_pair(key);
    get(key: Key): Value;
    has(key: Key): boolean;
    set(key: Key, value: Value): EqualityMap<Key, Value>;
    delete(key: Key): boolean;
    clear(): void;
    forEach(action: (value: Value, key: Key, self: EqualityMap<Key, Value>) => void): void;
}
/**
 * @author frac
 */
declare class HashMap<Key, Value> extends AbstractMap<Key, Value> {
    private keys_original;
    private object;
    constructor();
    get(key: Key): Value;
    has(key: Key): boolean;
    set(key: Key, value: Value): HashMap<Key, Value>;
    delete(key: Key): boolean;
    clear(): void;
    forEach(action: (value: Value, key: Key, self: HashMap<Key, Value>) => void): void;
}
/**
 * @author frac
 */
declare class SimpleMap<Value> extends HashMap<string, Value> {
    constructor();
}
/**
 * @author frac
 */
declare class Tree<Value> {
    private parent;
    private value;
    private children;
    constructor(parent?: Tree<Value>, value?: Value, children?: Array<Tree<Value>>);
    value_get(): Value;
    map<Value_>(transformator: (value: Value) => Value_, parent?: Tree<Value_>): Tree<Value_>;
    flatten(postorder?: boolean): Array<Tree<Value>>;
    traverse(postorder?: boolean): Array<Value>;
    graph(prefix?: string): Graph<Value>;
    value_set(value: Value): void;
    children_add(tree: Tree<Value>): void;
}
/**
 * @author frac
 */
declare class Graph<Value> {
    private vertices;
    private edges;
    constructor(vertices: Array<Pair<string, Value>>, edges: Array<Pair<Pair<string, string>, any>>);
    get_vertices(): Array<Pair<string, any>>;
    get_edges(): Array<Pair<Pair<string, string>, any>>;
    graphviz(name?: string): string;
}
declare function tree_test(): Tree<int>;
/**
 * @author frac
 */
declare class class_set<type_element> {
    /**
     * @author frac
     */
    protected elements: Array<type_element>;
    /**
     * @author frac
     */
    constructor(elements?: Array<type_element>);
    /**
     * @author frac
     */
    elements_get(): Array<type_element>;
    /**
     * @author frac
     */
    add(element: type_element): void;
    /**
     * @author frac
     */
    forEach(action: (element: type_element, index?: int) => void): void;
}
/// <reference path="../../base/build/logic.d.ts" />
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
     * @author frac
     */
    function nothing(): void;
    /**
     * @desc just the identity; useful for some callbacks etc.
     * @author frac
     */
    function id<type_value>(x: type_value): type_value;
    /**
     * @author frac
     */
    function use<type_input, type_output>(input: type_input, function_: (input: type_input) => type_output): type_output;
    /**
     * @desc outputs
     * @author frac
     */
    function output(x: any): void;
    /**
     * @desc converts the "arguments"-map into an array
     * @param {Object} args
     * @author frac
     */
    function args2list(args: any): Array<any>;
    /**
     * @desc provides the call for an attribute of a class as a regular function
     * @param {string} name the name of the attribute
     * @return {*}
     * @author frac
     */
    function attribute<type_object, type_attribute>(name: string): (object: type_object) => type_attribute;
    /**
     * @desc provides a method of a class as a regular function
     * @param {string} name the name of the method
     * @return {function}
     * @author frac
     */
    function method<type_object, type_output>(name: string): (object: type_object) => type_output;
    /**
     * @desc composes two functions (i.e. returns a function that return the result of the successive execution of both input-functions)
     * @param {function} function_f
     * @param {function} function_g
     * @author frac
     */
    function compose<type_x, type_y, type_z>(function_f: (type_x) => type_y, function_g: (type_y) => type_z): (value: type_x) => type_z;
    /**
     * @desc transforms a function with sequential input into a function with leveled input; example: add(2,3) = curryfy(add)(2)(3)
     * @param {function} f
     * @param {int} n (don't set manually)
     * @return {function} the currified version of the in put function
     * @author frac
     */
    function curryfy(f: Function, n?: int): Function;
    /**
     * @desc adapter for old syntax
     * @author frac
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
     * @author frac
     */
    type type_executor<type_result, type_reason> = ((resolve: (result?: type_result) => void, reject?: (reason?: type_reason) => void) => void);
    /**
     * @author frac
     */
    function executor_resolve<type_result, type_reason>(result: type_result): type_executor<type_result, type_reason>;
    /**
     * @author frac
     */
    function executor_reject<type_result, type_reason>(reason: type_reason): type_executor<type_result, type_reason>;
    /**
     * @author frac
     */
    function executor_transform<type_result_from, type_error_from, type_result_to, type_error_to>(executor: type_executor<type_result_from, type_error_from>, transform_result: (result_from: type_result_from) => type_result_to, transform_reason: (error_from: type_error_from) => type_error_to): type_executor<type_result_to, type_error_to>;
    /**
     * @author frac
     */
    function executor_transform_default<type_result_from, type_result_to>(executor: type_executor<type_result_from, Error>, transform_result: (result_from: type_result_from) => type_result_to, wrap_string?: string): type_executor<type_result_to, Error>;
    /**
     * @author frac
     */
    function executor_compose_sequential<type_result_first, type_result_second, type_reason>(first: type_executor<type_result_first, type_reason>, second: (result: type_result_first) => type_executor<type_result_second, type_reason>, deferred?: boolean): type_executor<type_result_second, type_reason>;
    /**
     * @author frac
     */
    function executor_chain<type_state, type_error>(state: type_state, executors: Array<(state: type_state) => type_executor<type_state, type_error>>, deferred?: boolean): type_executor<type_state, type_error>;
    /**
     * @author frac
     */
    function executor_first<type_result, type_reason>(executors: Array<type_executor<type_result, type_reason>>): type_executor<type_result, Array<type_reason>>;
    /**
     * @author frac
     */
    function executor_condense<type_element>(executors: Array<type_executor<type_element, Error>>): type_executor<Array<type_element>, Error>;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_filter<type_element>(executors: Array<type_executor<type_element, Error>>, predicate: (element: type_element) => boolean): type_executor<Array<type_element>, Error>;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_map<type_element1, type_element2>(executors: Array<type_executor<type_element1, Error>>, transformator: (element1: type_element1) => type_element2): type_executor<Array<type_element2>, Error>;
    /**
     * @author frac
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
    function knot_chain<type_input, type_output, type_error>(knots: Array<type_knot<any, any, type_error>>): type_knot<type_input, type_output, type_error>;
    /**
     * @author frac
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
     * @author frac
     */
    function knot_condense<type_input, type_output, type_error>(knots: Array<type_knot<type_input, type_output, type_error>>): type_knot<type_input, Array<type_output>, type_error>;
}
/// <reference path="../../base/build/logic.d.ts" />
/// <reference path="../../call/build/logic.d.ts" />
declare var plain_text_to_html: (text: string) => string;
/**
 * @desc makes a valid
 */
declare var format_sentence: (str: string, rtl?: boolean, caseSense?: boolean) => string;
declare var fill_string_template: (template_string: string, object: any, fabric?: Function, delimiter?: string, default_string?: string) => string;
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
/// <reference path="../../base/build/logic.d.ts" />
/// <reference path="../../string/build/logic.d.ts" />
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
/// <reference path="../../base/build/logic.d.ts" />
/// <reference path="../../string/build/logic.d.ts" />
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
    function matches(object: Object, pattern: Object): boolean;
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
 * @author frac
 */
declare function object_clash(x: Object, y: Object): Object;
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
declare var object_flatten: (object: any, paths: string[], prefix?: string) => {
    [key: string]: any;
};
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
declare var pivot_demo_data0: any;
declare module lib_object {
    /**
     * @author frac
     */
    type type_relationparameters<type_value> = {
        symbol?: string;
        name?: string;
        predicate?: (value: type_value, reference: type_value) => boolean;
    };
    /**
     * @author frac
     */
    class class_relation<type_value> {
        /**
         * @author frac
         */
        protected id: string;
        /**
         * @author frac
         */
        protected symbol: string;
        /**
         * @author frac
         */
        protected name: string;
        /**
         * @author frac
         */
        protected predicate: (value: type_value, reference: type_value) => boolean;
        /**
         * @author frac
         */
        check(value: type_value, reference: type_value): boolean;
        /**
         * @author frac
         */
        constructor(id: string, parameters: type_relationparameters<type_value>);
        /**
         * @author frac
         */
        id_get(): string;
        /**
         * @author frac
         */
        symbol_get(): string;
        /**
         * @author frac
         */
        name_get(): string;
        /**
         * @author frac
         */
        protected static pool<type_value>(): {
            [id: string]: type_relationparameters<type_value>;
        };
        /**
         * @author frac
         */
        static get<type_value>(id: string): class_relation<type_value>;
        /**
         * @author frac
         */
        static available(): Array<string>;
    }
    /**
     * @author frac
     */
    class class_filtrationitem<type_value> {
        /**
         * @author frac
         */
        protected extract: (dataset: Object) => type_value;
        /**
         * @author frac
         */
        protected relation: class_relation<type_value>;
        /**
         * @author frac
         */
        protected reference: type_value;
        /**
         * @author frac
         */
        constructor(parameters: {
            extract?: (dataset: Object) => type_value;
            relation?: class_relation<type_value>;
            reference?: type_value;
        });
        /**
         * @author frac
         */
        check(dataset: Object): boolean;
    }
    /**
     * @author frac
     */
    class class_filtration {
        /**
         * @author frac
         */
        protected clauses: Array<Array<class_filtrationitem<any>>>;
        /**
         * @author frac
         */
        constructor(clauses: Array<Array<class_filtrationitem<any>>>);
        /**
         * @author frac
         */
        check(dataset: Object): boolean;
        /**
         * @author frac
         */
        use(datasets: Array<Object>): Array<Object>;
        /**
         * @author frac
         */
        static test(): void;
    }
}
/// <reference path="../../object/build/logic.d.ts" />
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
         * @author fenris
         */
        normalize(): class_location;
        /**
         * @author fenris
         */
        extend(chain: class_chain): class_location;
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
/// <reference path="../../base/build/logic.d.ts" />
/// <reference path="../../call/build/logic.d.ts" />
declare module lib_file {
    /**
     * @author fenris
     * @todo move to a dedicated lib (e.g. "http", "transport", etc.)
     */
    function ajax({"target": target, "data": data, "method": method}: {
        target: any;
        data?: null;
        method?: string;
    }): lib_call.type_executor<string, Error>;
    /**
     * @desc reads a file
     * @author fenris
     */
    function read(path: string, skip_error?: boolean): lib_call.type_executor<string, Error>;
    /**
     * @desc reads a json file
     * @author fenris
     */
    function read_json(path: string): lib_call.type_executor<Object, Error>;
    /**
     * @desc writes a file
     * @author fenris
     */
    function write(path: string, content: string): lib_call.type_executor<void, Error>;
    /**
     * @desc writes a json file
     * @author fenris
     */
    function write_json(path: string, data: Object): lib_call.type_executor<void, Error>;
}
/// <reference path="../../base/build/logic.d.ts" />
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
