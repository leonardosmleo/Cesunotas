
/* Include global variables  */
Ti.include('/models/login.js');
Ti.include('/ui/templates/login.js');
/**
 * @author jmilanes
 */
var width = Ti.Platform.displayCaps.platformWidth;
var userExists = false;
function LoginView()
{
	// create the login window to hold our login form
	var loginWindow = Ti.UI.createWindow({
		//title:'SquidTech login',
		tabBarHidden:true,
		navBarHidden:true,
		exitOnClose: true,
		backgroundColor: template.window.background_color
	});

	var scrollView = Ti.UI.createScrollView({
		  contentWidth: 'auto',
		  contentHeight: 'auto',
		  showVerticalScrollIndicator: true,
		  showHorizontalScrollIndicator: true,
		  height: '100%',
		  width: '100%',
		  top: 0,
		  left: 0,
		  bottom: 50
	});
	
	scrollView.addEventListener('postlayout', function(){
		scrollView.height = Ti.Platform.displayCaps.platformHeight - 50;
	});
	
	var form = require('forms/login');
	scrollView.add( getLoginWindowLabel() );
	var LoginForm = new form(template);
	
	scrollView.add( LoginForm.getForm() );
	scrollView.add( getLoginDescriptionLabel() );
	loginWindow.add(scrollView);
	loginWindow.add( getFooterTemplate() );

	Ti.include('/ui/common/login/android_menu.js');
	android_menu.add(login_android_menu);

	var activityIndicator = getNewActivityIndicator();
	loginWindow.add( activityIndicator );

	Ti.App.addEventListener('login:activity_indicator_show',function(e){
		activityIndicator.show();
	});
	Ti.App.addEventListener('login:activity_indicator_hide',function(e){
		activityIndicator.hide();
	});

	android_menu.render( loginWindow.activity );

	loginWindow.open();
	
	return loginWindow;
}

function getLoginWindowLabel()
{
	var labelContainer = Ti.UI.createView({
	    top: 0,
	    left: 0,
	    width: Titanium.UI.SIZE, height: Titanium.UI.SIZE
	});
	
	var logo = Ti.UI.createImageView({
		image: '/images/logo.png',
		height: '30dp',
		left: '10dp',
		top: 20
	});
	
	labelContainer.add(logo);
	
	return labelContainer;
}

function getLoginDescriptionLabel()
{
	var labelDescriptionContainer = Ti.UI.createView({
	    top: 81,
	    left: 0,
	    backgroundColor: '#fff',
	    width: Titanium.UI.SIZE, height: '70dp',
	});
	
	if( userExists ){
		var image = '/icons/dark_2x/dark_check@2x.png';
	} else {
		var image = '/icons/dark_2x/dark_key@2x.png';	
	}

	var loginDescriptionIcon = Ti.UI.createImageView({
		 image: image,
		 left: 20,
		 top: 20,
		 width: '35dp', height: '30dp'
	});
	
	labelDescriptionContainer.add(loginDescriptionIcon);
	
	if( userExists ){
		var description = 'Clique no botão abaixo para ver suas notas.';
	} else {
		var description = 'Informe seu Ra e senha para visualizar sua notas.';	
	}
	var loginDescriptionLabel = Ti.UI.createLabel({
	    color: '#333',
	    shadow:{
	        shadowRadius:3,
	        shadowOpacity:1,
	        shadowOffset:{x:5, y:5},
	        shadowColor:"#000000"
	    },
	    text: description,
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    top: 20,
	    left: '60dp',
	    width: Titanium.UI.SIZE, height: 60,
	    font: { fontSize:'14dp' },
	});
	
	labelDescriptionContainer.add(loginDescriptionLabel);
	
	return labelDescriptionContainer;
}

module.exports = LoginView;