var Panel = Class.create(function() {

	this.constructor = function(id, config) {
		this.id = id;
		this.config = new Config(config);
		this.extendConfig();
		this.panel = this.createPanel(this.id);

		this.platform = this.createPlatform();
	};

	this.extendConfig = function() {

		this.config.isSet('width', '87px');
		this.config.isSet('height', '125px');
		this.config.isSet('background-position', '-274px 135px');
		this.config.isSet('class-panel', 'class-panel');
		this.config.isSet('class-background', 'class-panel-bg');
		this.config.isSet('class-play-icon', 'class-play-icon');
		this.config.isSet('class-match-ok', 'class-match-ok');
		this.config.isSet('class-ondrag', 'class-ondrag');

		this.config.isSet('diff-time', this.config.get('end-audio-range') - this.config.get('start-audio-range'));
	};

	this.createPanel = function(id) {
		var panel = $('<i></i>');
		panel.attr('id', id);
		panel.addClass(this.config.get('class-panel'));

		var background = $('<span></span>');
		background.addClass(this.config.get('class-background'));
		panel.append(background);

		var playIcon = $('<span></span>');
		playIcon.addClass(this.config.get('class-play-icon'));
		panel.append(playIcon);

		var matchOkIcon = $('<span></span>');
		matchOkIcon.addClass(this.config.get('class-match-ok'));
		panel.append(matchOkIcon);

		panel.css('width', this.config.get('width'));
		panel.css('height', this.config.get('height'));
		background.css('background-position', this.config.get('background-position'));

		return panel;
	};

	this.createPlatform = function() {
		return new Platform(this, {});
	};

	this.getPlatform = function() {
		return this.platform;
	};

	this.getView = function() {
		return this.panel;
	};

	this.setScene = function(scene) {
		this.scene = scene;
		this.linkScene(scene);
	};

	this.linkScene = function(scene) {

		var sceneConfig = scene.config;
		this.getView().addClass(sceneConfig.get('class-panel-sprite'));
	};

	this.getScene = function() {
		return this.scene;
	};

	this.getId = function() {
		return this.id;
	};

	this.startDrag = function(panel) {
		this.getView().addClass(this.config.get('class-ondrag'));
	};

	this.stopDrag = function(panel) {
		this.getView().removeClass(this.config.get('class-ondrag'));
	};
});