/**
 * @author jmilanes
 */

var diciplinsWindows;
var currentWindow = -1;
var user = false;
var disciplins_names = [];
var click_active = false;

function NotesList(notes)
{
	notes = JSON.parse(notes);
	setGlobal('logged_user', notes['user'] );
	delete notes['user'];

	var notesListWindow = Ti.UI.createWindow({
		title:'Cesunotas',
		backgroundColor: '#161616',
		tabBarHidden:true,
		navBarHidden:true,
		exitOnClose: false
	});
	
	var disciplinsLabelContainer = getHeaderLayout(getGlobal('logged_user'));	
	notesListWindow.add(disciplinsLabelContainer);

	var listView = prepareListView( notes['notes']);
	notesListWindow.add( listView );

	notesListWindow.add( getFooterTemplate() );
	
	//var activityIndicator = getActivityIndicator();
	//notesListWindow.add( activityIndicator );
	
	notesListWindow.addEventListener('androidback',function(e){
		e.source.close();
		notesListWindow = null;
	});
	
	notesListWindow.open();

	return notesListWindow;
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
			pic:{ image: '/icons/dark_2x/dark_arrow-closed@2x.png', opacity: 0.3 },
			code:{ text: code },
			info:{ text: abreviateName(name) } 
		} );
		
		disciplins_names.push( abreviateName(name) );
		
		var nos = extractNotes(notes[disciplin]);
		nots.push(nos.notes);
		difs.push(nos.difs);
	}

	var section = getNotesListSection(disciplins);
	var notesListView = getNotesListView(section);
	notesListView.setSections( [section] );
	
	
	
	var periodsClass = require('/ui/common/periods/periods_view'); 
	var periods = new periodsClass( disciplins,periods,nots,difs );


	notesListView.addEventListener('itemclick', function(e){
		if( !click_active ){
			click_active = true;
	    	var item = section.getItemAt(e.itemIndex);
	    	
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
	    	
	    	periods.open( e.itemIndex );
	    	click_active = false;
		}
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
	    backgroundColor: '#fff'
	});
	
}

function getNotesListSection(diciplinsItems){
	var section = Ti.UI.createListSection();
	section.setItems( diciplinsItems );
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


function getDiciplinsItemsTemplate(){
	return  {
		properties: {
			backgroundColor: '#fff',
			opacity: 0.9,
			height: '60dp'
			
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
	                width: '30dp', height: '30dp', right: '15dp', top: '15dp'
	            }
	        },
	        {                            // Title 
	            type: 'Ti.UI.Label',     // Use a label for the title 
	            bindId: 'code',          // Maps to a custom info property of the item data
	            properties: {            // Sets the label properties
	                color: '#ccc',
	                font: { fontFamily:'Helvetica Neue', fontSize: '15dp' },
	                left: '10dp', top: '5dp' //, width: Titanium.UI.SIZE - 80
	            }
	        }, 
	        {                            // Subtitle
	            type: 'Ti.UI.Label',
	            bindId: 'info',  
	            properties: {            // Sets the label properties
	                font: { fontFamily:'Helvetica Neue', fontSize: '17dp' },
	                left: '10dp', 
	                top: '20dp',
	                bottom: '5db',
	                color: '#025F8B'
	                //width: Titanium.UI.SIZE - 60
	            }
	        }
	    ]
	};
}

module.exports = NotesList;