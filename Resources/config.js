config = {
	app: {
		app_background_color: '#ffffff'
	},
	device: {
		osname:		Ti.Platform.osname,
		version:    Ti.Platform.version,
		height:		Ti.Platform.displayCaps.platformHeight,
		width:		Ti.Platform.displayCaps.platformWidth,
		isTablet:	Ti.Platform.osname === 'ipad' 
						|| (Ti.Platform.osname === 'android'
							&& (Ti.Platform.displayCaps.platformWidth > 899 
								|| Ti.Platform.displayCaps.platformHeight > 899))
	},
	debug: {
		show_remove_credentials_btn: 0,
	},
	modules: {
		activityIndicator: false
	},
	db: {
		file: 'squidtech.sqlite',
		
	}
}

