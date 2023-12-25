import { DataSource } from "typeorm";
import { envConfig } from '../config/envConfig';

export const myDataSource: DataSource = new DataSource({
  type: "postgres",
  host: envConfig.database.host,
  port: +envConfig.database.port,
  username: envConfig.database.user,
  password: envConfig.database.password,
  database: envConfig.database.database,
  entities: [__dirname + `/entities/*.entity{.ts,.js}`],
  // synchronize: true,
  logging: true,
});

export const connection = myDataSource.initialize();
