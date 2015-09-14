var FartyTurd = FartyTurd || {};

document.addEventListener("intel.xdk.device.ready", function(){
    intel.xdk.device.setRotateOrientation("portrait");
    intel.xdk.device.setAutoRotate(false);
    intel.xdk.device.hideSplashScreen();        
}, false);

document.addEventListener("intel.xdk.device.suspend", function() {
    console.log("intel.xdk.device.suspend");
}, false);

document.addEventListener("intel.xdk.device.pause", function() {
    console.log("intel.xdk.device.pause");
}, false);

document.addEventListener("intel.xdk.device.resume", function() {
    console.log("intel.xdk.device.resume");
}, false);

FartyTurd.game = new Phaser.Game(320, 480, Phaser.AUTO);

FartyTurd.game.state.add('Boot', FartyTurd.BootState);
FartyTurd.game.state.add('Preload', FartyTurd.PreloadState);
FartyTurd.game.state.add('Game', FartyTurd.GameState);

FartyTurd.game.state.start('Boot');
