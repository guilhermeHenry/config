//required
//options
//validator native
//validator no native

let config = function(data) {
	this.msg = [];
	this.conf = data;

	return this;
}

config.prototype.add = function(name, value = null, validator = false){
	this.required = Array.isArray(value) || validator || value === null || typeof value === 'function' ? true : false;

	if (this.required && name in this.conf === false){
		this.msg.push(`Passe propriedade ${name}`);
	}

	else if (this.required || !this.required && name in this.conf) {
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
				return value();
				break;
			case 'array':
				if (value.indexOf(this.conf[name]) === -1)
					this.msg.push(`A propriedade ${name} não existe. Escolha uma das seguintes opções: ${value.join(', ')}.`);
				break;
		}
	}

	// console.log(this.msg);
	return this;
}

config.prototype.exe = function(){
	return this.conf
}

const pessoa = function (conf = null) {
	this.c = new config(conf)
	.add('autoplay', true, true)
	.add('speed')
	.add('delay', ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'])
	.add('item', () => {})
	.exe();

	console.log(this.c);
	this.init();
}

pessoa.prototype.init = function(c) {
	// console.log(':)');
}

new pessoa({
	speed: 100,
	// item: 'item',
	target: 'input',
	delay: 'linear1'
});












