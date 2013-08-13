var login_android_menu = function( menu )
{	
	if( getGlobal('debug.show_remove_credentials_btn') ){
	  	var menuItem = menu.add({ 
	    	title: "remover credênciais", 
	    	icon:  "/icons/light/light_x.png",
	    	showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
	  	});	  
	  	var alert = Ti.UI.createAlertDialog({ 
			title: 'Limpar', 
			message: 'Remover credênciais do sistema ?', 
			buttonNames: ['Yes', 'No'], 
			cancel: 1 
  		});  
	  	menuItem.addEventListener("click", 
		  	function(e) {	
			  	alert.show();
		  	}
	  	);
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