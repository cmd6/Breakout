// js/game.js

// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser

var oGame = new Phaser.Game(480,320,Phaser.AUTO,null,{
	preload:	preload,
	create:		create,
	update:		update
});

function preload(){
	oGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	oGame.scale.pageAlignHorizontally = true;
	oGame.scale.pageAlignVertically = true;
	oGame.stage.setBackgroundColor('#eee');
	oGame.load.image('ball','assets/ball.png');
}
function create(){
	sprBall = oGame.add.sprite(50,50,'ball');
	oGame.physics.startSystem(Phaser.Physics.ARCADE);
	oGame.physics.enable(sprBall,Phaser.Physics.ARCADE);
	sprBall.body.velocity.set(150,150);
}
function update(){
	
}