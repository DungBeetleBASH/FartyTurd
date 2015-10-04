var FartyTurd = FartyTurd || {};

function onDeviceReady() {
    if (device && device.setOrientation) {
        device.setOrientation("portrait");
    }

    document.addEventListener("pause", function() {
        FartyTurd.game.paused = true;
        //console.log("pause");
    }, false);

    document.addEventListener("resume", function() {
        FartyTurd.game.paused = false;
        //console.log("resume");
    }, false);

    document.removeEventListener('deviceready', onDeviceReady);
}

document.addEventListener("deviceready", onDeviceReady, false);

FartyTurd.game = new Phaser.Game(320, 480, Phaser.AUTO);

FartyTurd.game.state.add('Boot', FartyTurd.BootState);
FartyTurd.game.state.add('Preload', FartyTurd.PreloadState);
FartyTurd.game.state.add('Game', FartyTurd.GameState);

FartyTurd.game.state.start('Boot');
