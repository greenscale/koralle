
/**
 * @author fenris
 */
class_tasktemplate.register(
	"lesscss",
	new class_tasktemplate_aggregator(
		{
			"description": "compiles a list of lesscss input files to a single css output file",
			"factory": (data) => {
				let filepointer_temp : lib_path.class_filepointer = new lib_path.class_filepointer(
					lib_path.location_read(globalvars.configuration["tempfolder"]),
					"_.less"
				);
				return {
					"inputs": this.inputs_all(data),
					"outputs": data["outputs"],
					"actions": [
						new class_action_mkdir(
							data["output"].location
						),
						new class_action_concat(
							this.inputs_all(data),
							filepointer_temp
						),
						new class_action_lessc(
							filepointer_temp,
							data["output"]
						),
					],
				};
			},
		}
	)
);


