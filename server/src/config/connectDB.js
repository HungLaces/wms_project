const { Sequelize } = require("sequelize");

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("wms", "root", "123456aA@", {
  host: "localhost",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  logging: false,
});
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default connectDatabase;
