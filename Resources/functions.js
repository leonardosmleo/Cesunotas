/*****************************************************************************************
 * System functions 
 */
function loadConfig(){
	if( !appConfig ){ Ti.include('config.js'); }
}

function isOs( osname ){
	return ( appConfig.device.osname == osname )? true:false;
}

/******************************************************************************************
 * Database functions 
 */
function installDb(){
	var file = getFile( config.db.file );
	if(file.exists()) {
		var db = Ti.Database.install( config.db.file, config.db.file);
		db.close();
		//Ti.API.info('file exists');
		return true;
	} else {
		Ti.API.error('db not installed, file not found.');
		return false;
	}
	return true;
}

function isDbInstalled(){
	var fname = Ti.Filesystem.getFile(
					"file://data/data/"+ Ti.App.getId()+"/databases/"+config.db.file);
	return ( ( fname.size > 0 )? true : false );
}

function updateUserCredentilas(loginInfo){
	var db = Ti.Database.open('squidtech.sqlite');
	Ti.API.debug(db);
	var results = db.execute('REPLACE INTO credentials ( ra, password ) VALUES("'+loginInfo.username+'","'+loginInfo.password+'")');
	db.close();
	return results;
}

function getStoredUserCredentioals(ra){
	var db = Ti.Database.open('squidtech.sqlite');
	var results = db.execute('SELECT * FROM credentials WHERE ra = "'+ra+'"');
	db.close();
	if( results.isValidRow() ){
		return results;
	}
	return false;	
}

function userExists(){
	var user = getStoredUserCredentioals( this.ra );
	return ( user.rowCount > 0 )? true : false;
}

/*******************************************************************************************
 * Filesystem functions 
 */
function getFile( filename ){
	return Ti.Filesystem.getFile( Titanium.Filesystem.resourcesDirectory, filename);
}
/*******************************************************************************************
 * Debug functions 
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



/*********************************************************************************
 * Modules 
 */
function getActivityIndicator()
{
	if( !config.modules.activityIndicator){
		var style;
		if (Ti.Platform.name === 'iPhone OS'){
		  	style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
		} else {
		  	style = Ti.UI.ActivityIndicatorStyle.PLAIN;
		}
		
		config.modules.activityIndicator =  Ti.UI.createActivityIndicator({
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
	}
	return config.modules.activityIndicator;
}

/**************************************************************************************
 * Basic Layout 
 */
function getFooterTemplate(){
	var footer = Ti.UI.createView({
		bottom: 0,
	    left: 0,
	    backgroundColor: '#404E57',
	    width: '100%', height: 50
	});
	var footerImg = Ti.UI.createImageView({
		image: '/images/logo_squidtech.png',
		height: 35,
		right: 15,
		top: 10
	});
	footer.add(footerImg);
	return footer;
}











