/**
 * @author jmilanes
 */

var diciplinsWindows;
var currentWindow = -1;
var user = false;
var disciplins_names = [];
function NotesList(notes)
{
	notes = JSON.parse(notes);
	user = notes['user'];
	delete notes['user'];

	var notesListWindow = Ti.UI.createWindow({
		title:'Cesunotas',
		backgroundColor: '#161616',
		tabBarHidden:true,
		navBarHidden:true,
		exitOnClose: true
	});
	
	var disciplinsLabelContainer = getHeaderLayout(user);
	
	notesListWindow.add(disciplinsLabelContainer);

	var listView = prepareListView( notes['notes']);

	notesListWindow.add( listView );
	
	notesListWindow.add( getFooterTemplate() );
	
	//var activityIndicator = getActivityIndicator();
	//notesListWindow.add( activityIndicator );
	
	notesListWindow.open();

	return notesListWindow;
}

function getHeaderLayout(user, title){
	if( !title ){
		title = 'Disciplinas';
	}
	var disciplinsLabelContainer = Ti.UI.createView({
		top: 0,
	    backgroundColor: '#EEEEEE',
	    width: '100%', height: 90
	});

	var disciplinsLabel = Ti.UI.createLabel({
	    color: '#404E57',
	    font: { fontSize:'13dp',fontFamily:'Helvetica Neue' },
	    shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
	    text: user,
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    top: 10,
	    left: '10dp'
	});
	
	var headerLogo = Ti.UI.createImageView({
		image: '/images/logo.png',
		height: '15dp',
		right: '10dp',
		top: 15
	});
	
	var disciplinsSectionLabelContainer = Ti.UI.createView({
		top: 60,
	    backgroundColor: '#404E57',
	    width: '100%', height: 30
	});
	
	var disciplinsSectionLabel = Ti.UI.createLabel({
	    color: '#fff',
	    font: { fontSize:'13dp',fontFamily:'Helvetica Neue' },
	    backgroundColor: '#404E57',
	    shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
	    text: title,
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    top: 0,
	    left: '10dp',
	    bottom: 0
	});
	
	disciplinsLabelContainer.add(disciplinsLabel);
	disciplinsLabelContainer.add(headerLogo);
	
	disciplinsSectionLabelContainer.add(disciplinsSectionLabel)
	disciplinsLabelContainer.add(disciplinsSectionLabelContainer);
	
	
	return disciplinsLabelContainer;
}

function prepareListView( notes )
{
	//Ti.API.debug( JSON.stringify( notes ) );
	var periods = notes['Disciplina'];
	delete notes['Disciplina'];

	var disciplins = [];
	var nots = [];
	var difs = [];
	for( var disciplin in notes ){
		
		var name = disciplin.split('-');
		code = name[1].replace(/^s+|s+$/g,"");
		name = name[0];
		disciplins.push( { 
			pic:{
				image: '/icons/dark_2x/dark_arrow-closed@2x.png', opacity: 0.3
			},
			code:{
				text: code
			},
			info:{ 
				text: abreviateName(name), 
			} 
		} );
		
		disciplins_names.push( abreviateName(name) );
		
		var nos = extractNotes(notes[disciplin]);
		nots.push(nos.notes);
		difs.push(nos.difs);
	}

	var section = getNotesListSection(disciplins);

	var notesListView = getNotesListView(section);

	notesListView.setSections( [section] );

	diciplinsWindows = preparePeriodsListViews(section,periods,nots,difs);

	notesListView.addEventListener('itemclick', function(e){
    	var item = section.getItemAt(e.itemIndex);
    	//Ti.API.debug(var_dump(e));
    	if( typeof item.properties !== 'undefined' ){
			item.properties.opacity = 1;
		} else {
			item.properties = { opacity: 1};
		}
		
    	section.updateItemAt(e.itemIndex, item );
    	
    	setTimeout(function(){
			item.properties.opacity = 0.9;
			section.updateItemAt(e.itemIndex, item );
    	},1000);
    	
    	openPeriodViewByDiciplinIndex(e.itemIndex);
    	
    	//Ti.API.debug(var_dump(item));
    	//item.properties.backgroundColor = '#000';
  	});

	return notesListView;
	
}

function getNotesListView(){
	return Ti.UI.createListView({
	    // Maps myTemplate dictionary to 'template' string
	    templates: { 'template': getDiciplinsItemsTemplate() },
	    // Ue 'template', that is, the myTemplate dict created earlier
	    // for all items as long as the template property is not defined for an item.
	    defaultItemTemplate: 'template',
	    top: 90,
	    bottom: 50,
	    backgroundColor: '#000'
	});
}

function getPeriodsListView(){
	return Ti.UI.createListView({
	    // Maps myTemplate dictionary to 'template' string
	    templates: { 'template': getPeriodsItemsTemplate() },
	    // Ue 'template', that is, the myTemplate dict created earlier
	    // for all items as long as the template property is not defined for an item.
	    defaultItemTemplate: 'template',
	    top: 90,
	    bottom: 100,
	    backgroundColor: '#fff',
	    borderColor: '#efefef'
	});
}

