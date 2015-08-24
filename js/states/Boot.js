var FartyTurd = FartyTurd || {};

//setting game configuration and loading the assets for the loading screen
FartyTurd.BootState = {
  init: function() {
    this.game.stage.backgroundColor = '#000';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.forceOrientation(true, false);

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  preload: function() {
    this.load.image('loadingBar', 'asset/images/loadingBar.png');
  },
  create: function() {
    this.state.start('Preload');
  }
};