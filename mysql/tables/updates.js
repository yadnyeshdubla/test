let TABLE_NAME = "f_updates";
let COLUMN_ID = "id";
let COLUMN_MODEL_ID = "model_id";
let COLUMN_PACKAGE_NAME="package_name"
let COLUMN_VERSION = "version";
let COLUMN_VERSION_INT = "version_int";
let COLUMN_DESCRIPTION = "description";
let COLUMN_DOWNLOAD_URL = "download_url";
let COLUMN_CREATED = "created";
let INDEX_UNIQUE_UPDATE = "idx_unique_update";

module.exports = {
	DROP_TABLE: function() {
		return "drop table if exists " + TABLE_NAME;
	},
	
	CREATE_TABLE: function() {
		return "create table if not exists " + TABLE_NAME
			+ "("
			+ COLUMN_ID + " int primary key auto_increment, "
			+ COLUMN_MODEL_ID + " int not null, "
			+ COLUMN_PACKAGE_NAME + " varchar(100) not null,"
			+ COLUMN_VERSION + " varchar(50) not null, "
			+ COLUMN_VERSION_INT + " int not null, "
			+ COLUMN_DESCRIPTION + " varchar(50) not null, "
			+ COLUMN_DOWNLOAD_URL + " text not null, "
			+ COLUMN_CREATED + " datetime not null, "
			+ "unique key " + INDEX_UNIQUE_UPDATE + " (" + COLUMN_MODEL_ID + ", " + COLUMN_PACKAGE_NAME + "," + COLUMN_VERSION_INT + ")"
			+ ")";
	},

	INSERT_DATA: function(modelID, version,package_name, version_int, description, download_url) {
		return "insert into " + TABLE_NAME + " values("
			+ "null, "
			+ modelID + ", "
			+ package_name + ", "
			+ "'" + version + "', "
			+ version_int + ", "
			+ "'" + description + "', "
			+ "'" + download_url + "', "
			+ "now()"
			+ ")";
	},

	GET_LATEST: function(modelID) {
		return "select tbl.* from " + TABLE_NAME + " tbl "
				+ " left join " + TABLE_NAME + " tbl1 "
				+ " on tbl."+COLUMN_PACKAGE_NAME+ "= tbl1."+COLUMN_PACKAGE_NAME+""
				+ " and tbl."+COLUMN_VERSION_INT+" <"+"tbl1."+COLUMN_VERSION_INT
				+ " where tbl1."+COLUMN_VERSION_INT+" is null";
	}
	
};
