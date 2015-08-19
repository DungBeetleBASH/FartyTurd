var FartyTurd = FartyTurd || {};

FartyTurd.Pipe = function(game, x, y, speed, pipeData) {
  Phaser.Group.call(this, game);
  
  this.tileSize = 40;
  this.game = game;
  this.enableBody = true;
  this.isScored = false;
  this.pipeData = pipeData;
  this.createPipe(x);

  this.configure(x, y, speed, pipeData);  
};

FartyTurd.util.extend(FartyTurd.Pipe, Phaser.Group);

FartyTurd.Pipe.prototype.createPipe = function(x) {
  var pipeParts = [];
  pipeParts[0] = new Phaser.Sprite(this.game, x, 0, 'pipe');
  pipeParts[0].height = 60;
  pipeParts[1] = new Phaser.Sprite(this.game, x, 60, 'pipe-down');
  pipeParts[2] = new Phaser.Sprite(this.game, x, 180, 'pipe-up');
  pipeParts[3] = new Phaser.Sprite(this.game, x, 206, 'pipe');
  pipeParts[3].height = this.game.height - 206;
  this.addMultiple(pipeParts);
};

FartyTurd.Pipe.prototype.configure = function(x, y, speed, pipeData) {
  this.pipeData = pipeData;

  this.children.forEach(function (part, i, parts) {
    if (i === 2) {
      part.y = parts[1].bottom + this.pipeData.gapSize;
    }
    if (i === 3) {
      part.y = parts[2].bottom;
    }
  }, this);
  
  //make alive
  this.alive = true; 
  this.isScored = false;
  
  //set physics properties
  this.setAll('body.immovable', true);
  this.setAll('body.allowGravity', false);
  this.setAll('body.velocity.x', speed);
  this.setAll('x', x);
  
};

FartyTurd.Pipe.prototype.kill = function(){
  this.alive = false;
};
