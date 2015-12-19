$(function(){

	var heightPanel = '135px';
	var widthPanel = '162px';

	var actionScene = new Scene($('.renderer'), {
		'width': 800,
		'height': 500,
		'class-container': 'container',
		'class-panel-sprite': 'sprite-note-1',
		'audio': 'res/moonlight-classical.mp3',
		'duration-platform-animate': 15,
		'duration-scene-first-animate': 10,
		'duration-scene-second-animate': 70,
		'delay-before-start-animation': 2,
		'delay-before-start-second-scene-animation': 2,
	});

	actionScene.addPanel(new Panel(0, {
		'width': '87px',
		'height': heightPanel,
		'background-position': '-274px 132px',
		'start-audio-range': 0,
		'end-audio-range': 20,
	}));

	actionScene.addPanel(new Panel(1, {
		'width': widthPanel,
		'height': heightPanel,
		'background-position': '-276px 276px',
		'start-audio-range': 20,
		'end-audio-range': 50,
	}));

	actionScene.addPanel(new Panel(2, {
		'width': widthPanel,
		'height': heightPanel,
		'background-position': '-606px 276px',
		'start-audio-range': 50,
		'end-audio-range': 80,
	}));

	actionScene.addPanel(new Panel(3, {
		'width': widthPanel,
		'height': heightPanel,
		'background-position': '-773px 276px',
		'start-audio-range': 80,
		'end-audio-range': 120,
	}));

	actionScene.addPanel(new Panel(4, {
		'width': widthPanel,
		'height': heightPanel,
		'background-position': '-936px 276px',
		'start-audio-range': 120,
		'end-audio-range': 135,
	}));

	//scene.showScene();

	var sceneIntro = new Scene($('.renderer'),
		{
			'type-handle': 'intro',
			'class-container': 'container intro'
		},
		actionScene
	);
	sceneIntro.showScene();
});