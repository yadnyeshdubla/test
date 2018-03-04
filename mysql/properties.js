module.exports = function(env) {
	if (env == "dev") {
		return {
			serverhost: "localhost",
			username: "root",
			password: "",
			database: "fitphilia1"
		};
	} else if (env == "test") {
		return {
			serverhost: "localhost",
			username: "root",
			password: "fitphilia",
			database: "fitphilia1"
		};
	} else if (env == "prod") {
		return {
			serverhost: "10.142.0.4",
			username: "root",
			password: "fitphilia",
			database: "fitphilia1"
		};
	}
}