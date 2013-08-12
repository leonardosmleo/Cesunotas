function Menu(){
	
	this.items;
	this.template;
	this.window;
	this.view;
	
	var self = this;
	
	this._init = function(){
		self.window = self.getWindow();
		self.window.add( getHeaderLayout( getGlobal('logged_user'), 'Opções' ) );
		self.view = self.getView();
		self.setItems();
		self.window.add( self.view );
		self.window.add(getFooterTemplate());
		self.window.open();
		Ti.App.fireEvent('login:activity_indicator_hide',{});
	}
	
	this.setItems = function(){
		var items = self.getDefaultItems();
		for( var i=0; i<items.length; i++){
			self.view.add( self.getNewItemView( items[i] ) );
		}
	}
	
	this.getView = function(){
		return Ti.UI.createView({
			top: '70dp',
		    left: '5%',
		    width: '90%', height: Titanium.UI.SIZE
		});
	}
	
	this.getWindow = function(){
		return Ti.UI.createWindow({
			title:'Cesunotas',
			backgroundColor: '#fff',
			tabBarHidden:true,
			navBarHidden:true,
			exitOnClose: true
		});
	}
	
	this.getNewItemView = function(item){
		var button = Ti.UI.createView({   
		    top: item.top, 
		    left: item.left, 
		    right: item.right,
	    	width: '47%',   
		    height: '25%',  
		    backgroundColor: '#eee',
		}); 
		var label = Ti.UI.createLabel({  
		    text: item.title,  
		    top: '60%', 
		    height: '20dp',  
		    color: '#025F8B',
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		    font: { fontSize: '15dp', fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
			    //borderWidth: 3
		});
		var icon = Ti.UI.createImageView({
			image: item.icon,
			top: '20%',
			opacity: 0.6,
			height: '35dp'
		});
		
		button.add(icon);
		button.add(label);

		button.addEventListener('click', function(){
			if( item.event ){
				eval( 'self.'+item.event+'(button);');
			}
		});
		
		button.addEventListener('touchstart', function(){
			var matrix = Ti.UI.create2DMatrix()
		  	//matrix = matrix.rotate(180);
		  	matrix = matrix.scale(.95, .95);
			var animation = Ti.UI.createAnimation({
				transform : matrix,
			    duration : 100,
			    //autoreverse : true,
			    repeat : 1,
			    backgroundColor: '#025F8B',
			    color: '#fff'
			    
			});
			label.color = '#fff';
			icon.image = item.icon_active;
			button.animate(animation);
		});
		
		button.addEventListener('touchend', function(){
			var matrix = Ti.UI.create2DMatrix()
		  	//matrix = matrix.rotate(180);
		  	matrix = matrix.scale(1, 1);
			var animation = Ti.UI.createAnimation({
				transform : matrix,
			    duration : 50,
			    //autoreverse : true,
			    repeat : 1,
			    backgroundColor: '#eee',
			    color: '#666'
			    
			});
			label.color = '#025F8B';
			icon.image = item.icon;
			button.animate(animation);
		});
		
		return button;
	}
	
	this.getDefaultItems = function(){
		return [
			{ title: 'Notas', icon: '/icons/dark_2x/dark_check-2@2x.png', icon_active: '/icons/light_2x/light_check-2@2x.png', left: 0, right: null, top: 0, event: 'getNotasEvent' },
			{ title: 'Horários', icon: '/icons/dark_2x/dark_clock@2x.png', icon_active: '/icons/light_2x/light_clock@2x.png', left: null, right: 0, top: 0 },
			{ title: 'Laboratórios', icon: '/icons/dark_2x/dark_half-full@2x.png', icon_active: '/icons/light_2x/light_half-full@2x.png', left: 0, right: null, top: '42%' },
			{ title: 'Moodle', icon: '/icons/dark_2x/dark_TV@2x.png', icon_active: '/icons/light_2x/light_TV@2x.png', left: null, right: 0, top: '42%' }
		];
	}
	
	this.getNotasEvent = function(button){
		var data = getDataFromDb(getGlobal('logged_user_ra'));
		return getPage( 'NotesList', '/ui/common/disciplines/list_view', data.json);
	}
	
	this._init();
}
module.exports = Menu;