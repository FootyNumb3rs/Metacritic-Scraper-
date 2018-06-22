var MongoClient  = require('mongodb').MongoClient; 
var url = "mongodb://localhost:27017/mydb";
var fs = require('fs');

var data = JSON.parse(fs.readFileSync('game_data.txt','utf-8'));

MongoClient.connect(url,function(err, db){
	if(err) throw err;
	var dbo = db.db('mydb');

	dbo.collection('game_data').insertMany(data,function(err,res){
		if (err) throw err;
		console.log('Number of inserted objects: '+res.insertedCount);
		db.close();
	});

	
	console.log("Database created!");
	db.close();
});

