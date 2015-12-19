var PlatformAlignment = new Class.create(function(){
	this.constructor = function(scene, config) {
		this.scene = scene;
		this.config = new Config(config);
		this.extendConfig();
		this.platforms = [];
		this.container = this.createPlatformAlignment();

	};

	this.extendConfig = function() {
		this.config.isSet('class-platform-alignment', 'class-platform-alignment');
		// Default mode
		this.config.isSet('mode', 'center-middle');
		this.config.isSet('handleCreatePlatform', function(container) {

			//container.html('<i class="start-note"><span class="class-panel-bg"></span></i>');

		}.bind(this));
	};

	this.createPlatformAlignment = function() {
		var container = $('<div></div>');
		container.addClass(this.config.get('class-platform-alignment'));
		container.addClass('mode-' + this.config.get('mode'));

		var fn = this.config.get('handleCreatePlatform');
		if (typeof fn == 'function') {
			fn(container);
		}

		return container;
	};

	this.add = function(platform) {
		if (!(platform instanceof Platform)) {
			throw new Error('Platform not is the platform');
		}
		this.platforms.push(platform);
	}

	this.getView = function() {
		return this.container;
	};

	this.render = function() {

		for (var i in this.platforms) {
			var platform = this.platforms[i];
			this.getView().append(platform.getView());
		}

		return this.getView();
	};

	this.reBuild = function() {
		this.scene.eachPanel(function(panel) {
			panel.getView().css('top', '5px');
			this.getView().append(panel.getView());
		}.bind(this));
	};
});