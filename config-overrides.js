module.exports = {
	webpack: function (config, env) {
		config.module.rules.forEach(rule => {
			(rule.oneOf || []).forEach(oneOf => {
				if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
					oneOf.exclude.push(/\.wasm$/);
				}
			});
		});
		return config
	}
}