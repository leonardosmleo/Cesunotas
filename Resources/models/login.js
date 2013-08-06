

function getDataFromDb(ra){
	var db = Ti.Database.open('squidtech.sqlite');
	var results = db.execute('SELECT * FROM data WHERE id = "'+ra+'"');
	db.close();
	if( results.isValidRow() ){
		return {json: results.fieldByName('json'), lasttime: results.fieldByName('lasttime'),};
	}
	return false;
}

function updateDataInDb(data){
	var db = Ti.Database.open('squidtech.sqlite');	
	var lasttime = new Date();
	value = data.responseText;
	var results = db.execute("REPLACE INTO data ( id, json, lasttime ) VALUES('"+data.user+"','"+value.toString()+"', '"+lasttime.toString("yyyy/mm/dd HH:MM:ss")+"')");
	db.close();
	return results;
}

function deleteDataInDb(){
	var db = Ti.Database.open('squidtech.sqlite');
	var results = db.execute('DELETE FROM data WHERE 1 = 1');
	db.close();
	return true;
}

function deleteUserCredentials(){
	var db = Ti.Database.open('squidtech.sqlite');
	var results = db.execute('DELETE FROM credentials WHERE 1 = 1');
	db.close();
	deleteDataInDb();
	
	return true;
}