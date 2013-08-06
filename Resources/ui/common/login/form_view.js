
/* Include global variables  */
Ti.include('/ui/models/login.js');

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
		backgroundColor: template.login_window.backgroundColor
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
	
	var LoginForm = require('forms/login');

	//scrollView.add( getLoginWindowLabel() );
	var form = LoginForm();
	scrollView.add( form );
	//scrollView.add( getLoginDescriptionLabel() );
	loginWindow.add(scrollView);
	//loginWindow.add( getFooterTemplate() );
	
	addToLoginUserMenu();

	loginWindow.add( activityIndicator );

	
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


function addToLoginUserMenu()
{	
	var activity = loginWindow.activity;
	
	activity.onCreateOptionsMenu = function(e){
	  var menu = e.menu;
	  var menuItem = menu.add({ 
	    title: "remover credênciais", 
	    icon:  "/icons/light/light_x.png",
	    showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
	  });
	  
	  var alert = Ti.UI.createAlertDialog({ title: 'Limpar', message: 'Remover credênciais do sistema ?', buttonNames: ['Yes', 'No'], cancel: 1 });
	  
	  menuItem.addEventListener("click", function(e) {	
		  alert.show();
	  });
	
	  alert.addEventListener("click", function(e){
	      //Clicked cancel, first check is for iphone, second for android
		  if (e.cancel === e.index || e.cancel === true) { return false; }
		  //now you can use parameter e to switch/case
		  switch (e.index) {
		      case 0: deleteUserCredentials();
		      break;
		      //This will never be reached, if you specified cancel for index 1
		  case 1: return false;
		      break;
		  default:
		      	return false
		      break;
		  }
	  });
	}	
}
/*
function getLoginForm(){
	
	var formContainerView = Ti.UI.createView({
		top: 181,
	    left: 0,
	    width: Titanium.UI.SIZE, height: 450
	});
	
	var username = getRaInput();
	var password = getPasswordInput();
	var checkbox = getCheckboxInput();
	

	var user = getStoredUserCredentioals( username.value );
	userExists = ( user.rowCount > 0 )? true : false;

	if( userExists ){
		username.value = user.fieldByName('ra');
		password.value = user.fieldByName('password');
	}
	
	var loginBtn = getLoginBtn(); 
	
	loginBtn.addEventListener('touchend', function(){
		activityIndicator.show();
		loginAction({username: username.value, password: password.value, keep: checkbox.value });

	});
	
	if( !userExists ){
		formContainerView.add( username );
		formContainerView.add( password ); 
		formContainerView.add( checkbox );
	} else {
		loginBtn.top = '50dp';
		if( debug ){
			formContainerView.add( getDeleteBtn() );
		}
	}
	
	formContainerView.add( loginBtn );

	return formContainerView;  
}
*/

module.exports = LoginView;