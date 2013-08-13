var android_menu = {
	items: [],	
	add: function(item){
		this.items.push(item);
	},
	render: function(activity){
		var $this = this;
		activity.onCreateOptionsMenu = function(e){	
			if( android_menu.items.length > 0 ){
				var menu = e.menu;
				for( var i=0; i<android_menu.items.length; i++ ){	
				  	var item = new android_menu.items[i](menu);
				}
			}
	    }
	}
};
