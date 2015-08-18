var FartyTurd = FartyTurd || {};

FartyTurd.Pipe = function(game, floorPool, numTiles, x, y, speed) {
  Phaser.Group.call(this, game);
  
  this.tileSize = 40;
  this.game = game;
  this.enableBody = true;
  this.floorPool = floorPool;
  
  this.configure(numTiles, x, y, speed);  
};

FartyTurd.util.extend(FartyTurd.Pipe, Phaser.Group);

FartyTurd.Pipe.prototype.configure = function(numTiles, x, y, speed) {
  
  //make alive
  this.alive = true;  
  
  var i = 0;
  while(i < numTiles){
    
    var floorTile = this.floorPool.getFirstExists(false);
    
    if(!floorTile) {
      floorTile = new Phaser.Sprite(this.game, x, y + i * this.tileSize, 'floor');
    }
    else {
      floorTile.reset(x, y + i * this.tileSize);
    }
      
    this.add(floorTile);    
    i++;
  }
  
  //set physics properties
  this.setAll('body.immovable', true);
  this.setAll('body.allowGravity', false);
  this.setAll('body.velocity.x', speed);
  
};

FartyTurd.Pipe.prototype.kill = function(){
  this.alive = false;  
  this.callAll('kill');
  
  var sprites = [];
  this.forEach(function(tile){
    sprites.push(tile);
  }, this);
  
  sprites.forEach(function(tile){
    this.floorPool.add(tile);
  }, this);
};
