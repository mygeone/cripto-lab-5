
const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017/dataPDF'
MongoClient.connect(url,function(err,dB){
	    console.log('db connected')
	    dB.close();
})


app.use(express.json());



function writeDataBase(text){
	MongoClient.connect(url,(err,client) => {
		if(err) throw err;

		var dB = client.db('dataPDF');

		dB.collection('data').insertOne({
		text: text[0],
		os: text[1],
		ip: text[2],
		ua: text[3]
		}),function (findErr,result){
			console.log(result.name)
			client.close()
		}

	});
};

function retrieveDocuments(){
	MongoClient.connect(url,(err,client) => {
		if(err) throw err;

		var dB = client.db('dataPDF');

		dB.collection('data').find({}),function (findErr,result){
			console.log(result.name)
			client.close()
		}

	});
};


app.post('/data', function (req, res) {
	    var ipRaw = (req.headers['x-forwarded-for'] || req.socket.remoteAddress)
	    var cleanIp = ipRaw.replace(':','')

	    var textRaw = req.url
	    var words = textRaw.replace('/data?words=','')
	    var words2 = words.split('%2C').join(' ')
	    var texto = words2.split('%00%00').join(' ');


	    var arrayToSend = texto.split('%3F')
	    var userAgent = req.headers['user-agent']
	    arrayToSend.push(cleanIp)
	    arrayToSend.push(userAgent)

	writeDataBase(arrayToSend)
	    res.status(200).send();
	console.log('post incoming');

});


app.get('/getData',function(req,res){

	MongoClient.connect(url, (err, client) => {
		    if(err) throw err;

		    let database = client.db('dataPDF');

		    database.collection('data').find()
		    .toArray((err, results) => {
			if(err) throw err;
			var a = results
			results.forEach((value)=>{
			});
			res.send(results)
		    })
	})
});

app.listen(3000, () => {
	    console.log("El servidor está inicializado en el puerto 3000");
});
