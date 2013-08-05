/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}
var osname,
	version,
	height,
	width,
	activityIndicator,
	debug = 0;
// This is a single context application with multiple windows in a stack
(function() {
	//render appropriate components based on the platform and form factor
		osname  = Ti.Platform.osname;
		version = Ti.Platform.version;
		height  = Ti.Platform.displayCaps.platformHeight;
		width   = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	//Titanium.UI.ActivityIndicator.style = DARK;
	
	var style;
	if (Ti.Platform.name === 'iPhone OS'){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
	} else {
	  style = Ti.UI.ActivityIndicatorStyle.PLAIN;
	}
	
	activityIndicator = Ti.UI.createActivityIndicator({
	  	color: '#015F8B',
	  	font: {fontFamily:'Helvetica Neue', fontSize:'20dp', fontWeight:'bold'},
	  	message: 'Carregando...',
	  	style:style,
	  	opacity: 0.7,
	  	//top: 0, //(( width / 2 ) - ( Ti.UI.SIZE / 2 )),
	  	//left: 0, //(( height / 2 ) - ( Ti.UI.SIZE / 2 )),
	  	height: '100%',
	  	width: '100%',
	  	backgroundColor: '#fff'
	});
	
	Titanium.UI.setBackgroundColor('#ffffff');

	var loginView = require('ui/login/loginView');
	
	var db = installDb();
	
	Ti.API.debug( isDbInstalled() );
	
	return loginView();
	//Ti.API.debug( loginView );
	//new loginView();
	
})();


function getFooterTemplate(){
	var footer = Ti.UI.createView({
		bottom: 0,
	    left: 0,
	    backgroundColor: '#404E57',
	    width: '100%', height: 50,
	    /*backgroundGradient:{
	    	type:'linear',
			colors:[ '#202020', '#000' ],
			startPoint:{x:0,y:0},
			endPoint:{x:0,y:100},
			backFillStart:false
		}*/
	});
	/*
	var footerLabel = Ti.UI.createLabel({
		font: { fontSize: 15 },
		color: '#999',
		left: 15,
		text: 'Copyright Squidtech Apps - 2013'
	});
	*/
	
	var footerImg = Ti.UI.createImageView({
		image: '/images/logo_squidtech.png',
		height: 35,
		right: 15,
		top: 10
	});
	
	//footer.add(footerLabel);
	footer.add(footerImg);
	
	return footer;
}

function installDb(){
	if( !isDbInstalled() ){
		var file = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'squidtech.sqlite');
		if(file.exists()) {
			var db = Ti.Database.install('squidtech.sqlite', 'squidtech.sqlite');
			db.close();
			Ti.API.info('file exists');
			return true;
		} else {
			Ti.API.error('db not installed, file not found.');
			return false;
		}
	}
	return true;
}
function isDbInstalled(){
	var fname = Ti.Filesystem.getFile(
					"file://data/data/"+ Ti.App.getId()+"/databases/squidtech.sqlite");
	return ( ( fname.size > 0 )? true : false );
}


/*********************************************************************************************************
 * UTILS
 */

/**
 * Debug : var_dump
 * 
 * @var: Var
 * @level: Level max
 * 
 */
function var_dump(_var, _level) {
  var dumped_text = "";
  if(!_level) _level = 0;
     
  //The padding given at the beginning of the line.
  var level_padding = "";
  for(var j=0; j<_level+1; j++) level_padding += "    ";
     
    if(typeof(_var) == 'object') { //Array/Hashes/Objects 
      for(var item in _var) {
    var value = _var[item];
             
    if(typeof(value) == 'object') { // If it is an array,
      dumped_text += level_padding + "'" + item + "' ...\n";
      dumped_text += var_dump(value, _level+1);
    } else {
      dumped_text += level_padding +"'"+ item +"' => \""+ value +"\"\n";
    }
      }
    } else { //Stings/Chars/Numbers etc.
      dumped_text = "===>"+ _var +"<===("+ typeof(_var) +")";
    }
  return dumped_text;
};





