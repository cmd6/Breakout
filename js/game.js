// js/game.js

// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser

var oGame = new Phaser.Game(960, 640, Phaser.AUTO, null, {
	preload: preload,
	create: create,
	update: update
});

var bmdBall;
var bmdPaddle;
var bmdBrick;

var sprBall;
var sprPaddle;
var sprNewBrick;

var grpBricks;
var htBrickInfo;

var strObjectColor = '#00a5e6';

function preload() {
	oGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	oGame.scale.pageAlignHorizontally = true;
	oGame.scale.pageAlignVertically = true;
	oGame.stage.setBackgroundColor('#eee');

	bmdBall = oGame.add.bitmapData(40, 40);
	bmdBall.circle(20, 20, 20, strObjectColor);

	bmdPaddle = oGame.add.bitmapData(150, 20);
	bmdPaddle.ctx.fillStyle = strObjectColor;
	bmdPaddle.ctx.fillRect(0, 0, 150, 20);

	bmdBrick = oGame.add.bitmapData(100, 40);
	bmdBrick.ctx.fillStyle = strObjectColor;
	bmdBrick.ctx.fillRect(0, 0, 100, 40);
}
function create() {
	sprBall = oGame.add.sprite(oGame.world.width * 0.5, oGame.world.height - 25, bmdBall);
	sprBall.anchor.set(0.5);

	sprPaddle = oGame.add.sprite(oGame.world.width * 0.5, oGame.world.height - 5, bmdPaddle);
	sprPaddle.anchor.set(0.5, 1);

	oGame.physics.startSystem(Phaser.Physics.ARCADE);

	oGame.physics.enable(sprBall, Phaser.Physics.ARCADE);
	sprBall.body.velocity.set(300, -300);
	sprBall.body.collideWorldBounds = true;
	sprBall.body.bounce.set(1);
	oGame.physics.arcade.checkCollision.down = false;
	sprBall.checkWorldBounds = true;
	sprBall.events.onOutOfBounds.add(function(){
		alert('Game over!');
		location.reload();
	});

	oGame.physics.enable(sprPaddle, Phaser.Physics.ARCADE);
	sprPaddle.body.immovable = true;
}
function update() {
	oGame.physics.arcade.collide(sprBall, sprPaddle);
	sprPaddle.x = oGame.input.x || oGame.world.width * 0.5;
}