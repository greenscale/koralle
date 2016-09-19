
///<reference path="../../../plankton/base/build/logic.d.ts"/>
///<reference path="../../../plankton/call/build/logic.d.ts"/>


/**
 * @author fenris
 */
var __idcounter : int = 0;


/**
 * @author fenris
 */
function genid(prefix : string = "") : string {
	return (prefix + (__idcounter++).toString(16));
}


/**
 * @author fenris
 */
function read_json(path : string) : lib_cdh_call.type_executor<Object, Error> {
	type type_state = {readable ?: boolean; content ?: string; data ?: Object;};
	return (
		(resolve, reject) => {
			lib_cdh_call.executor_chain<type_state, Error>(
				{},
				[
					/*
					state => (resolve_, reject_) => {
						_fs.access(
							path,
							_fs.R_OK | _fs.W_OK,
							error => {
								if (error == null) {
									state.readable = true;
									resolve_(state);
								}
								else {
									reject_(new class_error("project.json at '" + path + "' couldn't be read", [error]));
								}
							}
						);
					},					
					 */
					state => (resolve_, reject_) => {
						_fs.readFile(
							path,
							{
								"encoding": "utf-8",
								"flag": "r",
							},
							function (error : Error, content : string) : void {
								if (error == null) {
									state.content = content;
									resolve_(state);
								}
								else {
									reject_(new class_error("unable to read content of file '" + path + "'", [error]));
								}
							}
						);
					},
					state => (resolve_, reject_) => {
						try {
							state.data = JSON.parse(state.content);
							resolve_(state);
						}
						catch (exception) {
							reject_(new class_error("content of '" + path + "' is not in valid JSON-syntax", [exception]));
						}
					},
				]
			)(
				state => resolve(state.data),
				reject
			)
		}
	);
}

