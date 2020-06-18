export default function(callback = null) {
	let configMethods = {};

	//## RULES
	let guidelines = {
		// ## RULES
		rules: {},
		setRule(name, value) {
			this.rules[name] = value;
		},
		getRule(name){
			return this.rules.hasOwnProperty(name) ? this.rules[name] : null
		},
		getRules() {
			return this.rules
		},

		// ## ERRORS
		errors: [],
		required: [],
		setError(value) {
			this.errors.push(value);
		},
		getError(name){
			return this.errors.hasOwnProperty(name) ? this.errors[name] : null
		},
		getErrors() {
			if (this.getRequired()){
				this.getRequired().forEach(required => {
					if (!this.getRule(required)){
						this.setError(`A propriedade ${required} deve ser informada!`);
					}
				});
			}
			
			if (this.errors.length > 0){
				this.errors.forEach(error => {

					throw new Error(error);
				});
			}
		},
		getRequired(){return this.required.length > 0 ? this.required : null},
		setRequired(prop) {this.required.push(prop)},
		removeRequired(prop) {
			let index = this.getRequired().indexOf(prop);
			if (index > -1){
				this.required.splice(index, 1);
			}
		}
	}

	configMethods.setOptions = function(name, options, required = false){
		if (required){
			guidelines.setRequired(name)
		}
		guidelines[name] = function (value) {
			if (options.indexOf(value) > -1){
				this.setRule(name, value);
			}
		}
	}

	configMethods.setBoolean = function(name, required = false){
		if (required){
			guidelines.setRequired(name)
		}

		guidelines[name] = function (value) {
			this.removeRequired(name);
			if (typeof value === 'boolean'){
				this.setRule(name, value);
			} else {
				this.setError('A valor deve ser true ou false');
			}
		}
	}

	if (callback){
		callback(configMethods);
	}

	return guidelines;
}