function getNotesListSection(diciplinsItems){
	var section = Ti.UI.createListSection();
	section.setItems( diciplinsItems );
	return section;
}

function getPeriodsListSection(periods){
	var section = Ti.UI.createListSection();
	section.setItems( periods );
	return section;
}

function extractNotes(notes){
	var ns = [];
	var difs = [];
	for( var i=0; i < notes.length; i++ ){		
		if( typeof notes[i] == 'string' ){
			var note = notes[i].replace(',','.');
			note = parseFloat( note );
		} else {
			note = notes[i];
		}
		note = new Number( note );
		note = note.toFixed(1);
		
		if( i > 0 ){
			if( note > 0 ){
				var previus = parseFloat( notes[( i - 1 )].replace(',','.') );
				difs[i] = new Number( Math.abs( note - previus ) );
				difs[i] = difs[i].toFixed(1);
				if( note > previus ){
					difs[i] = '+'+difs[i]+'';
				} else {
					difs[i] = '-'+difs[i]+'';
				}
			}
		}
		ns.push(note);
	}
	return { notes: ns, difs: difs };
}

function prepareDiciplinsListItemView(){
	
}

function preparePeriodsListViews(section,periods,nots,difs){
	
	var results = [];
	
	for( var i=0; i<nots.length; i++){
		
		//var list = new getPeriodsListView();	
		var rows = [];
		for( var b=0; b < nots[i].length; b++){
			var dif = '';
			if( b > 0 && nots[i][b] > 0 ){
				dif = difs[i][b];
			}
			rows.push({ 
				period:{text: periods[b]},
				note:{ 
					text: nots[i][b],
					color: ( ( nots[i][b] < 6.5 ) ? ((nots[i][b] < 3.5 )? ( (nots[i][b] == 0)? '#ccc' : '#9F1313' ) : '#D96D00' ) : '#447F17' )
				},
				dif:{ 
					text: dif,
					color: ( dif.indexOf("+") ) ? '#9F1313' : '#447F17'
				}
			});
		}
		
		
		//list.setSections([section]);

		results.push(rows);
	}
	return results;
}
var click_active = false;
function openPeriodViewByDiciplinIndex(index)
{
	if( !click_active ){
		click_active = true;

		//Ti.API.debug(index);
		
		var currentWin = Ti.UI.currentWindow;
		
		//Ti.API.debug(currentWin.visible);
		//Ti.API.debug(currentWin);
		//Ti.API.debug(diciplinsWindows);
		
		var list = new getPeriodsListView();	
		var section = getPeriodsListSection(diciplinsWindows[index]);
		list.setSections([section]);
		//list.setSections([diciplinsWindows[index]]);

		//Ti.API.debug(list);

		if( typeof list !== 'object' ){
			return false;
		}
		
		var sec = list.getSections();
		
		var total = 0;
		var avgRatio = 0;
		var avg = 0;
		if( typeof sec !== 'undefined' ){
			
			var items = sec[0].getItems();
			//Ti.API.debug();
			for( var i=0; i<items.length; i++ ){
				var note = parseFloat(items[i].note.text);
				if( note > 0 ){
					total = total + note;
					avgRatio++;
				}
			}
			total = new Number( total );
			total = total.toFixed(1);
			if( total > 0 ){
				avg = total / avgRatio;
			} else {
				avg = '';
			}
		}
		//Ti.API.debug( JSON.stringify(items) );

		var header = new getHeaderLayout( user, 'Disciplinas / '+disciplins_names[index] );
		var footer = new getPeriodsFooter( total, avg );
		//return false;
	
		//Ti.API.debug(JSON.stringify(list));
		
		var win = new getNewWindowForPeriods(index,list);
		win.add(header);
		win.add(list);
		win.add(footer);
		
		//Ti.API.debug(list);
		

		click_active = false;
		win.open({animated:true, left: 0});
		
	}
	//return false;
	return win;
}

function getNewWindowForPeriods(index,list){
	var win = Ti.UI.createWindow({
				title:'Cesunotas_'+index,
				backgroundColor: '#161616',
				tabBarHidden:true,
				navBarHidden:true,
				exitOnClose: false,
				modal: true,
				bubbleParent: false,
				left: Ti.Platform.displayCaps.platformWidth
				//left: Ti.Platform.displayCaps.platformWidth
		});
	win.addEventListener('androidback',function(e){
			e.cancelBubble = true;
			win.close();
			win.remove(list);
			win = null;
		});
	return win;
}

