let connection;
let updatesTable = require("../../mysql/tables/updates");
let debug;

module.exports = function(app, db, bool) {
	connection = db;
	debug = bool;
	app.route("/updates/checkUpdates")
		.post(postAPI);
}

function postAPI(req, res) {
	let response = {};

	if (!req.body || !req.body.model) {
		response.success = false;
		response.message = "insufficient paramters";
		res.json(response);
		return;
	}

	connection.query(updatesTable.GET_LATEST(req.body.model), function(err, rows) {
		if (err) {
			if (debug) console.log(err);
			response.success = false;
			response.message = "server error";
			res.json(response);
		} else {
			if (rows.length >0) {
				if(debug)console.log(rows)
				response.success = true;
				response.message = "ok";
				let apps=[];
				for(i=0;i<rows.length;i++){
					let app={}
					app.version = rows[i].version;
					app.package_name=rows[i].package_name;
					app.version_int = rows[i].version_int;
					app.description = rows[i].description;
					app.download_url = rows[i].download_url;
					apps.push(app);
				}
				response.data =apps;
				res.json(response);
			} else {
				console.log(rows);
				response.success = false;
				response.message = "server error";
				res.json(response);
			}
		}
	});
}
