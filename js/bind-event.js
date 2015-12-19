var BindEvent = Class.create(function() {

	this.constructor = function(scene) {
		this.scene = scene;
	};

	this.panelClick = function() {
		this.scene.eachPanel(function(panel) {
			panel.getView().off('click');
			panel.getView().find('.' + panel.config.get('class-play-icon')).click(function() {
				console.log(panel.getId());
				this.scene.panelHandler.playPartial(panel);
			}.bind(this));
		}.bind(this));
	};

	this.introClick = function() {
		this.scene.getView().off('click');
		this.scene.getView().click(function() {
			this.scene.showNextScene();
		}.bind(this));
	};
});