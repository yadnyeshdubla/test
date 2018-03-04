var TABLE_NAME = "d_model";
var COLUMN_ID = "id";
var COLUMN_NAME = "name";
var COLUMN_SERIAL_PORT = "serial_port";
var COLUMN_BAUDRATE = "baudrate";
var COLUMN_MAX_SPEED = "max_speed";
var COLUMN_MAX_INCLINE = "max_incline";
var COLUMN_CREATED = "created";
var INDEX_UNIQUE_MODEL = "idx_unique_model";

module.exports = {
	DROP_TABLE: function() {
		return "drop table if exists " + TABLE_NAME;
	},
	
	CREATE_TABLE: function() {
		return "create table if not exists " + TABLE_NAME
			+ "("
			+ COLUMN_ID + " int primary key auto_increment, "
			+ COLUMN_NAME + " varchar(50) not null, "
			+ COLUMN_SERIAL_PORT + " varchar(50) not null, "
			+ COLUMN_BAUDRATE + " int not null, "
			+ COLUMN_MAX_SPEED + " int not null, "
			+ COLUMN_MAX_INCLINE + " int not null, "
			+ COLUMN_CREATED + " datetime not null, "
			+ "unique key " + INDEX_UNIQUE_MODEL + " (" + COLUMN_NAME + ", " + COLUMN_SERIAL_PORT + ", " + COLUMN_BAUDRATE + ")"
			+ ")";
	},

	INSERT_DATA: function(name, serial_port, baudrate, max_speed, max_incline) {
		return "insert into " + TABLE_NAME + " values("
			+ "null, "
			+ "'" + name + "', "
			+ "'" + serial_port + "', "
			+ baudrate + ", "
			+ max_speed + ", "
			+ max_incline + ", "
			+ "now()"
			+ ")";
	},

	CREATE_FITMILL_S1: function() {
		return module.exports.INSERT_DATA("FitMill S1", "dev/ttyS2", 19200, 200, 15);
	}
};
