import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [
    __dirname + "/../entities/*.ts"
  ],
  synchronize: true,
  logging: false
}

export default config;