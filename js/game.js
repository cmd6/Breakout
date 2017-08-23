// js/game.js

// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser

var oGame = new Phaser.Game(960, 640, Phaser.AUTO, null, {
	preload: preload,
	create: create,
	update: update
});

var bmdPaddle;
var bmdBrick;

var sprBall;
var sprPaddle;
var sprNewBrick;
var btnStartButton;

var grpBricks;
var htBrickInfo;

var strObjectColor = '#00a5e6';
var boolPlaying = false;

function preload() {
	oGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	oGame.scale.pageAlignHorizontally = true;
	oGame.scale.pageAlignVertically = true;
	oGame.stage.setBackgroundColor('#eee');

	oGame.load.spritesheet('ball', 'assets/wobble2.png', 40, 40);
	oGame.load.spritesheet('button', 'assets/button.png', 120, 40);

	bmdPaddle = oGame.add.bitmapData(150, 20);
	bmdPaddle.ctx.fillStyle = strObjectColor;
	bmdPaddle.ctx.fillRect(0, 0, 150, 20);

	bmdBrick = oGame.add.bitmapData(100, 40);
	bmdBrick.ctx.fillStyle = strObjectColor;
	bmdBrick.ctx.fillRect(0, 0, 100, 40);
}
function create() {
	sprBall = oGame.add.sprite(oGame.world.width * 0.5, oGame.world.height - 50, 'ball');
	sprBall.animations.add('wobble', [0, 1, 0, 2, 0, 1, 0, 2, 0], 24);
	sprBall.animations.add('littleWobble', [0, 1, 0, 2, 0], 24);
	sprBall.anchor.set(0.5);

	sprPaddle = oGame.add.sprite(oGame.world.width * 0.5, oGame.world.height - 5, bmdPaddle);
	sprPaddle.anchor.set(0.5, 1);

	btnStartButton = oGame.add.button(oGame.world.width * 0.5, oGame.world.height * 0.5, 'button',startGame,this,1,0,2);
	btnStartButton.anchor.set(0.5);

	oGame.physics.startSystem(Phaser.Physics.ARCADE);

	oGame.physics.enable(sprBall, Phaser.Physics.ARCADE);
	sprBall.body.collideWorldBounds = true;
	sprBall.body.bounce.set(1);
	oGame.physics.arcade.checkCollision.down = false;
	sprBall.checkWorldBounds = true;
	sprBall.events.onOutOfBounds.add(function () {
		alert('Game over!');
		location.reload();
	});

	oGame.physics.enable(sprPaddle, Phaser.Physics.ARCADE);
	sprPaddle.body.immovable = true;

	initBricks();
}
function update() {
	oGame.physics.arcade.collide(sprBall, sprPaddle, collideBallPaddle);
	oGame.physics.arcade.collide(sprBall, grpBricks, collideBallBrick);
	if (boolPlaying) {
		sprPaddle.x = oGame.input.x || oGame.world.width * 0.5;
	}
}

function startGame() {
	btnStartButton.destroy();
	sprBall.body.velocity.set(300, -300);
	boolPlaying = true;
}

function collideBallPaddle(pBall, pBrick) {
	pBall.animations.play('wobble');
}

function collideBallBrick(pBall, pBrick) {
	pBall.animations.play('littleWobble');
	var killTween = oGame.add.tween(pBrick.scale);
	killTween.to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None);
	killTween.onComplete.addOnce(function () {
		pBrick.kill();
		var boolAnyAlive = false;
		for (var i = 0; i < grpBricks.children.length; i++) {
			if (grpBricks.children[i].alive === true) {
				boolAnyAlive = true;
				break;
			}
		}
		if (!boolAnyAlive) {
			alert('You won the game.')
			location.reload();
		}
	});
	killTween.start();
}

function initBricks() {
	htBrickInfo = {
		width: 100,
		height: 40,
		count: {
			row: 7,
			col: 3
		},
		offset: {
			top: 100,
			left: 120
		},
		padding: 20
	};

	grpBricks = oGame.add.group();
	for (var c = 0; c < htBrickInfo.count.col; c++) {
		for (var r = 0; r < htBrickInfo.count.row; r++) {
			var brickX = (r * (htBrickInfo.width + htBrickInfo.padding)) + htBrickInfo.offset.left;
			var brickY = (c * (htBrickInfo.height + htBrickInfo.padding)) + htBrickInfo.offset.top;
			sprNewBrick = oGame.add.sprite(brickX, brickY, bmdBrick);
			oGame.physics.enable(sprNewBrick, Phaser.Physics.ARCADE);
			sprNewBrick.body.immovable = true;
			sprNewBrick.anchor.set(0.5);
			grpBricks.add(sprNewBrick);
		}
	}
}