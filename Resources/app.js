/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 * 
 * bootstrap and check dependencies 
 */
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}
/* Include global variables  */
Ti.include('globals.js');
/* Include app configuratios */
Ti.include('config.js');
/* Include app configuratios */
Ti.include('functions.js');
/* Android menu helper */
Ti.include('android_menu.js');
// This is a single context application with multiple windows in a stack
(function() {

	getActivityIndicator(); 
	
	Titanium.UI.setBackgroundColor( config.app.app_background_color );
	
	installDb();
	
	return getLoginWindow();
	
})();

function getLoginWindow()
{
	var loginView = require('ui/common/login/form_view');
	return new loginView();
}

function getTemplate(){
	
}
