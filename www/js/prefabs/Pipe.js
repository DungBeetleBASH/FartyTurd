var FartyTurd = FartyTurd || {};

FartyTurd.Pipe = function(game, x, y, speed, pipeData) {
  Phaser.Group.call(this, game);

  this.game = game;
  this.enableBody = true;
  this.isScored = false;
  this.totalHeight = this.game.world.height;
  this.pipeData = pipeData;
  this.createPipe();

  this.configure(x, y, speed, pipeData);
};

FartyTurd.util.extend(FartyTurd.Pipe, Phaser.Group);

FartyTurd.Pipe.prototype.createPipe = function() {
  var pipeParts = [];
  pipeParts[0] = new Phaser.Sprite(this.game, 0, 0, 'pipe'); //0
  pipeParts[1] = new Phaser.Sprite(this.game, 0, 0, 'pipe-down'); //60
  pipeParts[1].height = 26;
  pipeParts[2] = new Phaser.Sprite(this.game, 0, 0, 'pipe-up'); //180
  pipeParts[2].height = 26;
  pipeParts[3] = new Phaser.Sprite(this.game, 0, 0, 'pipe'); //206
  this.addMultiple(pipeParts);
};

FartyTurd.Pipe.prototype.configure = function(x, y, speed, pipeData) {
  this.pipeData = pipeData;

  this.children.forEach(function (part, i, parts) {
    switch (i) {
      case 0:
      part.height = this.pipeData.upperPipeHeight;
      break;
      case 1:
      part.y = parts[0].bottom;
      break;
      case 2:
      part.y = parts[1].bottom + this.pipeData.pipeGap;
      break;
      case 3:
      part.y = parts[2].bottom;
      part.height = this.totalHeight - parts[2].bottom;
      break;
    }
  }, this);

  //make alive
  this.setAll('alive', true);
  this.setAll('exists', true);
  this.setAll('visible', true);
  this.alive = true;
  this.isScored = false;

  //set physics properties
  this.setAll('body.immovable', true);
  this.setAll('body.allowGravity', false);
  this.setAll('body.velocity.x', speed);
  this.setAll('x', x);

};

FartyTurd.Pipe.prototype.kill = function() {
  this.setAll('alive', false);
  this.setAll('exists', false);
  this.setAll('visible', false);
  this.alive = false;
};
