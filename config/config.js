const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  "development": {
      "username": "postgres",
      "password": "postgres",
      "database": "shop",
      "host": "127.0.0.1",
      "dialect": "postgres",
      "logging": false,
      "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false
        }
      }
  },
  "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
       "ssl": {
         "require": true,
         "rejectUnauthorized": false
       }
     }
   }
};
