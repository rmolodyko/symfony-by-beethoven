/**
 * TODO Add global possibilities of config something like that
 * animation.duration-before
 * and exted this config into all child class without redefining in constructor
 */
var Config = Class.create(function(argument) {
	this.constructor = function(params) {
		this.entires = params || [];
	};

	this.set = function(key, value) {
		this.entires[key] = value;
	};

	this.get = function(key) {
		if (typeof this.entires[key] !== 'undefined') {
			return this.entires[key];
		} else {
			throw new Error(key+' is not defined');
		}
	};

	this.has = function(key) {
		if (typeof this.entires[key] !== 'undefined') {
			return true;
		} else {
			return false;
		}
	};

	this.isSet = function(key, value) {
		if (typeof this.entires[key] === 'undefined') {
			this.entires[key] = value;
		}
	};
});
