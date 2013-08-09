function LoginForm(template){

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
		
		self.user_exists = userExists(self.ra);
		
		Ti.API.debug((true !== self.user_exists)+' estamos aqui');
		
		if( false !== self.user_exists ){
			self.ra.value = self.user_exists.fieldByName('ra');
			self.password.value = self.user_exists.fieldByName('password');
		}
		
		var activityIndicator = getActivityIndicator();
	
		self.btn.addEventListener('touchend', function(){
			//activityIndicator.show();
			loginAction({username: username.value, password: password.value, keep: checkbox.value });
		});
		
		return self;
	}
	
	
	this.getForm = function()
	{
		return self.render();
	}
	
	this.render = function(){
		var formView = Ti.UI.createView({
			top: 181,
		    left: 0,
		    width: Titanium.UI.SIZE, height: 450
		});
		if( !self.userExists ){
			formView.add( self.ra );
			formView.add( self.password ); 
			formView.add( self.keep );
		} else {
			self.btn.top = '50dp';
		}
		formView.add( self.btn );
	
		return formView;
	}
	
	this.getLoginActionLabel = function()
	{
		self.label = Ti.UI.createLabel({
		    color: template.form.label.color,
		    shadowColor: template.form.label.shadowColor,
		    shadowOffset: {x: template.form.label.shadowOffset.x, y: template.form.label.shadowOffset.y},
		    text: 'Entre com suas credenciais da àrea do aluno para ver suas notas.',
		    textAlign: template.form.label.text_align,
		    top: template.form.label.top,
		    width: Titanium.UI.SIZE, height: template.form.label.height,
		    font: { fontSize: template.form.label.font_size, fontWeight: template.form.label.font_weigth },
		});
		return self.label;
	}
	
	this.getRaInput = function()
	{
		self.ra = Ti.UI.createTextField({  
		    color:'#fff',  
		    top:30,  
		    left:'5%',  
		    width: template.form.input.width,  
		    height: template.form.input.height,  
		    hintText:'RA',
		    value: '11036102',
		    backgroundColor: template.form.input.background_color,
		    keyboardType:	Ti.UI.KEYBOARD_DEFAULT,  
		    returnKeyType:	Ti.UI.RETURNKEY_DEFAULT,  
		    borderStyle:	Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		    borderColor: template.form.input.border_color,
		    borderWidth: template.form.input.border_width,
		    font: { fontSize: template.form.input.font_size, fontWeight: template.form.input.font_weigth },
		}); 
	
		self.ra.addEventListener('focus', function(){
			self.ra.backgroundColor = '#fff';
			self.ra.color = '#333';
			self.ra.borderColor = '#025F8B'
		});
		
		self.ra.addEventListener('blur', function(){
			self.ra.backgroundColor = '#025F8B';
			self.ra.color = '#fff';
			self.ra.borderColor = '#025F8B'
		});
		
		return self.ra;	
	}
	
	this.getPasswordInput = function()
	{
		self.password = Ti.UI.createTextField({  
		    color:'#fff',  
		    top:130,  
		    left:'5%',  
		    width: template.form.input.width, 
		    height: template.form.input.height,  
		    hintText:'Senha',
			value:  'senha1',
		    passwordMask:true,  
		    backgroundColor: template.form.input.background_color,
		    keyboardType:	Ti.UI.KEYBOARD_DEFAULT,  
		    returnKeyType:	Ti.UI.RETURNKEY_DEFAULT,  
		    borderStyle:	Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		    borderColor: template.form.input.border_color,
		    borderWidth: template.form.input.border_width,
		    font: { fontSize: template.form.input.font_size },
		}); 
		
		self.password.addEventListener('focus', function(){
			self.password.backgroundColor = '#fff';
			self.password.color = '#333';
			self.password.borderColor = '#025F8B'
		});
		
		self.password.addEventListener('blur', function(){
			self.password.backgroundColor = '#025F8B';
			self.password.color = '#fff';
			self.password.borderColor = '#025F8B'
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
		    width: template.form.checkbox.width, 
		    color: template.form.checkbox.color
		});
		return self.keep;	
	}
	
	this.getSubmitButton = function()
	{
		if( userExists ){ var text = 'Ver notas'; }
		else { var text = 'Enviar'; }
		
		self.btn = Ti.UI.createButton({  
		    title: text,  
		    top: template.form.button.top, 
		    left: template.form.button.left,  
	    	width: template.form.button.width,   
		    height: template.form.button.height,  
		    borderRadius:1, 
		    backgroundColor: template.form.button.background_color,
		    color: template.form.button.color,
		    font: {},
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
			self.btn.animate(animation);
		});
		return self.btn;
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
};
exports.LoginForm = LoginForm;