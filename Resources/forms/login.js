var loginForm = (function(){

	this.label;
	this.ra;
	this.password;
	this.keep;
	this.btn;
	this.user_exists;
	this.form;
	
	var self = this;
	
	this._init = function(){
		
		self.getLoginActionLabel();
		self.getRaInput();
		self.getPasswordInput();
		self.getCheckboxInput();
		self.getSubmitButton();
		
		self.user_exists = userExists();
	
		if( userExists ){
			self.ra.value = user.fieldByName('ra');
			self.password.value = user.fieldByName('password');
		}
	
		self.btn.addEventListener('touchend', function(){
			activityIndicator.show();
			loginAction({username: username.value, password: password.value, keep: checkbox.value });
		});

	}
	
	
	this.getForm = function()
	{
		return render();
	}
	
	this.render = function(){
		var formView = Ti.UI.createView({
			top: 181,
		    left: 0,
		    width: Titanium.UI.SIZE, height: 450
		});
		if( !userExists ){
			formView.add( this.ra );
			formView.add( this.password ); 
			formView.add( this.checkbox );
		} else {
			loginBtn.top = '50dp';
			if( debug ){
				formView.add( getDeleteBtn() );
			}
		}
		formView.add( loginBtn );
	
		return formView;
	}
	
	this.getLoginActionLabel = function()
	{
		self.label = Ti.UI.createLabel({
		    color: '#fff',
		    shadowColor: '#aaa',
		    shadowOffset: {x:5, y:5},
		    text: 'Entre com suas credenciais da àrea do aluno para ver suas notas.',
		    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		    top: 0,
		    width: width, height: 80,
		    font: { fontSize:'20dp',fontWeight:'bold' },
		});
		return self.label;
	}
	
	this.getRaInput = function()
	{
		self.ra = Ti.UI.createTextField({  
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
	
		self.ra.addEventListener('focus', function(){
			username.backgroundColor = '#fff';
			username.color = '#333';
			username.borderColor = '#025F8B'
		});
		
		self.ra.addEventListener('blur', function(){
			username.backgroundColor = '#025F8B';
			username.color = '#fff';
			username.borderColor = '#025F8B'
		});
		return self.ra;	
	}
	
	this.getPasswordInput = function()
	{
		self.password = Ti.UI.createTextField({  
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
		
		self.password.addEventListener('focus', function(){
			password.backgroundColor = '#fff';
			password.color = '#333';
			password.borderColor = '#025F8B'
		});
		
		self.password.addEventListener('blur', function(){
			password.backgroundColor = '#025F8B';
			password.color = '#fff';
			password.borderColor = '#025F8B'
		});
		return self.password;	
	}
	
	this.getCheckboxInput = function()
	{
		self.keep = Ti.UI.createSwitch({
			style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		    title : 'Salvar credenciais ?',
		    value : false,
		    top : 230,
		    height : 50,
		    left:'5%',  
		    width: '90%', 
		    color: '#333'
		});
		return self.keep;	
	}
	
	this.getSubmitButton = function()
	{
		if( userExists ){ var text = 'Ver notas'; }
		else { var text = 'Enviar'; }
		
		self.btn = Ti.UI.createButton({  
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
		
		self.btn.addEventListener('touchstart', function(){
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
			$htis.btn.animate(animation);
		});
		return $htis.btn;
	}
	
	this.getDeleteBtn = function()
	{
		var deleteBtn = Ti.UI.createButton({  
			    title:'remover credenciais',  
			    top:250, 
			    left:'5%',  
		    	width: '90%',   
			    height: 80,  
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
	
	this.loginAction = function(loginInfo){
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
	
	this.getNotesWindow = function(notes)
	{
		var NotesList = require('/ui/common/disciplines/list_view');
		return new NotesList( notes );
	}
	
	return this._init();
})();