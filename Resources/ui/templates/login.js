var template = {
	font: { fontFamily:'Tahoma', fontSize:'20dp' },
	window: {
		background_color: '#fff'
	},
	form: {
		label: {
			height: 80,
			width: Titanium.UI.SIZE,
			text_align: Ti.UI.TEXT_ALIGNMENT_LEFT,
			top: 0,
			font_size: '20dp',
			font_weigth: 'normal',
			color: '#fff',
		    shadowColor: '#aaa',
		    shadowOffset: {x:5, y:5}
		},
		input: {
			height: '60dp',
			width: '90%',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			background_color: "#404E57",
			border_color: '#404E57',
			border_width: 3,
			font_size: '20dp',
			font_weigth: 'normal',
			color: '#fff',
			active: {
				background_color: '#fff',
				color: '#025F8B',
				border_color: '#025F8B'
			}
		},
		checkbox: {
		    width: '90%', 
		    color: '#333'
		},
		button: {
			top: 300,
			left: '5%',
			width: '90%',
			height: '60dp',
			background_color: '#025F8B',
			color: '#fff'
		}
	}
};
