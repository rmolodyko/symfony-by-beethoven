var Draggable = Class.create(function() {

	/**
	 * [constructor description]
	 * @param  {[type]} panels  [description]
	 * @param  {[type]} handler should has two methods
	 *                          #draggableOnePanel(panel) - which will be called when
	 *                          one of the panels will matched
	 *							#draggableAllPanel(panel) - will be called when
	 *							all panels will matched
	 * @return {[type]}         [description]
	 */
	this.constructor = function(scene, panels, handler) {
		this.panels = panels;
		this.scene = scene;
		this.countPlay = [];
		if (handler == null ||
			(typeof handler.draggableOnePanel !== 'function' && typeof handler.draggableAllPanel !== 'function')
		) {
			throw new Error('Handler in draggable is wrong');
		}
		this.handler = handler;
		this.init();
	};


	this.init = function() {

		var self = this;
		for (var i in this.panels) {
			(function(i) {
				var panel = this.panels[i];
				var platform = panel.getPlatform();
				panel.getView().draggable({
					cursor: "move",
					snap: '#'+platform.getView().attr('id'),
					snapMode: "inner",
					stop: function (event, ui) {
						var snapped = $(this).data('draggable').snapElements;
						var snappedTo = $.map(snapped, function (element) {
							return element.snapping ? element : null;
						});

						if (snappedTo.length > 0) {
							self.snapHandle(snappedTo, panel, platform);
						} else {
							self.countPlay[panel.getId()] = undefined;
							delete self.countPlay[panel.getId()];
						}
						panel.stopDrag(panel);
					},
					start: function() {
						panel.startDrag(panel);
					},
					containment: this.panels[0].getScene().getView()
				});
			}.bind(this))(i);
		}
	};

	this.snapHandle = function(snapped, panel, platform) {
		var el = $(snapped[0].item);
		if (this.checkOffset(panel, platform) && el.attr('id') == platform.getView().attr('id')) {
			this.countPlay[panel.getId()] = true;
			if (this.panels.length == this.arrCount(this.countPlay)) {
				this.handler.draggableAllPanel(panel);
			} else {
				this.handler.draggableOnePanel(panel);
			}
		}
	};

	this.disable = function(remove) {
		this.scene.eachPanel(function(panel) {
			if (remove === true) {
				panel.getView().draggable('destroy');
			} else {
				panel.getView().draggable('disable');
			}
		}.bind(this));
	};

	this.checkOffset = function(panel, platform) {
		var offsetPanel = panel.getView().offset();
		var offsetPlatform = platform.getView().offset();
		if (offsetPanel.top == offsetPlatform.top && offsetPanel.left == offsetPlatform.left) {
			return true;
		}
		return false;
	};

	this.arrCount = function(arr) {
		var count = 0;
		for (var i in arr) {
			count++;
		}
		return count;
	};
});