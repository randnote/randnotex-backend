// module.exports = {
// 	HOST: process.env.MYSQL_HOST || "localhost",
// 	PORT: process.env.MYSQL_PORT || "3306",
// 	USER: process.env.MYSQL_USER || "root",
// 	PASSWORD: process.env.MYSQL_PASSWORD || "5308danielromeo",
// 	DB: process.env.MYSQL_DB || "randnotex",
// };

module.exports = {
	HOST: process.env.DB_HOST,
	PORT: process.env.DB_PORT,
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASSWORD,
	DB: process.env.DB_NAME,
	// port: process.env.DB_PORT,
	// dialect: "mysql",
	// pool:{
	// 	max: 5,
	// 	min: 0,
	// 	acquire: 30000,
	// 	idle: 10000
	// }
};