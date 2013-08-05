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
		backgroundColor: '#fff'
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

	scrollView.add( getLoginWindowLabel() );
	scrollView.add( getLoginForm() );
	scrollView.add( getLoginDescriptionLabel() );
	loginWindow.add(scrollView);
	loginWindow.add( getFooterTemplate() );
	

	loginWindow.add( activityIndicator );
	
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
		height: 40,
		left: 15,
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
	    width: Titanium.UI.SIZE, height: 100
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
		 width: 45, height: 45
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
	    left: 80,
	    width: Titanium.UI.SIZE, height: 60,
	    font: { fontSize:'14dp' },
	});
	
	labelDescriptionContainer.add(loginDescriptionLabel);
	
	return labelDescriptionContainer;
}

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

function getLoginWindowActionLabel()
{
	var actionLabel = Ti.UI.createLabel({
	    color: '#fff',
	    shadowColor: '#aaa',
	    shadowOffset: {x:5, y:5},
	    text: 'Entre com suas credenciais da àrea do aluno para ver suas notas.',
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    top: 0,
	    width: width, height: 80,
	    font: { fontSize:'20dp',fontWeight:'bold' },
	});
	
	return actionLabel;
}

function getRaInput()
{
	var username = Ti.UI.createTextField({  
	    color:'#fff',  
	    top:30,  
	    left:'5%',  
	    width: '90%',  
	    height:80,  
	    hintText:'RA',
	    value: '11036102',
	    backgroundColor: "#025F8B",
	    keyboardType:	Ti.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:	Ti.UI.RETURNKEY_DEFAULT,  
	    borderStyle:	Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	    borderColor: '#025F8B',
	    borderWidth: 3,
	    font: { fontSize: '20dp' }
	}); 

	username.addEventListener('focus', function(){
		username.backgroundColor = '#fff';
		username.color = '#333';
		username.borderColor = '#025F8B'
	});
	
	username.addEventListener('blur', function(){
		username.backgroundColor = '#025F8B';
		username.color = '#fff';
		username.borderColor = '#025F8B'
	});
	
	return username;	
}

function getPasswordInput()
{
	var password = Ti.UI.createTextField({  
	    color:'#fff',  
	    top:130,  
	    left:'5%',  
	    width: '90%', 
	    height:80,  
	    hintText:'Senha',
		value:  'senha1',
	    passwordMask:true,  
	    backgroundColor: "#025F8B",
	    keyboardType:	Ti.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:	Ti.UI.RETURNKEY_DEFAULT,  
	    borderStyle:	Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	    borderColor: '#025F8B',
	    borderWidth: 3,
	    font: { fontSize: '20dp' }
	}); 
	
	password.addEventListener('focus', function(){
		password.backgroundColor = '#fff';
		password.color = '#333';
		password.borderColor = '#025F8B'
	});
	
	password.addEventListener('blur', function(){
		password.backgroundColor = '#025F8B';
		password.color = '#fff';
		password.borderColor = '#025F8B'
	});
	
	return password;
	
}

function getCheckboxInput(){
	
	/* var checkboxContainer = Ti.UI.createView({
	    
	    width: width, height: 80
	}); */
	
	var checkbox = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	    title : 'Salvar credenciais ?',
	    value : false,
	    top : 230,
	    height : 50,
	    left:'5%',  
	    width: '90%', 
	    color: '#333'
	});
	
	//checkboxContainer.add(checkbox);
	
	return checkbox;
}

