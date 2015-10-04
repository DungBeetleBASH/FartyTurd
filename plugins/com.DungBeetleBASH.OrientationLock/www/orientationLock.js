var exec = require('cordova/exec');

/**
 * Provides access to the various notification features on the device.
 */

module.exports = {
	setOrientation: function(orientation) {
		exec(null, null, "OrientationLock", "setOrientation", [orientation]);
	}
};