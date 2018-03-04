let env = "dev"; // dev, test, prod
let debug = env == "prod" ? false : true;
let ip;
// if (env == "dev") {
// 	ip = "http://192.168.1.5:8080";
// } else
// if (env == "prod") {
// 	ip = "http://35.185.112.2:8080";
// } else
// if (env == "test") {
// 	ip = "http://35.203.170.149:8080";
// }
if (debug) console.log("debugging is enabled...");

//required keys and properties
let mysqlProperties = require("./mysql/properties.js")(env);
let keys = require("./static/keys");

//include libs
let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let timeout = require('connect-timeout');
let logger = require('express-logger');

//include files
let mysqlInitialize = require("./mysql/initialize.js");

//initialize server
let app = express();
app.use(bodyParser.json({
	limit: "10mb"
}));
app.use(bodyParser.urlencoded({
	limit: "10mb",
	extended: true,
	parameterLimit: 50
}));
app.use(timeout(120000));
app.use(logger({
	path: "./logs/log.txt"
}));
app.set('port', 8080);

//initialize mysql connection
let connection;
connection = mysql.createPool({
	connectionLimit: 10,
	host: mysqlProperties.serverhost,
	user: mysqlProperties.username,
	password: mysqlProperties.password,
	database: mysqlProperties.database
});

//init routes
var initializeRoutes = function () {
	require("./methods/updater/checkUpdates")(app,connection, debug);

	//generic get or post requests
	app.get('*', function (req, res) {
		var response = {};
		response.success = false;
		response.message = 'invalid request';
		res.json(response);
	});

	app.post('*', function (req, res) {
		var response = {};
		response.success = false;
		response.message = 'invalid request';
		res.json(response);
	});

	//create tables
	mysqlInitialize.initializeTables(connection).then(function () {
		//start server
		app.listen(app.get('port'), function () {
			console.log("Web server listening on port " + app.get('port'));
		});
	}).catch(function (err) {
		console.log(err);
	});
}

initializeRoutes();
