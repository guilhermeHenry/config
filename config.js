// Options
// Required
// Native Validator
// Custom Validator

let config = function(data) {
	this.msg = [];
	this.conf = data;
}

config.prototype.add = function(name, value = null, validator = false){
	this.required = Array.isArray(value) || validator || value === null || typeof value === 'function';

	if (this.required && name in this.conf === false){
		this.msg.push(`Passe propriedade ${name}`);
	}
	else if (this.required || !this.required && name in this.conf) {
		// Validator native
		switch(Array.isArray(value) ? 'array' : (value === null ? 'null': typeof value)){
			case 'boolean':
				if (typeof this.conf[name] !== 'boolean')
					this.msg.push(`A propriedade ${name} deve ser um valor boleano (true ou false)`);
				break;
			case 'object':
				if (isNaN(this.conf[name])){msg = `A propriedade ${name} deve ser um número`; break;}
				if (Number(this.conf[name]) < value.min || Number(this.conf[name]) > value.max){
					this.msg.push(`A propriedade ${name} deve ser um número maior ou igual a ${value.min} e menor ou igual a ${val.max}`);
					break;
				}
				break;
			case 'function':
				// Custom Validator
				value.bind(this)(this.conf[name]);
				break;
			case 'array':
				if (value.indexOf(this.conf[name]) === -1)
					this.msg.push(`A propriedade ${name} não existe. Escolha uma das seguintes opções: ${value.join(', ')}.`);
				break;
		}
	}

	return this;
}