var PanelAnimation = Class.create(function() {
	this.constructor = function(panel, config) {
		this.config = new Config(config);
		this.panel = panel;
	};

	this.start = function() {
		throw new Error('Override me');
	};

	this.stop = function() {
		throw new Error('Override me');
	};

	this.animate = function() {
		throw new Error('Override me');
	};
});

var PlayPanelAnimation = Class.create(function() {
	this.constructor = function(panel, config) {
		this.parentClass.constructor.call(this, panel, config);
		this.timeInterval = 100;
		this.extendConfig();
	};

	this.start = function(onEndCallback) {
		this.stop();
		var diffSeconds = this.panel.config.get('diff-time');
		this.time = diffSeconds * 1000;
		this.width = parseInt(this.panel.config.get('width'));
		this.prepare();
		this.animate(0);
		setTimeout(function() {
			this.stop();
			if (typeof onEndCallback == 'function') {
				onEndCallback(this.panel);
			}
		}.bind(this), this.panel.config.get('diff-time') * 1000);
	};

	this.stop = function() {
		this.panel.getView().find('.' + this.config.get('class-animate-line')).remove();
		this.line = undefined;
	};

	this.moveByPx = function(px) {
		if (this.line != null) {
			this.line.css('left', px + 'px');
			return true;
		}
		return false;
	};

	this.animate = function(newTime) {
		if (newTime < this.time) {
			setTimeout(function() {
				var offset = (newTime * this.width / this.time);
				this.moveByPx(offset);
				this.animate(newTime + this.timeInterval);
			}.bind(this), this.timeInterval);
		}
	};

	this.extendConfig = function() {
		this.config.isSet('class-animate-line', 'class-animate-line');
	};

	this.prepare = function() {
		var line = $('<span></span>');
		line.addClass(this.config.get('class-animate-line'));
		this.line = line;
		this.panel.getView().find('.' + this.panel.config.get('class-background')).append(line);
	};
}, PanelAnimation);

var PlatformAlignmentAnimation = Class.create(function() {

	this.constructor = function(platformAlignment, config) {
		this.config = new Config(config);
		this.platformAlignment = platformAlignment;
		this.extendConfig();
	};

	this.extendConfig = function() {
		this.config.isSet('class-platform-animate-state', 'class-platform-animate-state');
		this.config.isSet('duration-platform-animate', 5);
		this.config.isSet('class-hide-platform', 'class-hide-platform');
	};

	this.start = function(onEndCallback) {
		this.platformAlignment.getView().addClass(this.config.get('class-platform-animate-state'));
		this.platformAlignment.getView().css('transition', 'all '+this.config.get('duration-platform-animate')+'s ease');

		var fullTime = 0;
		this.platformAlignment.scene.eachPanel(function(panel) {
			fullTime += panel.config.get('diff-time');
		}.bind(this));

		setTimeout(function() {
			this.platformAlignment.getView().css('opacity', '0');
		}.bind(this), (fullTime - this.config.get('duration-platform-animate')) * 1000)
	};

	this.stop = function() {};

}, PanelAnimation);

var SceneAnimation = Class.create(function() {

	this.constructor = function(scene, config) {
		this.config = new Config(config);
		this.scene = scene;
		this.extendConfig();

		var bg1 = this.scene.config.get('class-main-bg');
		this.bgElement1 = this.scene.getView().find('.' + bg1);

		var bg2 = this.scene.config.get('class-main-bg2');
		this.bgElement2 = this.scene.getView().find('.' + bg2);
	};

	this.extendConfig = function() {
		this.config.isSet('duration-first', 3);
		this.config.isSet('duration-second', 70);
		this.config.isSet('delay-before-start-second-scene-animation', 2);
	};

	this.start = function(onEndCallback) {
		this.stepOne();

		setTimeout(function() {
			this.stepSecond();
		}.bind(this), this.config.get('delay-before-start-second-scene-animation') * 1000);
	};

	this.stepOne = function() {

		this.bgElement1.css('transition', 'opacity '+this.config.get('duration-first')+'s ease');
		this.bgElement1.css('opacity', '0');

		this.bgElement2.css('transition', 'opacity '+this.config.get('duration-first')+'s ease');
		this.bgElement2.css('opacity', '1');
	};

	this.stepSecond = function() {

		this.bgElement2.css('transition', 'all '+this.config.get('duration-second')+'s ease');
		this.bgElement2.css('transform', 'scale3d(1, 1, 1)');
	};

	this.stop = function() {};

}, PanelAnimation);
