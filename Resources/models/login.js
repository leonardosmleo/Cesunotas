function updateUserCredentilas(loginInfo){
	var db = Ti.Database.open( config.db.file );
	var results = db.execute('REPLACE INTO credentials ( ra, password ) VALUES("'+loginInfo.username+'","'+loginInfo.password+'")');
	db.close();
	return results;
}
function getStoredUserCredentioals(ra){
	var db = Ti.Database.open( config.db.file );
	var results = db.execute('SELECT * FROM credentials');
	db.close();
	if( results.isValidRow() ){
		return results;
	}
	return false;	
}
function getDataFromDb(ra){
	var db = Ti.Database.open( config.db.file );
	var results = db.execute('SELECT * FROM data WHERE id = "'+ra+'"');
	db.close();
	if( results.isValidRow() ){
		return {json: results.fieldByName('json'), lasttime: results.fieldByName('lasttime'),};
	}
	return false;
}
function updateDataInDb(data){
	var db = Ti.Database.open( config.db.file );	
	var lasttime = new Date();
	value = data.responseText;
	var results = db.execute("REPLACE INTO data ( id, json, lasttime ) VALUES('"+data.user+"','"+value.toString()+"', '"+lasttime.toString("yyyy/mm/dd HH:MM:ss")+"')");
	db.close();
	return results;
}
function deleteDataInDb(){
	var db = Ti.Database.open( config.db.file );
	var results = db.execute('DELETE FROM data WHERE 1 = 1');
	db.close();
	return true;
}
function deleteUserCredentials(){
	var db = Ti.Database.open( config.db.file );
	db.execute('DELETE FROM credentials WHERE 1 = 1');
	
	var alert = Ti.UI.createAlertDialog({ 
			cancel: 1 
		});
	
	if( db.rowsAffected > 0 ){
		deleteDataInDb();
		alert.title = 'Sucesso';
		alert.message = 'Credenciais removidas com sucesso !';
		alert.show();
		db.close();
		return true;
	} 
	
	db.close();
	return false;
}
function userExists(ra){
	var user = getStoredUserCredentioals( ra );
	return ( user.rowCount > 0 )? user : false;
}