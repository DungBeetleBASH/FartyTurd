var FartyTurd = FartyTurd || {};

document.addEventListener("intel.xdk.device.ready", function(){
    intel.xdk.device.setRotateOrientation("portrait");
    intel.xdk.device.setAutoRotate(false);     
}, false);

document.addEventListener("intel.xdk.device.suspend", function() {
    console.log("intel.xdk.device.suspend");
    FartyTurd.game.paused = true;
}, false);

document.addEventListener("intel.xdk.device.pause", function() {
    console.log("intel.xdk.device.pause");
    FartyTurd.game.paused = true;
}, false);

document.addEventListener("pause", function() {
    console.log("pause");
    FartyTurd.game.paused = true;
}, false);

document.addEventListener("intel.xdk.device.continue", function() {
    FartyTurd.game.paused = false;
    console.log("intel.xdk.device.continue");
}, false);

document.addEventListener("intel.xdk.device.resume", function() {
    FartyTurd.game.paused = false;
    console.log("intel.xdk.device.resume");
}, false);

document.addEventListener("resume", function() {
    FartyTurd.game.paused = false;
    console.log("resume");
}, false);

FartyTurd.game = new Phaser.Game(320, 480, Phaser.AUTO);

FartyTurd.game.state.add('Boot', FartyTurd.BootState);
FartyTurd.game.state.add('Preload', FartyTurd.PreloadState);
FartyTurd.game.state.add('Game', FartyTurd.GameState);

FartyTurd.game.state.start('Boot');
