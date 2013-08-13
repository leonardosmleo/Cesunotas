function PeriodsWindow( rows, discipline ){
	
	this.window;
	this.view;
	this.section;
	this.footer;
	this.total;
	this.avg;
	
	this.chart_notes = [];
	
	var self = this;
	
	this._init = function( rows, discipline ) {
		
		self.row_template 	= self.getItemsTemplate();
		self.window 		= self.getNewWindow();
		self.section 		= self.getTableSection();
		self.prepareRows( rows );
		self.view 			= self.getTableView(self.section);
 		self.window.add( getHeaderLayout( getGlobal('logged_user'), 'Disciplinas / '+discipline ) );
		self.window.add(self.view );
		self.window.add(self.getTotalsView());
		self.window.add(self.getChartWebView());
		//self.window.add(self.scrollView);
		self.window.add(getFooterTemplate());
		self.window.open(); 

		return self.window;
	}

	this.prepareRows = function( rows ){
		self.total = 0;
		var avgRatio = 0;
		self.avg = 0;
		for( var c=0; c<rows.length; c++){
			var i =0;
			var row = self.getNewTableRow(c);

			for( var elem in rows[c] ){	
				
				var options = mergeObjects( self.row_template[elem], rows[c][elem]);

				var note = parseFloat(rows[c][elem].text)
				if( elem == 'note'){
					self.chart_notes.push(note);
				 	if( note > 0){
						self.chart_notes.push();
						self.total = self.total + note;
						avgRatio++;
					}
				}
				
				var row_elem = Ti.UI.createLabel( options );

				row.add( row_elem );
				i++;
			}
			
			self.section.add( row );	
		}
		self.total = new Number( self.total );
		self.total = self.total.toFixed(1);
		if( self.total > 0 ){
			self.avg = self.total / avgRatio;
		} else {
			self.avg = '';
		}
	}
	
	this.getNewTableRow = function(index){
		return Ti.UI.createTableViewRow({
		    className:'forumEvent', // used to improve table performance
		    selectedBackgroundColor:'white',
		    rowIndex:index, // custom property, useful for determining the row during events
		    height: 'auto'
		});
		
	}

	this.getTableView = function(section){
		return Ti.UI.createTableView({
		    data: [section],
		    top: '60dp',
		    height: '257dp',
		    backgroundColor: '#fff',
		    separatorColor: '#eeeeee'
		});
	}
	
	this.getTableSection = function(rows){
		return Ti.UI.createTableViewSection(); //{ headerTitle: 'Fruit' }
	}
	
	this.getNewWindow = function(){
		var win = Ti.UI.createWindow({
					title:'Cesunotas',
					backgroundColor: '#fff',
					tabBarHidden:true,
					navBarHidden:true,
					exitOnClose: false,
					modal: true,
					//left: Ti.Platform.displayCaps.platformWidth
					//left: Ti.Platform.displayCaps.platformWidth
			});
		win.addEventListener('androidback',function(e){
				//e.cancelBubble = true;
				win.close();
				win = null;
			});
		return win;
	}
	
	this.getChartWebView = function(){
		
		var webview_container = Ti.UI.createView({
			width: Titanium.UI.FILL,
			height:'139dp',
			top: '374dp',
			left: 0,
			backgroundColor: '#fff'
		});

		var webview = Ti.UI.createWebView({
			url:'/ui/common/periods/chart.html',
			width: Titanium.UI.SIZE,
			height:'139dp',
			top: 0,
			left: 0,		
			showScrollbars: false,  
    		touchEnabled: false,
    		backgroundColor: '#eee'
		});

		var activity = getNewActivityIndicator();
		activity.backgroundColor = '#eee';
		
		/*
		webview.addEventListener('load', function(e){
			Ti.App.fireEvent("web:data", {rows: self.getChartArray(), width: ( PixelsToDPUnits(getGlobal('device.width')) * 0.93), height: PixelsToDPUnits(135) });
		});
		*/
		Ti.App.addEventListener('web:activity', function(e){
			activity.hide();
		});
		
		//webview_container.add( webview );
		webview_container.add( activity );
		
		activity.show();
		
		return webview_container;
	}
	
	this.getChartArray = function(){
		return [
				['periodo', 'nota'],
				['bim 1', parseFloat(self.chart_notes[0])],
				['bim 2', parseFloat(self.chart_notes[1])],
				['sub 1', parseFloat(self.chart_notes[2])],
				['bim 3', parseFloat(self.chart_notes[3])],
				['bim 4', parseFloat(self.chart_notes[4])],
				['sub 2', parseFloat(self.chart_notes[5])]		
			];
	}

	this.getTotalsView = function(){
		var footerContainer = Ti.UI.createView({
			top: '317dp',
		    backgroundColor: '#eeeeee',
		    width: '100%', height: '55dp'
		});
		
		var footerTotalLabel = Ti.UI.createLabel({
		    color: '#999',
		    font: { fontSize:'10dp',fontFamily:'Helvetica Neue' },
		    shadowColor: '#000',
		    shadowOffset: {x:'5dp', y:'5dp'},
		    text: 'Total',
		    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		    top: '8dp',
		    left: '10dp'
		});
		footerContainer.add(footerTotalLabel);
		
		var footerTotalValue = Ti.UI.createLabel({
		    color: '#025F8B', // ( ( total < 26 ) ? ((total < 13 )? '#FF4D4D' : '#D96D00' ) : '#447F17' ),
		    font: { fontSize:'35dp',fontFamily:'Helvetica Neue' },
		    shadowColor: '#000',
		    shadowOffset: {x:'5dp', y:'5dp'},
		    text: self.total,
		    //textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		    top: '5dp',
		    left: '80dp'
		});
		footerContainer.add(footerTotalValue);

		var footerTotalAvgLabel = Ti.UI.createLabel({
		    color: '#999',
		    font: { fontSize:'10dp',fontFamily:'Helvetica Neue' },
		    shadowColor: '#000',
		    shadowOffset: {x:'5dp', y:'5dp'},
		    text: 'Média',
		    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		    top: '8dp',
		    left: '190dp'
		});
		footerContainer.add(footerTotalAvgLabel);
		
		var footerTotalAvg = Ti.UI.createLabel({
		    color: '#025F8B', // ( ( self.avg < 5 ) ? '#FF4D4D' : '#447F17' ),
		    font: { fontSize:'30dp',fontFamily:'Helvetica Neue' },
		    shadowColor: '#000',
		    shadowOffset: {x:5, y:5},
		    text: self.avg,
		    //textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		    left: '240dp',
		    top: '8dp'
		});
		footerContainer.add(footerTotalAvg);

		return footerContainer;
	}
	
	this.getItemsTemplate = function(){
		return {
		       period: {                            // Title 
	                color: '#666',
	                font: { fontFamily:'Helvetica Neue', fontSize: '15dp' },
	                left: '10dp',
	                top:'10dp'
		       }, 
		       note: {                            // Subtitle
	                font: { fontFamily:'Helvetica Neue', fontSize: '30dp' },
	                left: '110dp', 
	                top:0,
	                bottom: 0,
	                height: '42dp',
	                color: '#025F8B'
		        },
		        dif: {                            // Title 
	                color: '#666',
	                font: { fontFamily:'Helvetica Neue', fontSize: '20dp' },
	                right: '15dp', top: '5dp'
		       }
		    };
	}
	this._init( rows, discipline );
}