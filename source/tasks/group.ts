
/**
 * @author fenris
 */
class_tasktemplate.register(
	"group",
	new class_tasktemplate(
		{
			"description": "does nothing but executing the sub tasks",
			"factory": (data) => {
				return {
				};
			}
		}
	)
);

