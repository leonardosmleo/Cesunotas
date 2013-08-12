Ti.include('/ui/common/periods/periods_window.js');

function PeriodsView( disciplins,periods, notes, diffs ){
	
	this.disciplins;
	this.periods;
	this.notes;
	this.diffs;
	this.rows;

	var self = this;
	
	this._init = function( disciplins,periods, notes, diffs  ){
		self.setDisciplins(disciplins);
		self.setPeriods(periods);
		self.setNotes(notes);
		self.setDifs(diffs);
		self.setRows();
	}

	this.open = function(index){
		return new PeriodsWindow( self.rows[index], self.disciplins[index].info.text );
	}

	this.setNotes = function(notes){
		self.notes = notes;
	}
	
	this.setDifs = function(diffs){
		self.diffs = diffs;
	}
	
	this.setPeriods = function(periods){
		self.periods = periods;
	}
	
	this.setDisciplins = function(disciplins){
		self.disciplins = disciplins;
	}
	
	this.setRows = function(){
		self.rows = [];

		for( var i=0; i<self.notes.length; i++){
			var rows = [];
			for( var b=0; b < self.notes[i].length; b++){
				var dif = '';
				if( b > 0 && self.notes[i][b] > 0 ){
					dif = self.diffs[i][b];
				}
				rows.push({ 
					period:{text: self.periods[b]},
					note:{ 
						text: self.notes[i][b],
						color: ( ( self.notes[i][b] < 6.5 ) ? (( self.notes[i][b] < 3.5 )? ( ( self.notes[i][b] == 0)? '#ccc' : '#9F1313' ) : '#D96D00' ) : '#025F8B' )
					},
					dif:{ 
						text: dif,
						color: ( dif.indexOf("+") ) ? '#9F1313' : '#447F17'
					}
				});
			}	
			self.rows.push(rows);
		}
		//logDebug( self.rows, true );
	}
	
	return this._init( disciplins,periods, notes, diffs  );
}
module.exports = PeriodsView;