let properties = require("./properties");
let updatesTable = require("./tables/updates");
let modelTable = require("./tables/model");

let dropTables = function(connection) {
	connection.query(updatesTable.DROP_TABLE(), function(err) {
		if (err) console.log("mysql drop error: updates table deletion");
	});
	connection.query(modelTable.DROP_TABLE(), function(err) {
		if (err) console.log("mysql drop error: model table deletion");
	});
}

let initializeTables = function(connection) {
	return new Promise(function(resolve, reject) {
		let countQueries = 2;
		let completedQueries = 0;

		let completedDatabaseInitialization = function() {
			resolve();
		};

		connection.query(updatesTable.CREATE_TABLE(), function(err) {
			if (err) reject(err);
			else {
				completedQueries++; if (completedQueries==countQueries) completedDatabaseInitialization();
			}
		});
		connection.query(modelTable.CREATE_TABLE(), function(err) {
			if (err) reject(err);
			else {
				completedQueries++; if (completedQueries==countQueries) completedDatabaseInitialization();
			}
			connection.query(modelTable.CREATE_FITMILL_S1(), function(err) {
				if (err && err.code != "ER_DUP_ENTRY") reject(err);
				else {
					completedQueries++; if (completedQueries==countQueries) completedDatabaseInitialization();
				}
			});
		});
	});
}

module.exports = {
	initializeTables: initializeTables,
	dropTables: dropTables
};
