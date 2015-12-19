var PanelHandler = Class.create(function() {

	this.constructor = function(scene, config) {
		this.config = new Config(config);
		this.extendConfig();
		this.scene = scene;
	};

	this.extendConfig = function() {
		this.config.isSet('delay-before-start-animation', 1);
	};

	this.draggableOnePanel = function(panel) {};

	this.draggableAllPanel = function(lastMatchedPanel) {
		this.scene.draggable.disable(true);
		this.scene.platformAlignment.reBuild();
		this.scene.setEndStatus();
		Melody.playAll(this.scene);

		this.animateNextPanel();

		setTimeout(function() {
			this.startAnimation();
		}.bind(this), this.config.get('delay-before-start-animation') * 1000);
	};

	this.startAnimation = function() {

		var animatePlatform = new PlatformAlignmentAnimation(this.scene.platformAlignment,
			{
				'duration-platform-animate': this.scene.config.get('duration-platform-animate')
			});
		animatePlatform.start();

		var animateScene = new SceneAnimation(this.scene,
			{
				'duration-first': this.scene.config.get('duration-scene-first-animate'),
				'duration-second': this.scene.config.get('duration-scene-second-animate'),
				'delay-before-start-second-scene-animation': this.scene.config.get('delay-before-start-second-scene-animation')
			});
		animateScene.start();
	};

	this.animateNextPanel = function(panel) {
		var count;
		if (panel == null) {
			count = -1;
		} else {
			count = panel.getId();
		}
		if (typeof this.scene.panels[count + 1] !== 'undefined') {
			var animation = new PlayPanelAnimation(this.scene.panels[count + 1]);
			animation.start(this.animateNextPanel.bind(this));
		}
	};

	this.playPartial = function(panel) {
		if (this.sound == null) {
			this.sound = new Melody(panel);
		}
		this.sound.play();

		var animation = new PlayPanelAnimation(panel);
		animation.start();
	};
});