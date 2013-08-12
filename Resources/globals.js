Ti.App.globals = {
	logged_user: false,
	logged_user_ra: false,
	logged_user_name: false,
	app:{
		background_color: '#fff'
	},
	filesystem: {
		path: {
			resources: Titanium.Filesystem.resourcesDirectory,
			images: Titanium.Filesystem.resourcesDirectory+'/images',
			icons: Titanium.Filesystem.resourcesDirectory+'/icons'
		}
	},
	device: {
		osname:		Ti.Platform.osname,
		version:    Ti.Platform.version,
		height:		Ti.Platform.displayCaps.platformHeight,
		width:		Ti.Platform.displayCaps.platformWidth,
		isTablet:	(( Ti.Platform.osname === 'ipad' || (Ti.Platform.osname === 'android' )
							&& ( Ti.Platform.displayCaps.platformWidth > 899 || Ti.Platform.displayCaps.platformHeight > 899 ) )? true : false)
	},
	debug: {
		show_remove_credentials_btn: 1,
	},
	modules: {
		activityIndicator: false
	},
	db: {
		file: 'squidtech.sqlite',
	}

	
	
};
// config.device.width
function getGlobal(name){
	var s = name.split('.');
	if( s.length>1){
		var v = Ti.App.globals[s[0]];
		for(var i=1;i<=(s.length - 1);i++){
			v = v[s[i]];
		}
		return v;
	} else {
		return Ti.App.globals[s[0]];
	}
}
function setGlobal(name,value){
	Ti.App.globals[name] = value;
}
