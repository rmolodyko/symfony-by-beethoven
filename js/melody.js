var Melody = Class.create(function(){
	this.constructor = function(panel, config) {
		this.panel = panel;
		this.config = new Config(config);
		this.audio = new Audio(this.panel.getScene().config.get('audio'));

		this.flush();
	};

	this.play = function(onEndCallback) {
		this.stop();
		this.timeout = setTimeout(function() {
			console.log('timeout');
			if (typeof onEndCallback == 'function') {
				onEndCallback();
			}
			this.audio.pause();
		}.bind(this), this.panel.config.get('diff-time') * 1000)
		this.audio.play();
	};

	this.stop = function() {
		clearTimeout(this.timeout);
		this.audio.pause();
		this.flush();
	};

	this.flush = function() {
		this.audio.currentTime = this.panel.config.get('start-audio-range');
	};

	this.constructor.playAll = function(scene) {
		var audio = new Audio(scene.config.get('audio'));
		audio.play();
	};
});