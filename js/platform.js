var Platform = Class.create(function(){
	this.constructor = function(panel, config) {
		this.panel = panel;
		this.config = new Config(config);
		this.initConfig();
		this.platform = this.init();
	};

	this.initConfig = function() {
		this.config.isSet('class-platform', 'class-platform');
	};

	this.init = function() {
		var platform = $('<div></div>');
		platform.addClass(this.config.get('class-platform'));
		platform.css('width', this.panel.config.get('width'));
		platform.css('height', this.panel.config.get('height'));
		platform.attr('id', 'platform-for-id-'+this.panel.getId());

		return platform;
	};

	this.getView = function() {
		return this.platform;
	};
});