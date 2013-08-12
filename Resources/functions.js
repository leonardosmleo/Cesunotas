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

function getNewActivityIndicator(){
	var style;
	if (Ti.Platform.name === 'iPhone OS'){
	  	style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
	} else {
	  	style = Ti.UI.ActivityIndicatorStyle.PLAIN;
	}
	return Ti.UI.createActivityIndicator({
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

/**************************************************************************************
 * Basic Layout 
 */
function getHeaderLayout(user, title){
	if( !title ){
		title = 'Disciplinas';
	}
	var disciplinsLabelContainer = Ti.UI.createView({
		top: 0,
	    backgroundColor: '#EEEEEE',
	    width: '100%', height: '60dp'
	});

	var disciplinsLabel = Ti.UI.createLabel({
	    color: '#404E57',
	    font: { fontSize:'13dp',fontFamily:'Helvetica Neue' },
	    shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
	    text: user,
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    top: '5dp',
	    left: '10dp'
	});
	
	var headerLogo = Ti.UI.createImageView({
		image: '/images/logo.png',
		height: '15dp',
		right: '10dp',
		top: '10dp'
	});
	
	var disciplinsSectionLabelContainer = Ti.UI.createView({
		top: '40dp',
	    backgroundColor: '#404E57',
	    width: '100%', height: '20dp'
	});
	
	var disciplinsSectionLabel = Ti.UI.createLabel({
	    color: '#fff',
	    font: { fontSize:'13dp',fontFamily:'Helvetica Neue' },
	    backgroundColor: '#404E57',
	    shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
	    text: title,
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    top: 0,
	    left: '10dp',
	    bottom: 0
	});
	
	disciplinsLabelContainer.add(disciplinsLabel);
	disciplinsLabelContainer.add(headerLogo);
	
	disciplinsSectionLabelContainer.add(disciplinsSectionLabel)
	disciplinsLabelContainer.add(disciplinsSectionLabelContainer);
	
	
	return disciplinsLabelContainer;
}

function getFooterTemplate(){
	var footer = Ti.UI.createView({
		bottom: 0,
	    left: 0,
	    backgroundColor: '#404E57',
	    width: '100%', height: '30dp'
	});
	var footerImg = Ti.UI.createImageView({
		image: '/images/logo_squidtech.png',
		height: '20dp',
		right: '10dp',
		top: '5dp'
	});
	footer.add(footerImg);
	return footer;
}








/**************************************************************************************
 * String functions 
 */
function abreviateName(str){
	var namesToAbreviate = [
		'ADMINISTRAÇÃO','PLANEJAMENTO','SUPERVISIONADO','PROFISSIONAL','SOCIOCULTURAL','SEMINÁRIOS','PREVIDÊNCIA','PESQUISA','TÉCNICAS'
	];
	var abreviations = [
		'ADM.','PLAN.','SUPERV.','PROF.','SOCIOC.','SEM.','PREV.','PESQ.','TÉCN.'
	];
	for(var i=0; i< namesToAbreviate.length; i++){
		//Ti.API.debug(str);
		//Ti.API.debug(namesToAbreviate[i]);
		//Ti.API.debug(str.search( namesToAbreviate[i] ));
		if( str.search( namesToAbreviate[i] ) > -1){
			str = str.replace(namesToAbreviate[i],abreviations[i]);
		}
	}
	return ucFirstAllWords( str.replace(/^s+|s+$/g,"") );
	//return str.replace(/^s+|s+$/g,"");
}
function ucFirstAllWords( str )
{
    var pieces = str.split(" ");
    for ( var i = 0; i < pieces.length; i++ )
    {
    	pieces[i] = pieces[i].toLowerCase();
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
}




/**************************************************************************************
 * System functions 
 */
function getPage( name, path, args){
	if( !args ){ args = null; }
	var page = require(path);
	return new page(args);
}
function logDebug( msg, dump ){
	if( !dump ){
		return Ti.API.debug(msg);
	} else {
		return Ti.API.debug(var_dump(msg));
	}
}
function logInfo(msg){
	return Ti.API.debug(msg);
}
function logError(msg){
	return Ti.API.debug(msg);
}
function mergeObjects(o1, o2) {
  if (o1 == null || o2 == null)
    return o1;

  for (var key in o2)
    if (o2.hasOwnProperty(key))
      o1[key] = o2[key];

  return o1;
}
function PixelsToDPUnits(px){
  return ( parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160));
}
	 
	 
function DPUnitsToPixels(dp){
  return ( parseInt(dp) * (Titanium.Platform.displayCaps.dpi / 160));
}






