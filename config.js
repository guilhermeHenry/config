//required
//options
//validator native
//validator no native

let config = function(config) {
	this.conf = config;
	this.seccess = true;
	this.add = function(name, value = null, validator = false){
		this.required = Array.isArray(value) || value === null || validator ? true : false;

		if (this.required && name in this.conf === false){
			this.seccess = false;
			console.log(`A propriedade ${name} é obrigatório`);
		}else if (this.required || !this.required && name in this.conf) {
			this.name = name;
			this.value = this.conf[name];

			let result = this.validator(value);
			if (result === true){
				
			}else{
				this.seccess = false;
				console.log(result);
			}
		}
	}
}

config.prototype.validator = function(val) {
	let msg = null;
	let valid = Array.isArray(val) ? 'array' : (val === null ? 'null': typeof val);
		switch(valid){
			case 'boolean':
				if (typeof this.value !== 'boolean')
					msg = `A propriedade ${this.name} deve ser um valor boleano (true ou false)`;
				break;
			case 'object':
				if (isNaN(this.value)){msg = `A propriedade ${this.name} deve ser um número`; break;}
				if (Number(this.value) < val.min || Number(this.value) > val.max){
					msg = `A propriedade ${this.name} deve ser um número maior ou igual a ${val.min} e menor ou igual a ${val.max}`; break;}	
				break;
			case 'array':
				if (val.indexOf(this.value) === -1)
					msg = `A propriedade ${this.name} não existe. Escolha uma das seguintes opções: ${val.join(', ')}.`;
				break;
		}
	return msg ? msg : true;
}

// let _newObject = function (conf = null) {
// 	this.config = new config(conf);
// 	this.config.add('speed');
// 	this.config.add('target');
// 	this.config.add('scale', true);
// 	this.config.add('delay', Array('linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'));

// 	if (this.config.seccess){this.init()}
// }

// _newObject.prototype.init = function() {console.log('init')}

// let p = {'delay': 'd'}
// let a = new _newObject(p);