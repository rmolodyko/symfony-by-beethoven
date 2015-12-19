// TODO Move bind logic to another class
var Scene = Class.create(function(){

	this.constructor = function(renderer, config, nextScene) {
		this.config = new Config(config);
		this.nextScene = nextScene;
		this.extendConfig();
		this.renderer = renderer;
		this.scene = this.createScene();
		this.panels = [];

		this.panelHandler = new PanelHandler(this, {
			'delay-before-start-animation': this.config.get('delay-before-start-animation')
		});
		this.binder = new BindEvent(this);

		this.countPlay = [];
		this.setInitStatus();
	};

	this.extendConfig = function() {
		this.config.isSet('height', 500);
		this.config.isSet('width', 800);
		this.config.isSet('class-container', 'container');
		this.config.isSet('class-panel-sprite', 'sprite-note-1');
		this.config.isSet('class-main-bg', 'class-container-bg');
		this.config.isSet('class-main-bg2', 'class-container-bg2');
		this.config.isSet('delay-before-start-animation', 2);
		this.config.isSet('type-handle', 'panel-handle');

		this.config.isSet('class-status-init', 'status-init');
		this.config.isSet('class-status-end', 'status-end');
	};

	this.createScene = function() {
		var container = $('<div></div>');
		container.addClass(this.config.get('class-container'));
		container.css('height', this.config.get('height'));
		container.css('width', this.config.get('width'));

		var bg = $('<span></span>');
		bg.addClass(this.config.get('class-main-bg'));
		container.append(bg);

		var bg1 = $('<span></span>');
		bg1.addClass(this.config.get('class-main-bg2'));
		container.append(bg1);

		return container;
	};

	this.getView = function() {
		return this.scene;
	};

	this.showScene = function() {

		this.platformAlignment = new PlatformAlignment(this, {});

		for (var i in this.panels) {
			var panel = this.panels[i];
			this.platformAlignment.add(panel.getPlatform());
			this.getView().append(panel.getView());
			this.panelMoveToRandom(panel);
		};

		this.getView().append(this.platformAlignment.render());
		this.renderer.append(this.getView());
		this.draggable = new Draggable(this, this.panels, this.panelHandler);
		this.binder.panelClick();

		if (this.config.get('type-handle') == 'intro') {
			this.binder.introClick();
		}

		// Start animation manually
		//this.panelHandler.draggableAllPanel();
	};

	this.panelMoveToRandom = function(panel) {
		panel.getView().css('top', getRandomInt(0, this.config.get('height') - parseInt(panel.config.get('height'))));
		panel.getView().css('left', getRandomInt(0, this.config.get('width') - parseInt(panel.config.get('width'))));

		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	};

	this.addPanel = function(panel) {
		if (!(panel instanceof Panel)) {
			throw new Error('Panel is not a panel');
		}
		panel.setScene(this);
		this.panels[panel.getId()] = panel;
	};

	this.eachPanel = function(callback) {
		if (typeof callback == 'function') {
			for (var panel in this.panels) {
				callback(this.panels[panel]);
			}
			return true;
		}
		return false;
	};

	this.setInitStatus = function() {
		this.getView().removeClass(this.config.get('class-status-end'));
		this.getView().addClass(this.config.get('class-status-init'));
	};

	this.setEndStatus = function() {
		this.getView().removeClass(this.config.get('class-status-init'));
		this.getView().addClass(this.config.get('class-status-end'));
	};

	this.setInfiniteStatus = function() {
		this.getView().addClass(this.config.get('class-status-infinite'));
	};

	this.showNextScene = function() {
		if (this.nextScene != null) {
			this.getView().remove();
			this.nextScene.showScene();
		}
	};
});