function getPeriodsFooter( total, avg ){
	var footerContainer = Ti.UI.createView({
		bottom: 0,
	    backgroundColor: '#404E57',
	    width: '100%', height: 100
	});
	
	var footerTotalLabel = Ti.UI.createLabel({
	    color: '#999',
	    font: { fontSize:'20dp',fontFamily:'Helvetica Neue' },
	    shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
	    text: 'Total',
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    top: 10,
	    left: '10dp'
	});

	var footerTotalValue = Ti.UI.createLabel({
	    color: '#fff', // ( ( total < 26 ) ? ((total < 13 )? '#FF4D4D' : '#D96D00' ) : '#447F17' ),
	    font: { fontSize:'45dp',fontFamily:'Helvetica Neue' },
	    shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
	    text: total,
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    top: 10,
	    left: '100dp',
	    bottom: 10
	});
	
	var footerTotalAvg = Ti.UI.createLabel({
	    color: ( ( total < 5 ) ? '#FF4D4D' : '#447F17' ),
	    font: { fontSize:'30dp',fontFamily:'Helvetica Neue' },
	    shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
	    text: avg,
	    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    left: '220dp',
	    top: 15
	});
	footerContainer.add(footerTotalLabel);
	footerContainer.add(footerTotalValue);
	footerContainer.add(footerTotalAvg);
	return footerContainer;
}

function getPeriodsItemsTemplate(){
	return  {
	    childTemplates: [
	       {                            // Title 
	            type: 'Ti.UI.Label',     // Use a label for the title 
	            bindId: 'period',          // Maps to a custom info property of the item data
	            properties: {            // Sets the label properties
	                color: '#666',
	                font: { fontFamily:'Helvetica Neue', fontSize: '20dp' },
	                left: '15dp', top:15
	            }
	       }, 
	        {                            // Subtitle
	            type: 'Ti.UI.Label',
	            bindId: 'note',  
	            properties: {            // Sets the label properties
	                font: { fontFamily:'Helvetica Neue', fontSize: '45dp' },
	                left: '100dp', 
	                top:10,
	                bottom: 10,
	                color: '#025F8B'
	            }
	        },
	        {                            // Title 
	            type: 'Ti.UI.Label',     // Use a label for the title 
	            bindId: 'dif',          // Maps to a custom info property of the item data
	            properties: {            // Sets the label properties
	                color: '#666',
	                font: { fontFamily:'Helvetica Neue', fontSize: '30dp' },
	                left: '180dp', top: 15
	            }
	       },
	    ]
 	};
}

function getDiciplinsItemsTemplate(){
	return  {
		properties: {
			backgroundColor: '#fff',
			opacity: 0.9
			//accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
		}, 
		events: {
			touchend: function(e){    
			},
			touchstart: function(e){	
			}
		},
	    childTemplates: [
	        {                            // Image justified left
	            type: 'Ti.UI.ImageView', // Use an image view for the image
	            bindId: 'pic',           // Maps to a custom pic property of the item data
	            properties: {            // Sets the image view  properties
	                width: '30dp', height: '30dp', right: '15dp', top: 25
	            }
	        },
	        {                            // Title 
	            type: 'Ti.UI.Label',     // Use a label for the title 
	            bindId: 'code',          // Maps to a custom info property of the item data
	            properties: {            // Sets the label properties
	                color: '#666',
	                font: { fontFamily:'Helvetica Neue', fontSize: '13dp' },
	                left: '10dp', top: 15, width: Titanium.UI.SIZE - 80
	            }
	        }, 
	        {                            // Subtitle
	            type: 'Ti.UI.Label',
	            bindId: 'info',  
	            properties: {            // Sets the label properties
	                font: { fontFamily:'Helvetica Neue', fontSize: '17dp' },
	                left: '10dp', 
	                top: '35dp',
	                bottom: 15,
	                color: '#025F8B',
	                width: Titanium.UI.SIZE - 60
	            }
	        }
	    ]
	};
}

function abreviateName(str){
	var namesToAbreviate = [
		'ADMINISTRAÇÃO','PLANEJAMENTO','SUPERVISIONADO','PROFISSIONAL','SOCIOCULTURAL','SEMINÁRIOS','PREVIDÊNCIA','PESQUISA','TÉCNICAS'
	];
	var abreviations = [
		'ADM.','PLAN.','SUPERV.','PROF.','SOCIOC.','SEM.','PREV.','PESQ.','TÉCN.'
	];

	for(var i=0; i< namesToAbreviate.length; i++){
		//Ti.API.debug(str);
		//Ti.API.debug(namesToAbreviate[i]);
		//Ti.API.debug(str.search( namesToAbreviate[i] ));
		if( str.search( namesToAbreviate[i] ) > -1){
			str = str.replace(namesToAbreviate[i],abreviations[i]);
		}
	}
	return ucFirstAllWords( str.replace(/^s+|s+$/g,"") );
	//return str.replace(/^s+|s+$/g,"");
}

function ucFirstAllWords( str )
{
    var pieces = str.split(" ");
    for ( var i = 0; i < pieces.length; i++ )
    {
    	pieces[i] = pieces[i].toLowerCase();
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
}

module.exports = NotesList;