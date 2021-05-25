var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "reward", "x": 2000, "y": groundY - 60},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);
        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = 400;
        sawBladeHitZone.y = 175;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);

        function createSawBlade(x, y) {
            var Hitbox = game.createObstacle(hitZoneSize, damageFromObstacle);
            Hitbox.x = x,
                Hitbox.y = y,
                game.addGameItem(Hitbox);
            var Image = draw.bitmap('img/sawblade.png');
            Image.x = -25;
            Image.y = -25;
            Hitbox.addChild(Image);
        }
        function createRock(x, y) {
            var Hitbox = game.createObstacle(hitZoneSize, damageFromObstacle);
            Hitbox.x = x,
                Hitbox.y = y,
                game.addGameItem(Hitbox);
            var Image = draw.bitmap("img/rock2.png");

            Hitbox.addChild(Image);
        }

        createSawBlade(500, 200);
        createSawBlade(250, 300);
        createSawBlade(700, 200);
        createRock(800, 300);

        var enemy = game.createGameItem('enemy', 25);
        var redSquare = draw.rect(50, 50, 'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = 400;
        enemy.y = groundY - 50;

        game.addGameItem(enemy);
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 10;
        enemy.onPlayerCollision = function () {
            console.log('The enemy has hit Halle');
            enemy.fadeOut();
        };
        enemy.onProjectileCollision = function () {
            console.log('Halle has hit the enemy');
            game.increaseScore(100);
            enemy.shrink();
        };


        function createSquare(x, groundY) {
            var square = game.createGameItem('enemy', 25);
            var redSquare = draw.rect(50, 50, 'red');
            redSquare.x = -25;
            redSquare.y = -25;
            square.addChild(redSquare);
            square.x = 400;
            square.y = groundY - 50;
            game.addGameItem(square);
            square.velocityX = -1;
            square.rotationalVelocity = 10;
            square.onPlayerCollision = function () {
                console.log('The enemy has hit Halle');
                square.fadeOut();
            };
            square.onProjectileCollision = function () {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                square.shrink();
            };

        };
        createSquare(500, groundY - 15);
        createSquare(800, groundY - 15);
        createSquare(1200, groundY - 15);

        var fuel = game.createGameItem('reward', 25);
        var orangehitbox = draw.rect(50, 50, 'orange');
        fuel.x = 1500;
        fuel.y = 250;
        fuel.addChild(orangehitbox);
        orangehitbox.x = -25;
        orangehitbox.y = -25;
        game.addGameItem(fuel);
        fuel.velocityX = -1;

        fuel.onPlayerCollision = function() {
            game.increaseScore(100);
    fuel.shrink();
        }
    }
    };
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
