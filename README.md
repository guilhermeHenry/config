# config
config

## How to use
```javascript
new config(conf)
.add('autoplay', true, true)
.add('speed')
.add('delay', ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'])
.add('item', function(item) {
	if (typeof item == 'string') {
		this.msg.push('propriedade Inválida');
	}
});
```