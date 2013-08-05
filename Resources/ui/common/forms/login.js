var loginFrom = (function(options){

	this.label;
	this.ra;
	this.password;
	this.keep;
	this.btn;
	
	var $this = this;
	
	function _init(){
		
		$this.getLoginActionLabel();
		$this.getRaInput();
		$this.getPasswordInput();
		$this.getCheckboxInput();
		$this.getSubmitButton();
		
		var user = getStoredUserCredentioals( username.value );
		userExists = ( user.rowCount > 0 )? true : false;
	}
	
	function getForm(){
		var formView = Ti.UI.createView({
			top: 181,
		    left: 0,
		    width: Titanium.UI.SIZE, height: 450
		});
	}
	
	function getLoginActionLabel()
	{
		$this.label = Ti.UI.createLabel({
		    color: '#fff',
		    shadowColor: '#aaa',
		    shadowOffset: {x:5, y:5},
		    text: 'Entre com suas credenciais da àrea do aluno para ver suas notas.',
		    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		    top: 0,
		    width: width, height: 80,
		    font: { fontSize:'20dp',fontWeight:'bold' },
		});
		$this.label = actionLabel;
		return actionLabel;
	}
	
	function getRaInput()
	{
		$this.ra = Ti.UI.createTextField({  
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
	
		$this.ra.addEventListener('focus', function(){
			username.backgroundColor = '#fff';
			username.color = '#333';
			username.borderColor = '#025F8B'
		});
		
		$this.ra.addEventListener('blur', function(){
			username.backgroundColor = '#025F8B';
			username.color = '#fff';
			username.borderColor = '#025F8B'
		});
		return $this.ra;	
	}
	
	function getPasswordInput()
	{
		$this.password = Ti.UI.createTextField({  
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
		
		$this.password.addEventListener('focus', function(){
			password.backgroundColor = '#fff';
			password.color = '#333';
			password.borderColor = '#025F8B'
		});
		
		$this.password.addEventListener('blur', function(){
			password.backgroundColor = '#025F8B';
			password.color = '#fff';
			password.borderColor = '#025F8B'
		});
		return $this.password;	
	}
	
	function getCheckboxInput()
	{
		$this.keep = Ti.UI.createSwitch({
			style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		    title : 'Salvar credenciais ?',
		    value : false,
		    top : 230,
		    height : 50,
		    left:'5%',  
		    width: '90%', 
		    color: '#333'
		});
		return $this.keep;	
	}
	
	function getSubmitButton()
	{
		if( userExists ){
			var text = 'Ver notas';
		} else {
			var text = 'Enviar';
		}
		
		$htis.btn = Ti.UI.createButton({  
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
		
		$htis.btn.addEventListener('touchstart', function(){
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
	
});