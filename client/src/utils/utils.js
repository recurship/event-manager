// @flow
export function makeQueryStringTransformable (params: Object): Object {
	let transformedParams = {};
	for (let key in params) {
		if (params.hasOwnProperty(key)) {
			if (typeof params[key] == "object" && Array.isArray(params[key])) {
				transformedParams[key] = (params[key].map(x => `${x.value}`)).join(',')
			} else if (typeof params[key] == "object" && !Array.isArray(params[key])) {
				transformedParams[key] = `${params[key].value}`;
			} else {
				transformedParams[key] = params[key];
			}
		}
	}
	return transformedParams;
}