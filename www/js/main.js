var FartyTurd = FartyTurd || {};

document.addEventListener("intel.xdk.device.ready",function(){
    //lock the application in portrait orientation
    intel.xdk.device.setRotateOrientation("portrait");
    intel.xdk.device.setAutoRotate(false);

    //hide splash screen
    intel.xdk.device.hideSplashScreen();        
},false);

FartyTurd.game = new Phaser.Game(320, 480, Phaser.AUTO);

FartyTurd.game.state.add('Boot', FartyTurd.BootState);
FartyTurd.game.state.add('Preload', FartyTurd.PreloadState);
FartyTurd.game.state.add('Game', FartyTurd.GameState);

FartyTurd.game.state.start('Boot');
