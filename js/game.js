// js/game.js

// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser

var oGame = new Phaser.Game(480, 320, Phaser.AUTO, null, {
	preload: preload,
	create: create,
	update: update
});

function preload() {
	oGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	oGame.scale.pageAlignHorizontally = true;
	oGame.scale.pageAlignVertically = true;
	oGame.stage.setBackgroundColor('#eee');

	bmdBall = oGame.add.bitmapData(20, 20);
	bmdBall.circle(10, 10, 10, '#00a5e6');

	bmdPaddle = oGame.add.bitmapData(75, 10);
	bmdPaddle.ctx.fillStyle = '#00a5e6';
	bmdPaddle.ctx.fillRect(0, 0, 75, 10);
}
function create() {
	sprBall = oGame.add.sprite(oGame.world.width * 0.5, oGame.world.height - 25, bmdBall);
	sprBall.anchor.set(0.5);

	sprPaddle = oGame.add.sprite(oGame.world.width * 0.5, oGame.world.height - 5, bmdPaddle);
	sprPaddle.anchor.set(0.5, 1);

	oGame.physics.startSystem(Phaser.Physics.ARCADE);

	oGame.physics.enable(sprBall, Phaser.Physics.ARCADE);
	sprBall.body.velocity.set(150, -150);
	sprBall.body.collideWorldBounds = true;
	sprBall.body.bounce.set(1);

	oGame.physics.enable(sprPaddle, Phaser.Physics.ARCADE);
	sprPaddle.body.immovable = true;
}
function update() {
	oGame.physics.arcade.collide(sprBall, sprPaddle);
	sprPaddle.x = oGame.input.x || oGame.world.width * 0.5;
}