function getLoginBtn()
{
	if( userExists ){
		var text = 'Ver notas';
	} else {
		var text = 'Enviar';
	}
	
	var loginBtn = Ti.UI.createButton({  
		    title: text,  
		    top:300, 
		    left:'5%',  
	    	width: '90%',   
		    height:80,  
		    borderRadius:1, 
		    backgroundColor: '#2292CE',
		    color: '#fff',
		    font: {fontFamily:'Tahoma',fontWeight:'bold',fontSize:'20dp'},
		    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		    borderColor: '#2292CE',
		    //borderWidth: 3
	}); 
	
	loginBtn.addEventListener('touchstart', function(){
		var matrix = Ti.UI.create2DMatrix()
	  	//matrix = matrix.rotate(180);
	  	matrix = matrix.scale(.9, .9);
		var animation = Ti.UI.createAnimation({
			transform : matrix,
		    duration : 200,
		    autoreverse : true,
		    repeat : 1,
		    backgroundColor: '#025F8B'
		    
		});
		//loginBtn.backgroundColor = '#025F8B';
		//loginBtn.color = '#fff';
		//loginBtn.borderColor = '#2292CE';
		loginBtn.animate(animation);
	});

	
  	
	

	return loginBtn;
	
}

function getDeleteBtn()
{
	var deleteBtn = Ti.UI.createButton({  
		    title:'remover credenciais',  
		    top:250, 
		    left:'5%',  
	    	width: '90%',   
		    height:80,  
		    borderRadius:1, 
		    backgroundColor: '#8F1111',
		    color: '#fff',
		    font: {fontFamily:'Tahoma',fontWeight:'bold',fontSize:'20dp'},
		    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		    borderColor: '#8F1111',
		    borderWidth: 3
	}); 
	
	deleteBtn.addEventListener('click', function(){
		deleteUserCredentials();
	});

	return deleteBtn;	
}

function getExistingCredentialsView(){

}

function loginAction(loginInfo){
	var data = getDataFromDb(loginInfo.username);
	Ti.API.debug(data);
	
	Ti.API.debug(data);
	//return false;
	var isOlder = true;
	if( false !== data ){
		var lasttime = new Date(lasttime).getTime();
		var oneHour = 1000 * 60 * 60;
		var isOlder = ((new Date().getTime() - oneHour) < lasttime) ? true: false;
	} 
	
	if( !isOlder ){
		return getNotesWindow(data.json);
	}
	else {
		var url = 'http://squidtech.layoutz.com.br/cesunotas_wbs/webservice.php';
	 	var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		     onload : function(e) {
		         Ti.API.debug(loginInfo.keep);
		         if( loginInfo.keep ){
		         	updateUserCredentilas(loginInfo);
		         }	         
		         updateDataInDb({
		         			user: loginInfo.username,
		         			responseText: this.responseText
		         		});
		         
		         return getNotesWindow(this.responseText);
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
		         //Ti.API.debug(e.error);
		         return false;
		     },
		     timeout : 5000  // in milliseconds
		 });
		 // Prepare the connection.
		 client.open("POST", url);
		 // Send the request.
		 client.send(loginInfo);
	}
}

function getNotesWindow(notes)
{
	//Ti.API.info(notes);
	var NotesList = require('/ui/common/NotesList');
	/*var currentWin = Ti.UI.currentWindow;
	if( currentWin !== null ){
		currentWin.close();
	}*/
	return new NotesList( notes );
	//return true;	
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

function getDataFromDb(ra){
	var db = Ti.Database.open('squidtech.sqlite');
	var results = db.execute('SELECT * FROM data WHERE id = "'+ra+'"');
	db.close();
	if( results.isValidRow() ){
		return {json: results.fieldByName('json'), lasttime: results.fieldByName('lasttime'),};
	}
	return false;
}

function updateDataInDb(data){
	var db = Ti.Database.open('squidtech.sqlite');	
	var lasttime = new Date();
	value = data.responseText;
	var results = db.execute("REPLACE INTO data ( id, json, lasttime ) VALUES('"+data.user+"','"+value.toString()+"', '"+lasttime.toString("yyyy/mm/dd HH:MM:ss")+"')");
	db.close();
	return results;
}

function deleteDataInDb(){
	var db = Ti.Database.open('squidtech.sqlite');
	var results = db.execute('DELETE FROM data WHERE 1 = 1');
	db.close();
	return true;
}

function deleteUserCredentials(){
	var db = Ti.Database.open('squidtech.sqlite');
	var results = db.execute('DELETE FROM credentials WHERE 1 = 1');
	db.close();
	deleteDataInDb();
	
	return true;
}

module.exports = LoginView;